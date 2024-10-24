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

        this.planetAnimation();

    }

    

    planetAnimation() {
        this.anims.create({
            key: 'spin',
            frames: this.anims.generateFrameNames('planet', {
                start: 1,
                end: 50,
                prefix: 'sprite',
                zeroPad: 0
            }),
            frameRate: 12,
            repeat: -1
        });

        let planet = this.add.sprite(this.camera.width / 2, this.camera.height / 2, 'planet');
        planet.setScale(1.5)
        planet.play('spin')
    }

    create() {
        this.setupPlayer()
        this.addFullScreenOption()
    }

    addFullScreenOption() {
        const button = this.add.image(this.camera.width - 16, 16, '', 0).setOrigin(1, 0).setInteractive();

        button.on('pointerup', () => {
            if (this.scale.isFullscreen) {
                button.setFrame(0);

                this.scale.stopFullscreen();
            }
            else {
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
            texture: "astro"
        })


        this.player.anims.create({
            key: 'fall',
            frames: this.anims.generateFrameNames('astro', {
                start: 1,
                end: 4,
                prefix: 'astronaut',
                zeroPad: 0
            }),
            frameRate: 24,
            repeat: 0
        });

        this.player.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNames('astro', {
                start: 4,
                end: 1,
                prefix: 'astronaut',
                zeroPad: 0
            }),
            frameRate: 24,
            repeat: 0
        });

        this.player.setScale(6)

        // this.player.setGravityY(1499)

        this.input.on('pointerdown', () => {

            this.isHolding = true
            this.player.anims.play("fly")

        });

        this.input.on('pointerup', () => {

            this.isHolding = false
            this.player.anims.play("fall")

        });
    }

    basicPlayerMovement() {
        if (this.isHolding) {
            console.log("Holding")
            this.player.setVelocityY(-300)
        } else {
            this.player.setVelocityY(300)
            console.log("NOT Holding")
        }
    }

    update(): void {
        this.basicPlayerMovement()


    }
}
