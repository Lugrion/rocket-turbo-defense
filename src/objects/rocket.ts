import { SpriteBasicConfig } from "../types"

export default class Rocket extends Phaser.Physics.Arcade.Sprite {

    constructor(
        spriteConfig: SpriteBasicConfig
    ) {
        super(spriteConfig.current_scene, spriteConfig.x, spriteConfig.y, spriteConfig.texture);

        this.setupPhysics();
    }

    init() {

        // Make sure to dispose of the rockets once they have traversed the screen

        this.scene.tweens.add({
            targets: this,
            x: { from: 820, to: -100 },
            duration: 2000,
            onComplete: () => {
              this.destroy();
            },
          });
    }

    setupPhysics() {

        // Add the player to the scene
        this.scene.add.existing(this);

        // Enable physics on this player object
        this.scene.physics.world.enable(this);
    }

}