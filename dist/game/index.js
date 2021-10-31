"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const collision_1 = __importDefault(require("./engine/collision"));
const mario_1 = __importDefault(require("./entities/mario"));
const staticEnt_1 = require("./entities/staticEnt");
const allEntities = [
    new staticEnt_1.StaticEntityClass({
        height: 10,
        width: 10,
        x: 0,
        y: 10,
    }),
    new staticEnt_1.StaticEntityClass({
        height: 10,
        width: 10,
        x: 10,
        y: 10,
    }),
    new staticEnt_1.StaticEntityClass({
        height: 10,
        width: 10,
        x: 110,
        y: 110,
    }),
    new staticEnt_1.StaticEntityClass({
        height: 10,
        width: 10,
        x: 100,
        y: 100,
    }),
];
class Game {
    constructor() {
        this.lives = 3;
        this.mario = new mario_1.default({ x: 0, y: 0, width: 10, height: 10, speed: 2 });
        this.collision = new collision_1.default([...allEntities, this.mario]);
        this.init();
    }
    checkCollision() {
        return this.collision.isOnSurface(this.mario);
    }
    death() {
        this.lives--;
    }
    init() {
        // this.keyHandler();
    }
}
exports.default = Game;
//# sourceMappingURL=index.js.map