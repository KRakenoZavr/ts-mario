"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticEntityClass = exports.StaticEntity = void 0;
class StaticEntity {
    constructor({ x, y, width, height }) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    rightSide() {
        return this.x + this.width;
    }
    leftSide() {
        return this.x;
    }
    topSide() {
        return this.y;
    }
    bottomSide() {
        return this.y + this.height;
    }
}
exports.StaticEntity = StaticEntity;
exports.StaticEntityClass = StaticEntity;
//# sourceMappingURL=staticEnt.js.map