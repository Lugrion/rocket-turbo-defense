import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;

    constructor() {
        super('MainMenu');
    }

    init() {
        this.camera = this.cameras.main;

        this.background = this.add.image(this.camera.width / 2, this.camera.height / 2, 'background');
    }

    create() {
        

        this.title = this.add.text(this.camera.width / 2, this.camera.height / 2, 'Click to Game!', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('Game');

        });
    }
}
