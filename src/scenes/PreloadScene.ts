import { Scene3D } from '@enable3d/phaser-extension'
import * as THREE from 'three'

export default class PreloadScene extends Scene3D {
  terrace!: THREE.Group
  player!: THREE.Group
  bird!: THREE.Group

  constructor() {
    super({ key: 'PreloadScene' })
  }

  init() {
    this.accessThirdDimension({ maxSubSteps: 10, fixedTimeStep: 1 / 120 })

    this.third.renderer.outputEncoding = THREE.LinearEncoding
  }

  async preload() {
    await this.third.load.preload('terrace', '/assets/glb/terrace.glb')
    await this.third.load.preload('player', '/assets/glb/idle.glb')
    await this.third.load.preload('bird', '/assets/glb/bird.glb')
  }

  async create() {
    const terraceObject = await this.third.load.gltf('terrace')
    const playerObject = await this.third.load.gltf('player')
    const birdObject = await this.third.load.gltf('bird')

    const terraceScene = terraceObject.scenes[0]
    const playerScene = playerObject.scenes[0]
    const birdScene = birdObject.scenes[0]

    this.scene.start('MainScene', {
      terraceScene: terraceScene,
      playerScene: playerScene,
      birdScene: birdScene,
    })
  }

  update() {}
}
