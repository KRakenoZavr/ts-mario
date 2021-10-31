"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moveEntity_1 = __importDefault(require("./moveEntity"));
// TODO
//  add acceleration
class Mario extends moveEntity_1.default {
    constructor({ x, y, width, height, speed, gravity }) {
        super({ x, y, width, height, speed, gravity });
        this.jumping = false;
        this.jumpTicks = 3;
    }
    jump() {
        if (!this.jumping) {
            this.jumping = true;
            let tick = 0;
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
exports.default = Mario;
//# sourceMappingURL=mario.js.map