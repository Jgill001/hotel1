window.PokiSDK = {
    init: () => Promise.resolve(),
    commercialBreak: () => Promise.resolve(false),
    rewardedBreak: () => Promise.resolve(true), // Instantly grant the reward
    setDebug: () => {},
    gameplayStart: () => {},
    gameplayStop: () => {},
    gameLoadingFinished: () => {},
    gameInteractive: () => {}
};
window.initPokiBridge = () => true;
