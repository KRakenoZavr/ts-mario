import CollisionClass from "./engine/collision";
import { StaticEntity } from "./entities";
import Mario from "./entities/mario";
import { StaticEntityClass } from "./entities/staticEnt";
import { keyCode } from "./keyHandler";

const allEntities: StaticEntity[] = [
    new StaticEntityClass({
        height: 10,
        width: 10,
        x: 0,
        y: 10,
    }),
    new StaticEntityClass({
        height: 10,
        width: 10,
        x: 10,
        y: 10,
    }),
    new StaticEntityClass({
        height: 10,
        width: 10,
        x: 110,
        y: 110,
    }),
    new StaticEntityClass({
        height: 10,
        width: 10,
        x: 100,
        y: 100,
    }),
];

export default class Game {
    public collision: CollisionClass;
    public mario: Mario;
    protected lives: number;

    constructor() {
        this.lives = 3;

        this.mario = new Mario({ x: 0, y: 0, width: 10, height: 10, speed: 2 });

        this.collision = new CollisionClass([...allEntities, this.mario]);

        this.init();
    }

    public checkCollision(): boolean {
        return this.collision.isOnSurface(this.mario);
    }

    public death() {
        this.lives--;
    }

    private init() {
        // this.keyHandler();
    }

    // private keyHandler() {
    //     window.addEventListener("keydown", (evt) => {
    //         switch (evt.code) {
    //             case  keyCode.LEFT:
    //                 evt.preventDefault();
    //                 this.mario.left();
    //                 break;
    //             case keyCode.RIGHT:
    //                 evt.preventDefault();
    //                 this.mario.right();
    //                 break;
    //             case keyCode.SPACE:
    //                 evt.preventDefault();
    //                 this.mario.jump();
    //                 break;
    //             default:
    //                 break;
    //         }
    //     });
    // }
}
