import CollisionClass from "./engine/collision";
import {EntityWithHelper, Mario, MoveableEntity, StaticEntity, StaticEntityWithHelper} from "./entities";
import KeyHandlerClass from "./keyHandler/KeyHandler";

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

export default class Game extends KeyHandlerClass {
    public collision: CollisionClass;
    public mario: Mario;
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    constructor() {
        super()

        this.mario = new Mario({ x: 0, y: 10, width: 10, height: 10, speed: 2 });

        this.collision = new CollisionClass([...allEntities, this.mario]);

        this.initCanvas()

        this.init()
    }

    private initCanvas() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
    }

    private init() {
        this.drawElements();

        let start = null;

        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            this.drawElements();
            window.requestAnimationFrame(step);
        }

        window.requestAnimationFrame(step);
    }

    public logEntity(entity: AnyEntityWithHelper) {
        console.log(entity instanceof Mario ? "mario" : "entity", {
            bottom: entity.bottomSide(),
            left: entity.leftSide(),
            right: entity.rightSide(),
            top: entity.topSide(),
        });
    }

    public drawElements() {
        this.ctx.clearRect(0, 0, 100, 100);

        for (const item of this.collision.entities) {

            if (item instanceof MoveableEntity) {
                if (!this.collision.isOnSurface(item)) {
                    item.down()
                }
            }

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
}
