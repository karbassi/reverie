import { Scene3D } from '@enable3d/phaser-extension'

export default class PreloadScene extends Scene3D {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  init() {
    this.accessThirdDimension()
  }

  async preload() {
    await this.third.load.preload('terrace', '/assets/glb/terrace.glb')
    await this.third.load.preload('player', '/assets/glb/idle.glb')
    await this.third.load.preload('bird', '/assets/glb/bird.glb')
  }

  async create() {
    // loads the gltf file and returns a promise
    const terraceObject = await this.third.load.gltf('terrace')
    const playerObject = await this.third.load.gltf('player')
    const birdObject = await this.third.load.gltf('bird')

    // get the first scene from the gltf files
    const terraceScene = terraceObject.scenes[0]
    const playerScene = playerObject.scenes[0]
    const birdScene = birdObject.scenes[0]

    // Call the MainScene and pass the loaded scenes
    this.scene.start('MainScene', {
      terraceScene: terraceScene,
      playerScene: playerScene,
      birdScene: birdScene,
    })
  }
}
