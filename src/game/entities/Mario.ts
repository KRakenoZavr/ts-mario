import { Entity, MoveableEntity, MoveableEntityHelper } from "./MoveableEntity";

interface MarioHelper extends MoveableEntityHelper {
    jump: () => void;
}

// TODO
//  add acceleration
export class Mario extends MoveableEntity implements Entity, MarioHelper {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public speed: number;
    public gravity: number;
    private _jumping: boolean;
    private readonly _jumpTicks: number;

    constructor({ x, y, width, height, speed, gravity }: Entity) {
        super({ x, y, width, height, speed, gravity });

        this._jumping = false;
        this._jumpTicks = 3;
    }

    // TODO define interval as method
    public jump() {
        if (!this._jumping) {
            this._jumping = true;
            let tick: number = 0;
            const interval = setInterval(() => {
                tick++;
                this.y -= this.speed;
                if (tick === this._jumpTicks) {
                    clearInterval(interval);
                }
            }, 500);
        }
    }
}
