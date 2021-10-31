"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CollisionClass {
    constructor(entities) {
        this.entities = entities;
    }
    // TODO save last splittedEntities
    updateSplitted({ min, max }) {
        const splitted = [];
        for (const item of this.entities) {
            if (item.leftSide() >= min && item.rightSide() <= max) {
                splitted.push(item);
            }
        }
        this.splittedEntities = splitted;
    }
    isOnSurface(target) {
        for (const item of this.splittedEntities) {
            if (target === item) {
                continue;
            }
            if (target.bottomSide() >= item.topSide() &&
                target.leftSide() < item.rightSide() &&
                target.rightSide() > item.leftSide()) {
                return true;
            }
        }
        return false;
    }
}
exports.default = CollisionClass;
//# sourceMappingURL=collision.js.map