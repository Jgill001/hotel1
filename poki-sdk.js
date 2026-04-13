window.PokiSDK = {
    init: () => Promise.resolve(),
    commercialBreak: () => Promise.resolve(false),
    
    rewardedBreak: () => {
        console.log("SDK: Reward Requested. Sending into the Black Hole...");
        
        // We return a Promise, but we NEVER call resolve() or reject().
        // The game will theoretically wait forever.
        return new Promise((resolve, reject) => { 
            // 🕳️ Absolutely nothing happens here.
        });
    },
    
    setDebug: () => {},
    gameplayStart: () => {},
    gameplayStop: () => {},
    gameLoadingFinished: () => {},
    gameInteractive: () => {}
};

window.rewardedBreak = window.PokiSDK.rewardedBreak;
window.commercialBreak = window.PokiSDK.commercialBreak;
window.initPokiBridge = () => true;
