import { SpriteBasicConfig } from "../types"

export default class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(
        spriteConfig: SpriteBasicConfig
    ) {
        super(spriteConfig.current_scene, spriteConfig.x, spriteConfig.y, spriteConfig.texture);


        this.setupPhysics();
    }

    init() {



    }

    update() {
        console.log("XD")
        this.basicMovement();
    }

    createControls() {
        
    }

    basicMovement() {
        

    }

    setupPhysics() {

        // Add the player to the scene
        this.scene.add.existing(this);

        // Enable physics on this player object
        this.scene.physics.world.enable(this);
    }

}