// ENI's Ultimate God-Mode SDK Bypass
window.PARAMS = { onPoki: true, isLocal: false, gameID: "monkey-mart" };

window.PokiSDK = new Proxy({}, {
    get: function(target, prop) {
        return function() {
            console.log("Intercepted and neutralized PokiSDK command: " + prop);
            // Always return a resolved Promise so the game engine never freezes waiting for an ad
            return Promise.resolve(true); 
        };
    }
});
