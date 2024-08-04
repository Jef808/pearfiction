import {
    Application,
} from 'pixi.js';
import {initPreloader} from './preloader';
import {initGame} from './game';

const app = new Application();

await app.init({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
    resizeTo: window
});

document.body.appendChild(app.canvas);

window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});

initPreloader(app, (assets) => {
    const game = initGame(app, assets);
    app.stage.addChild(game.container);
});
