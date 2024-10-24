import { SpriteBasicConfig } from "../types"

export default class Illusion extends Phaser.Physics.Arcade.Sprite {

    constructor(
        spriteConfig: SpriteBasicConfig
    ) {
        super(spriteConfig.current_scene, spriteConfig.x, spriteConfig.y, spriteConfig.texture);

        this.setupPhysics();
    }

    init() {

        // Make sure to dispose of the rockets once they have traversed the screen

        
    }

    setupPhysics() {

        // Add the player to the scene
        this.scene.add.existing(this);

        // Enable physics on this player object
        this.scene.physics.world.enable(this);

        // Prevent body from traversing off edges
        this.setCollideWorldBounds(true);

        this.setImmovable()
    }

}