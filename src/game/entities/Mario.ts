import {Entity, MoveableEntity, MoveableEntityHelper} from './MoveableEntity'

interface MarioHelper extends MoveableEntityHelper {
    jumping: boolean

    jump: (jumping: boolean) => void
    changeJumping: () => void
}

// TODO
//  add acceleration
export class Mario extends MoveableEntity implements Entity, MarioHelper {
    public x: number
    public y: number
    public width: number
    public height: number
    public speed: number
    public gravity: number
    public jumping: boolean
    private _maxJumpHeight: number
    private readonly _jumpTicks: number

    constructor({x, y, width, height, speed, gravity}: Entity) {
        super({x, y, width, height, speed, gravity})

        this.jumping = false
        this._jumpTicks = 3
        this._maxJumpHeight = -1
    }

    // TODO define interval as method
    public jump(jumping: boolean) {
        if (jumping) {
            this.jumping = true
            if (this._maxJumpHeight === -1) {
                this._maxJumpHeight = this.y - this.gravity * 10
            }
            if (this.y === this._maxJumpHeight) {
                this._setToDefault()
            } else {
                this.y -= this.gravity
            }
        }
    }

    private _setToDefault() {
        this.jumping = false
        this._maxJumpHeight = -1
    }

    public changeJumping() {
        this._setToDefault()
    }

    public down() {
        if (!this.jumping) {
            this.y += this.gravity
        }
    }
}
