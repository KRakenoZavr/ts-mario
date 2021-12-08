import CollisionClass from './engine/collision'
import {
    EntityWithHelper,
    Mario,
    MoveableEntity,
    StaticEntity,
    StaticEntityWithHelper,
} from './entities'
import KeyHandlerClass from './keyHandler/KeyHandler'

type AnyEntityWithHelper = EntityWithHelper | StaticEntityWithHelper

const allEntities: StaticEntity[] = [
    new StaticEntity({
        height: 10,
        width: 10,
        x: 0,
        y: 20,
    }),
    new StaticEntity({
        height: 10,
        width: 10,
        x: 10,
        y: 20,
    }),
    new StaticEntity({
        height: 10,
        width: 10,
        x: 20,
        y: 16,
    }),
    // new StaticEntity({
    //     height: 10,
    //     width: 10,
    //     x: 40,
    //     y: 5,
    // }),
    new StaticEntity({
        height: 10,
        width: 10,
        x: 30,
        y: 20,
    }),
]

export default class Game extends KeyHandlerClass {
    public collision: CollisionClass
    public mario: Mario
    public canvas: HTMLCanvasElement
    public ctx: CanvasRenderingContext2D

    constructor() {
        super()

        this.mario = new Mario({x: 0, y: 10, width: 10, height: 10, speed: 2})

        this.collision = new CollisionClass([...allEntities, this.mario])

        this.init()
    }

    private _initCanvas() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    private init() {
        this._initCanvas()

        this._handleGameElements()

        const fps: number = 60
        let now: number
        let then: number = Date.now()
        const interval: number = 1000 / fps
        let delta: number

        const step = () => {
            window.requestAnimationFrame(step)

            now = Date.now()
            delta = now - then

            if (delta > interval) {
                then = now - (delta % interval)

                this._handleGameElements()
            }

        }

        step()
    }

    public logEntity(entity: AnyEntityWithHelper) {
        console.log(entity instanceof Mario ? 'mario' : 'entity', {
            bottom: entity.bottomSide(),
            left: entity.leftSide(),
            right: entity.rightSide(),
            top: entity.topSide(),
        })
    }

    public _handleGameElements() {
        // clear game screen
        this.ctx.clearRect(0, 0, 100, 100)

        this._handleMarioMovement()

        for (const item of this.collision.entities) {
            this._handleGravity(item)

            // refill game screen with new objects
            this._drawSingleItem(item)
        }
    }

    private _handleMarioMovement() {
        // mario left
        if (this.left && this.collision.canMoveLeft(this.mario)) {
            this.mario.left()
        }
        // mario right
        if (this.right && this.collision.canMoveRight(this.mario)) {
            this.mario.right()
        }
        // mario jump
        if (
            this.jump &&
            (this.mario.jumping || this.collision.isOnSurface(this.mario))
        ) {
            this.mario.jump(this.jump)
        }
        // TODO
        // do this func only once
        if (!this.jump) {
            this.mario.changeJumping()
        }
    }

    private _handleGravity(item: AnyEntityWithHelper) {
        // if item not static entity
        if (item instanceof MoveableEntity) {
            // if nothing is under item
            if (!this.collision.isOnSurface(item)) {
                item.down()
            }
        }
    }

    private _drawSingleItem(item: AnyEntityWithHelper) {
        this.ctx.beginPath()
        this.ctx.rect(item.x, item.y, item.width, item.height)

        // TODO should be item.color
        if (item instanceof Mario) {
            this.ctx.fillStyle = '#005eff'
        } else {
            this.ctx.fillStyle = '#FF0000'
        }

        this.ctx.fill()
        this.ctx.closePath()
    }
}
