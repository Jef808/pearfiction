import {
    Application, Container
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

const recenter = (screen: Container) => {
    screen.position = {
        x: app.screen.width / 2,
        y: app.screen.height / 2
    }
}

initPreloader(app, (assets) => {
    const game = initGame(assets);
    app.stage.addChild(game.container);
    recenter(game.container);
    window.addEventListener('resize', () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        recenter(game.container);
    });
});
