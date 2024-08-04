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
        {alias: 'lv1', src: '../assets/lv1_symbol.png'},
        {alias: 'lv2', src: '../assets/lv2_symbol.png'},
        {alias: 'lv3', src: '../assets/lv3_symbol.png'},
        {alias: 'lv4', src: '../assets/lv4_symbol.png'},
        {alias: 'hv1', src: '../assets/hv1_symbol.png'},
        {alias: 'hv2', src: '../assets/hv2_symbol.png'},
        {alias: 'hv3', src: '../assets/hv3_symbol.png'},
        {alias: 'hv4', src: '../assets/hv4_symbol.png'},
        {alias: 'spinBtn', src: '../assets/spin_button.png'}
    ] as UnresolvedAsset[];

    assets.forEach(asset => Assets.add(asset));

    Assets.load(assets.map(asset => asset.alias), (progress) => {
        const percent = Math.round(progress * 100).toString().padStart(3, ' ');
        loadingText.text = `Loading Assets... ${percent}%`;
    }).then((loadedAssets) => {
        app.stage.removeChild(preloaderScreen);
        onAssetsLoaded(loadedAssets);
    });
};
