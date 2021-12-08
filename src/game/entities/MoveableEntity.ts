import {Position, PositionWithColor, StaticEntity, StaticEntityHelper} from "./StaticEntity";

export interface Entity extends PositionWithColor {
    speed: number;
    gravity?: number;
}

export interface MoveableEntityHelper extends StaticEntityHelper {
    left(): void;
    right(): void;
    down(): void;
}

export interface EntityWithHelper extends MoveableEntityHelper, Entity {}

export class MoveableEntity extends StaticEntity implements EntityWithHelper {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public speed: number;
    public gravity: number;

    constructor({ x, y, width, height, color, speed, gravity = speed }: Entity) {
        super({ x, y, width, height, color });

        this.speed = speed;
        this.gravity = gravity;
    }

    public left() {
        this.x -= this.speed;
    }

    public right() {
        console.log(this)
        this.x += this.speed;
    }

    public down() {
        this.y += this.gravity;
    }
}
