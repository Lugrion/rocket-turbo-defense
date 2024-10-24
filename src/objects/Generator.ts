import { MainRunner } from "../scenes/MainRunner";
import Rocket from "./rocket";

export default class Generator {

    scene: MainRunner

    constructor(scene: MainRunner) {
        this.scene = scene;

    }

    init() {

    }

    /*
        This is the function that generates the rockets. 
        It creates a new rocket and then calls itself again after a random amount of time.
        
        This is done using the Phaser `time.delayedCall` function.
    */

    generateRocket() {
        
        this.scene.basicRockets.add(
            new Rocket({
                current_scene: this.scene,
                x: this.scene.camera.width + 200,
                y: Phaser.Math.Between(this.scene.cameras.main.height / 12, this.scene.cameras.main.height - this.scene.cameras.main.height / 12),
                texture: "rocket"
            }
            ).setScale(5).setVelocityX(- Phaser.Math.Between(100, 700)).setBodySize(6, 6)
        );

        this.scene.time.delayedCall(
            Phaser.Math.Between(1500, 2500),
            () => this.generateRocket(),
            undefined,
            this
        );
    }
}