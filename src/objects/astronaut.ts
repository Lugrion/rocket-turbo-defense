import { SpriteBasicConfig } from "../types"

export default class Player extends Phaser.Physics.Arcade.Sprite {

    isHolding: boolean = false;

    constructor(
        spriteConfig: SpriteBasicConfig
    ) {
        super(spriteConfig.current_scene, spriteConfig.x, spriteConfig.y, spriteConfig.texture);

        this.setOrigin(0, 0)
        this.setupPhysics();
        this.setupControls();
        this.setupAnimations();
        this.play
    }

    setupPhysics() {

        // Add the player to the scene
        this.scene.add.existing(this);

        // Enable physics on this player object
        this.scene.physics.world.enable(this);

        // Prevent body from traversing off edges
        this.setCollideWorldBounds(true);

        // Set individual Gravity
        this.setGravityY(300)
    }

    setupControls() {
        this.scene.input.on('pointerdown', () => {

            this.isHolding = true

        });

        this.scene.input.on('pointerup', () => {

            this.isHolding = false

        });


        this.scene.input.keyboard?.addKey('SPACE').on('down', () => {
            this.isHolding = true
        }).on('up', () => {
            this.isHolding = false
        });
    }

    setupAnimations() {
        this.anims.create({
            key: 'fall',
            frames: this.anims.generateFrameNames('astro-j', {
                start: 1,
                end: 4,
                prefix: 'astro',
                zeroPad: 0
            }),
            frameRate: 6,
            repeat: 0
        });

        

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNames('astro-r', {
                start: 1,
                end: 6,
                prefix: 'astronaut',
                zeroPad: 0
            }),
            frameRate: 12,
            repeat: -1
        });

        this.setScale(6)
    }

    basicMovement() {
        if (this.isHolding) {
            console.log("Holding")
            this.setVelocityY(-300)
        } else {
            console.log("NOT Holding")
        }

        if(this.body?.velocity.y != null && this.body?.velocity.y !=  undefined){
            if (this.body.velocity.y < 0){
                this.anims.play("fall")
            } else if (this.body.velocity.y === 0 && this.body.blocked.down){
                this.anims.play("run", true)
            }
        } 
    }

    update(): void {
        this.basicMovement();
    }
}