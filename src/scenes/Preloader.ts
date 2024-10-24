import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        // this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');
        this.load.image('background', 'bg.png');
        this.load.image('rocket', 'rocket.png');

        // this.load.image('on-fullscreen', 'ui/on-fullscreen.png');
        // this.load.image('off-fullscreen', 'ui/off-fullscreen.png');

        this.load.spritesheet('fullscreen', 'ui/fullscreen.png', { frameWidth: 200, frameHeight: 200 });

        this.load.atlas('planet', 'bg-planet.png', 'bg-planet.json');

        this.load.setPath('assets/astronaut');
        this.load.atlas('astro-j', 'astronaut-jump.png', 'astronaut-jump.json');
        this.load.atlas('astro-r', 'astronaut-run.png', 'astronaut-run.json');

        this.add.graphics().fillStyle(1,0).fillRect(0, 0, 800, 60).generateTexture('illusion', 800, 60).destroy();

        

    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
