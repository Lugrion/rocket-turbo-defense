import { BasicControls } from '../types';
import { Scene } from 'phaser';
import Player from '../objects/test-cube';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;

    cursors: BasicControls | undefined;
    player: Player

    constructor() {
        super('Game');

    }

    init() {
        this.camera = this.cameras.main;
        // this.camera.setBackgroundColor(0x00ff00);


        
        this.background = this.add.image(this.camera.width / 2, this.camera.height / 2, 'background');
        // this.background.setAlpha(0.5);

    }

    create() {

        this.cursors = this.input.keyboard?.createCursorKeys();

        this.player = new Player({
            current_scene: this,
            x: this.camera.width / 2,
            y: this.camera.height / 2,
            texture: "block"
        })
    }

    setupPhysics() {

    }

    basicPlayerMovement() {

        this.player.setVelocity(0);

        if (this.cursors) {


            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-300);
            }
            else if (this.cursors.right.isDown) {
                this.player.setVelocityX(300);
            }

            if (this.cursors.up.isDown) {
                this.player.setVelocityY(-300);
            }
            else if (this.cursors.down.isDown) {
                this.player.setVelocityY(300);
            }


        }
    }

    update(time: number, delta: number): void {
        this.basicPlayerMovement()
    }
}
