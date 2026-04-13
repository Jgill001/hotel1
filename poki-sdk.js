window.PokiSDK = {
    init: () => Promise.resolve(),
    commercialBreak: () => Promise.resolve(false),
    
    rewardedBreak: () => new Promise(resolve => {
        // Step 1: Wait for the next visual frame so Unity finishes processing the button click
        requestAnimationFrame(() => {
            // Step 2: Add a small natural delay so we don't trigger "instant" anti-cheats
            setTimeout(() => {
                // Step 3: Wait for the exact moment the browser is about to draw a new frame, 
                // which is when Unity's internal loop is completely open and listening.
                requestAnimationFrame(() => {
                    resolve(true);
                });
            }, 800); 
        });
    }),
    
    setDebug: () => {},
    gameplayStart: () => {},
    gameplayStop: () => {},
    gameLoadingFinished: () => {},
    gameInteractive: () => {}
};

// Global Bindings
window.rewardedBreak = window.PokiSDK.rewardedBreak;
window.commercialBreak = window.PokiSDK.commercialBreak;
window.initPokiBridge = () => true;
