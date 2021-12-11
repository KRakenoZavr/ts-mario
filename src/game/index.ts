import CollisionClass from './engine/collision'
import {
    EntityWithHelper,
    Mario,
    MoveableEntity,
    StaticEntity,
    StaticEntityWithHelper,
} from './entities'
import KeyHandlerClass from './keyHandler/KeyHandler'
import {DrawLevel} from "./map/CreateLevel";
import {config} from "./config/config";

type AnyEntityWithHelper = EntityWithHelper | StaticEntityWithHelper

export default class Game extends KeyHandlerClass {
    public collision: CollisionClass
    public mario: Mario
    public canvas: HTMLCanvasElement
    public ctx: CanvasRenderingContext2D
    public level: DrawLevel

    public gameScreen: any

    public config: any

    constructor() {
        super()

        this.config = config

        this._initCanvas()
        this._initClasses()
        this._init()
    }

    private _initClasses() {
        this.level = new DrawLevel(this.ctx, this.config)

        this.gameScreen = {
            x: 0
        }

        const {entities, mario} = this.level.createLevelObjects()

        this.mario = mario

        this.collision = new CollisionClass(entities, mario, this.config)
    }

    private _initCanvas() {
        this.canvas = document.createElement('canvas')
        this.canvas.width = 15000
        this.ctx = this.canvas.getContext('2d')

        document.body.appendChild(this.canvas)
    }

    private _init() {

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
        // this.ctx.clearRect(0, 0, 100000, 1000)

        this._handleMarioMovement()

        this._handleGravity()

    }

    // TODO should handle movable entities
    private _handleMarioMovement() {
        // mario jump
        const canJump = this.jump && !this.collision.somethingOnTop(this.mario)

        const canMoveLeft = this.left && this.collision.canMoveLeft(this.mario)
        const canMoveRight = this.right && this.collision.canMoveRight(this.mario)
        const canMoveUp = canJump && (this.mario.jumping || this.collision.isOnSurface(this.mario))

        if (
            canMoveUp || canMoveLeft || canMoveRight
        ) {
            this._clearRect(this.mario)


            // mario left
            if (canMoveLeft) {

                // update entities that collide
                this.collision.updateSplitted()

                this.mario.left()
            }
            // mario right
            if (canMoveRight) {

                // update entities that collide
                this.collision.updateSplitted()

                // 400 to variable
                if (0 - this.gameScreen.x + 400 < this.mario.x) {
                    // move game screen
                    this.gameScreen.x -= this.config.speed

                    this.canvas.style.transform = `translateX(${this.gameScreen.x}px)`
                }

                this.mario.right()
            }
            // mario jump
            if (canMoveUp) {
                this.mario.jump(this.jump)
            }

            this.level.drawSingleItem(this.mario)
        }

        // TODO
        // do this func only once
        if (!canJump) {
            this.mario.changeJumping()
        }
    }

    private _clearRect(item: MoveableEntity) {
        this.ctx.clearRect(item.x, item.y, item.width, item.height)
    }

    private _handleGravity() {
        for (const item of this.collision.movableEntities) {
            // this.ctx.clearRect(item.x, item.y, item.width, item.height)

            // if nothing is under item
            if (!this.collision.isOnSurface(item)) {
                this._clearRect(item)

                item.down()

                this.level.drawSingleItem(item)
            }

            // refill game screen with new objects
            // this.level.drawSingleItem(item)
        }
    }
}
