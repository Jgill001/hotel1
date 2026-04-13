window.PokiSDK = {
    init: () => Promise.resolve(),
    commercialBreak: () => Promise.resolve(false),
    
    // We add a 1-second delay so the game doesn't think we are cheating
    rewardedBreak: () => new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    }),
    
    setDebug: () => {},
    gameplayStart: () => {},
    gameplayStop: () => {},
    gameLoadingFinished: () => {},
    gameInteractive: () => {}
};

// THE MISSING PIECES (What caused your popup error):
window.rewardedBreak = window.PokiSDK.rewardedBreak;
window.commercialBreak = window.PokiSDK.commercialBreak;
window.initPokiBridge = () => true;
