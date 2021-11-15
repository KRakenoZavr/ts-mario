import CollisionClass from "./engine/collision";
import { EntityWithHelper, Mario, StaticEntity, StaticEntityWithHelper } from "./entities";
import { keyCode } from "./keyHandler";

type AnyEntityWithHelper = EntityWithHelper | StaticEntityWithHelper;

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
        y: 15,
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
];

export default class Game {
    public collision: CollisionClass;
    public mario: Mario;
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    protected lives: number;

    constructor() {
        this.lives = 3;

        this.mario = new Mario({ x: 0, y: 10, width: 10, height: 10, speed: 2 });

        this.collision = new CollisionClass([...allEntities, this.mario]);

        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.init();
    }

    public checkCollision(): boolean {
        // return this.collision.isOnSurface(this.mario);
        return this.collision.canMoveRight(this.mario);
    }

    public death() {
        this.lives--;
    }

    public logEntity(entity: AnyEntityWithHelper) {
        console.log(entity instanceof Mario ? "mario" : "entity", {
            bottom: entity.bottomSide,
            left: entity.leftSide,
            right: entity.rightSide,
            top: entity.topSide,
        });
    }

    public drawElements() {
        this.ctx.clearRect(0, 0, 100, 100);

        for (const item of this.collision.entities) {
            this.ctx.beginPath();
            this.ctx.rect(item.x, item.y, item.width, item.height);
            if (item instanceof Mario) {
                this.ctx.fillStyle = "#005eff";
            } else {
                this.ctx.fillStyle = "#FF0000";
            }
            this.ctx.fill();
            this.ctx.closePath();
        }
    }

    private init() {
        this.keyHandler();
        this.drawElements();
    }

    private keyHandler() {
        window.addEventListener("keydown", (evt) => {
            switch (evt.code) {
                case  keyCode.LEFT:
                    evt.preventDefault();
                    this.mario.left();
                    break;
                case keyCode.RIGHT:
                    evt.preventDefault();
                    this.mario.right();
                    break;
                case keyCode.SPACE:
                    evt.preventDefault();
                    this.mario.jump();
                    break;
                default:
                    break;
            }

            this.drawElements();
            this.collision.canMoveRight(this.mario);
            this.collision.canMoveLeft(this.mario);
        });
    }
}
