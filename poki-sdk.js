window.PokiSDK = {
    init: () => Promise.resolve(),
    commercialBreak: () => Promise.resolve(false),
    
    rewardedBreak: () => {
        console.log("SDK: Reward Requested. Deploying the Promise Spy...");
        
        // Create the reward promise
        let p = new Promise((resolve) => {
            setTimeout(() => {
                console.log("SDK: Handing 'true' back to the game...");
                resolve(true);
            }, 1000);
        });

        // 🕵️ THE SPY
        // We intercept the .then() function. If the game is healthy, it MUST call this 
        // to hear our answer. If this doesn't log, the game is deaf.
        const originalThen = p.then;
        p.then = function(onFulfilled, onRejected) {
            console.log("🎯 BINGO! The Unity Engine is actively listening for the reward!");
            return originalThen.call(this, onFulfilled, onRejected);
        };

        return p;
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
