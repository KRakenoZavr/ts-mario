import { Entity } from "./index";
import { StaticEntity } from "./staticEnt";

export default class MoveEntity extends StaticEntity  implements Entity {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public speed: number;
    public gravity: number;

    constructor({ x, y, width, height, speed, gravity = speed * 2 }: Entity) {
        super({ x, y, width, height });

        this.speed = speed;
        this.gravity = gravity;
    }

    public left() {
        this.x -= this.speed;
    }

    public right() {
        this.x += this.speed;
    }

    public down() {
        this.y += this.gravity;
    }
}
