import { Scene } from 'phaser';
import Player from '../objects/astronaut';
import Generator from '../objects/ObsGenerator';
import Illusion from '../objects/illusion-layer';

export class MainRunner extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;

    width: number;
    height: number;

    background: Phaser.GameObjects.Image;
    bg_planet: Phaser.GameObjects.Sprite;
    illusion: Phaser.GameObjects.Sprite;

    // Obstacle Groups
    basicRockets: any;


    hitObstacle: boolean;

    player: Player

    score: number;
    scoreTxt: Phaser.GameObjects.Text;

    generator = new Generator(this)



    constructor() {
        super('Game');

        this.hitObstacle = false;
        this.score = 0;

    }

    init() {
        this.camera = this.cameras.main;
        // this.camera.setBackgroundColor(0x00ff00);

        this.width = this.camera.width;
        this.height = this.camera.height;

        this.background = this.add.image(this.width / 2, this.height / 2, 'background');
        // this.background.setAlpha(0.5);



        this.setupPlayer()
        this.planetAnimation();
        this.addFullScreenOption()

        this.time.delayedCall(2000, () => this.generator.generateRocket(), undefined, this);

        this.scoreTxt = this.add.text(this.width / 5, this.height / 10, "Score: 0", {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);
    }


    create() {
        this.createGroups();
    }

    createGroups() {
        this.basicRockets = this.add.group()
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

        this.bg_planet = this.add.sprite(this.width / 3, this.height + this.height / 2, 'planet').setBelow(this.player);
        this.bg_planet.setScale(9.75)
        this.bg_planet.play('spin')

        this.illusion = new Illusion({
            current_scene: this,
            x: this.width / 2,
            y: this.height - this.height / 12,
            texture: "illusion"
        })

        this.physics.add.collider(this.illusion, this.player)


    }



    addFullScreenOption() {
        const button = this.add.image(this.width - 16, 16, 'fullscreen', 0).setOrigin(1, 0).setInteractive().setZ(1000);
        button.setScale(0.5)

        button.on('pointerup', () => {

            // Prevent from moving on pressing screen to change screen

            // this.player.setVelocityY(0)


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
                button.setFrame(0);
                this.scale.stopFullscreen();
            }
            else {
                button.setFrame(1);
                this.scale.startFullscreen();
            }

        });
    }

    setupPlayer() {
        this.player = new Player({
            current_scene: this,
            x: this.width / 6,
            y: this.height / 2,
            texture: "astro-j"
        })
    }


    update(): void {
        this.player.update()

        this.score += 1

        this.scoreTxt.text = `Score: ${this.score}`;

        this.physics.add.collider(this.player, this.basicRockets, () => {
            this.hitObstacle = true;
            console.log("END GAME")
            this.scene.stop();
            this.scene.start('MainMenu', {score: this.score});
        })
    }
}
