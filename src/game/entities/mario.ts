import { Entity } from "./index";
import MoveEntity from "./moveEntity";

// TODO
//  add acceleration
export default class Mario extends MoveEntity {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public speed: number;
    public gravity: number;
    private jumping: boolean;
    private readonly jumpTicks: number;

    constructor({ x, y, width, height, speed, gravity }: Entity) {
        super({ x, y, width, height, speed, gravity });

        this.jumping = false;
        this.jumpTicks = 3;
    }

    // TODO define interval as method
    public jump() {
        if (!this.jumping) {
            this.jumping = true;
            let tick: number = 0;
            const interval = setInterval(() => {
                tick++;
                this.y -= this.speed;
                if (tick === this.jumpTicks) {
                    clearInterval(interval);
                }
            }, 500);
        }
    }
}
