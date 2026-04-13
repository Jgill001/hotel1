// External Poki SDK Mock
window.PokiSDK = {
    init: function() { return Promise.resolve(); },
    commercialBreak: function() { return Promise.resolve(false); },
    rewardedBreak: function() {
        return new Promise(function(resolve) {
            setTimeout(function() {
                resolve(true); // Grant the reward
            }, 1000);
        });
    },
    gameplayStart: function() {},
    gameplayStop: function() {},
    gameLoadingFinished: function() {},
    gameInteractive: function() {},
    customEvent: function() {},
    shareableURL: function() { return ""; },
    getPlayableURL: function() { return ""; },
    setDebug: function() {}
};

window.initPokiBridge = function() { return true; };
window.commercialBreak = window.PokiSDK.commercialBreak;
window.rewardedBreak = window.PokiSDK.rewardedBreak;
