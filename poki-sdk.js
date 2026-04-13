window.heistLog = window.heistLog || [];
const track = function(msg) { window.heistLog.push(msg); console.log(msg); };

window.PokiSDK = {
    init: function() { 
        track("SDK: Initialized");
        return Promise.resolve(); 
    },
    
    commercialBreak: function(cb) {
        track("SDK: Commercial Break");
        if (typeof cb === 'function') cb(false);
        return Promise.resolve(false);
    },
    
    rewardedBreak: function() {
        // Log EXACTLY what the game passes to the SDK
        track("SDK: Rewarded Break Called. Arguments passed: " + arguments.length);
        console.log("Ad Arguments:", arguments);

        // Capture any potential callback function passed by older SDKs
        let possibleCallback = arguments[0];

        return new Promise(function(resolve) {
            setTimeout(function() {
                track("SDK: Firing 'Ad Finished' signals...");
                
                // 1. Fire modern Promise resolution
                resolve(true);

                // 2. Fire legacy callback if the game provided one
                if (typeof possibleCallback === 'function') {
                    track("-> Legacy callback detected! Executing...");
                    possibleCallback(true);
                }

                // 3. Force the browser to wake the Unity WebGL thread up
                // Unity often pauses its internal clock when it thinks an ad is overlaying the screen.
                window.dispatchEvent(new Event('focus'));
                let canvas = document.getElementById('unity-canvas');
                if (canvas) {
                    canvas.focus();
                    canvas.dispatchEvent(new MouseEvent('mousedown'));
                }

            }, 1000); 
        });
    },
    
    gameplayStart: function() { track("GAME: gameplayStart"); },
    gameplayStop: function() { track("GAME: gameplayStop"); },
    gameLoadingFinished: function() {},
    gameInteractive: function() {},
    setDebug: function() {}
};

window.rewardedBreak = window.PokiSDK.rewardedBreak;
window.commercialBreak = window.PokiSDK.commercialBreak;
window.initPokiBridge = function() { return true; };
