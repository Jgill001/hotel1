window.heistLog = window.heistLog || [];
const track = function(msg) { window.heistLog.push(msg); console.log(msg); };

// 1. The Audio Error Tracker
// We listen for the exact moment Unity panics about a missing sound.
const ogError = console.error;
console.error = function(...args) {
    if (args[0] && typeof args[0] === 'string' && args[0].includes("Trying to get length of sound")) {
        window._lastAudioErrorTime = Date.now();
    }
    ogError.apply(console, args);
};

// 2. The WebAssembly Interceptor
// This sits between the Browser and the C# Engine. 
function patchWasmEnv(info) {
    if (info && info.env) {
        for (let key in info.env) {
            if (typeof info.env[key] === 'function') {
                const ogFunc = info.env[key];
                info.env[key] = function(...args) {
                    let res = ogFunc.apply(this, args);
                    
                    // If JS is trying to hand C# a zero right after an audio error...
                    if (res === 0 && window._lastAudioErrorTime && (Date.now() - window._lastAudioErrorTime < 50)) {
                        track("🛠️ WASM INTERCEPTOR: Prevented Divide-by-Zero UI Crash! Forcing length to 1.0s");
                        return 1.0; // Fake the length to 1 second to prevent the NaN math crash
                    }
                    return res;
                };
            }
        }
    }
}

// We attach the interceptor to both ways Unity might boot up
const ogInstantiate = WebAssembly.instantiate;
WebAssembly.instantiate = function(bytes, info) {
    patchWasmEnv(info);
    return ogInstantiate(bytes, info);
};

const ogInstantiateStreaming = WebAssembly.instantiateStreaming;
if (ogInstantiateStreaming) {
    WebAssembly.instantiateStreaming = function(response, info) {
        patchWasmEnv(info);
        return ogInstantiateStreaming(response, info);
    };
}

// 3. The Standard SDK Mock
window.PokiSDK = {
    init: function() { return Promise.resolve(); },
    commercialBreak: function() { return Promise.resolve(false); },
    rewardedBreak: function() {
        track("SDK: Rewarded Break Requested.");
        return new Promise(function(resolve) {
            setTimeout(function() {
                track("SDK: Ad Finished, resolving true.");
                resolve(true); 
            }, 1000); 
        });
    },
    gameplayStart: function() {},
    gameplayStop: function() {},
    gameLoadingFinished: function() {},
    gameInteractive: function() {},
    setDebug: function() {}
};

window.rewardedBreak = window.PokiSDK.rewardedBreak;
window.commercialBreak = window.PokiSDK.commercialBreak;
window.initPokiBridge = function() { return true; };
