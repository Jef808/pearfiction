import {
    Application,
    Assets,
    Container,
    Text,
    Texture,
    UnresolvedAsset
} from 'pixi.js';

type OnAssetsLoadedCallback = (loadedAssets: Record<string, Texture>) => void;

export const initPreloader = (app: Application, onAssetsLoaded: OnAssetsLoadedCallback) => {
    const preloaderScreen = new Container();
    app.stage.addChild(preloaderScreen);

    const loadingText = new Text({
        text: 'Loading Assets...   0%',
        style: {
            fontFamily: 'Arial',
            fontSize: 24,
            fontWeight: 'bold',
            fill: 0x0
        }
    });
    loadingText.anchor.set(0.5);
    loadingText.x = app.screen.width / 2;
    loadingText.y = app.screen.height / 2;
    preloaderScreen.addChild(loadingText);

    const assets = [
        {alias: 'hv1', src: '../assets/my_hv1_symbol.png'},
        {alias: 'hv2', src: '../assets/my_hv2_symbol.png'},
        {alias: 'hv3', src: '../assets/my_hv3_symbol.png'},
        {alias: 'hv4', src: '../assets/my_hv4_symbol.png'},
        {alias: 'lv1', src: '../assets/my_lv1_symbol.png'},
        {alias: 'lv2', src: '../assets/my_lv2_symbol.png'},
        {alias: 'lv3', src: '../assets/my_lv3_symbol.png'},
        {alias: 'lv4', src: '../assets/my_lv4_symbol.png'},
        {alias: 'spinBtn', src: '../assets/spin_button.png'}
    ] as UnresolvedAsset[];

    assets.forEach(asset => Assets.add(asset));

    const loadAssets = Assets.load(assets.map(asset => asset.alias), (progress) => {
        const percent = Math.round(progress * 100).toString().padStart(3, ' ');
        loadingText.text = `Loading Assets... ${percent}%`;
    });

    const delay = new Promise(resolve => setTimeout(resolve, 400));
    Promise.all([delay, loadAssets])
        .then(([_, loadedAssets]) => {
            app.stage.removeChild(preloaderScreen);
            onAssetsLoaded(loadedAssets);
        });
};
