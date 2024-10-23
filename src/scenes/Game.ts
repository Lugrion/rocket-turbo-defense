import { Scene } from 'phaser';
import Player from '../objects/test-cube';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;


    player: Player
    isHolding: boolean = false;

    constructor() {
        super('Game');

    }

    init() {
        this.camera = this.cameras.main;
        // this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(this.camera.width / 2, this.camera.height / 2, 'background');
        // this.background.setAlpha(0.5);

        // this.add.image(this.camera.width / 2, this.camera.height / 2, 'planet');

    }

    create() {
        this.setupPlayer()
        this.addFullScreenOption()
    }

    addFullScreenOption(){
        const button = this.add.image(this.camera.width - 16, 16, '', 0).setOrigin(1, 0).setInteractive();

        button.on('pointerup', () => {
            if (this.scale.isFullscreen)
                {
                    button.setFrame(0);
    
                    this.scale.stopFullscreen();
                }
                else
                {
                    button.setFrame(1);
    
                    this.scale.startFullscreen();
                }
        })

        const FKey = this.input.keyboard?.addKey('F');

        if (FKey === undefined) {
            return
        }

        FKey.on('down', () => {

            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            }
            else {
                this.scale.startFullscreen();
            }

        });
    }

    setupPlayer() {
        this.player = new Player({
            current_scene: this,
            x: this.camera.width / 8,
            y: this.camera.height / 2,
            texture: "block"
        })

        this.input.on('pointerdown', () => {

            this.isHolding = true

        });

        this.input.on('pointerup', () => {

            this.isHolding = false

        });
    }

    basicPlayerMovement() {
        if (this.isHolding) {
            console.log("Holding")
            this.player.setVelocityY(-500)
        } else {
            this.player.setVelocityY(300)
            console.log("NOT Holding")
        }
    }

    update(): void {
        this.basicPlayerMovement()


    }
}
