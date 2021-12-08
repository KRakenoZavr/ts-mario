import {Entity, MoveableEntity, MoveableEntityHelper} from './MoveableEntity'

interface MarioHelper extends MoveableEntityHelper {
    jump: (jumping: boolean) => void
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
    private _jumping: boolean
    private readonly _jumpTicks: number

    constructor({x, y, width, height, speed, gravity}: Entity) {
        super({x, y, width, height, speed, gravity})

        this._jumping = false
        this._jumpTicks = 3
    }

    // TODO define interval as method
    public jump(jumping: boolean) {
        if (jumping) {
            this._jumping = true
            // for (let i = 0; i < this._jumpTicks; i+=1) {
            // this.y -= this.speed;
            // }
            // let tick: number = 0
            // const interval = setInterval(() => {
            //     tick++
            this.y -= this.speed
            console.log("jumping", this.y)
            // if (tick === this._jumpTicks) {
            //     clearInterval(interval)
            //     this._jumping = false
            // }
            // }, 60)
        }
    }

    public changeJumping() {
        this._jumping = false
    }

    public down() {
        if (!this._jumping) {
            this.y += this.gravity
            console.log("falling", this.y)
        }
    }
}
