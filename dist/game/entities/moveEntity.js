"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const staticEnt_1 = require("./staticEnt");
class MoveEntity extends staticEnt_1.StaticEntity {
    constructor({ x, y, width, height, speed, gravity = speed * 2 }) {
        super({ x, y, width, height });
        this.speed = speed;
        this.gravity = gravity;
    }
    left() {
        this.x -= this.speed;
    }
    right() {
        this.x += this.speed;
    }
    down() {
        this.y += this.gravity;
    }
}
exports.default = MoveEntity;
//# sourceMappingURL=moveEntity.js.map