export type SpriteBasicConfig = {
    current_scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture
}

export type BasicControls = {
    up: Phaser.Input.Keyboard.Key,
    down: Phaser.Input.Keyboard.Key,
    right: Phaser.Input.Keyboard.Key,
    left: Phaser.Input.Keyboard.Key
}