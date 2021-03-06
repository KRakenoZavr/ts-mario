import { Position, StaticEntity, StaticEntityHelper } from "./StaticEntity";

export interface Entity extends Position {
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
