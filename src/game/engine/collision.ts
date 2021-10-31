import { Entity, StaticEntity} from "../entities";

type anyEntity = Array<(Entity | StaticEntity)>;

export interface Collision {
    entities: anyEntity;
    splittedEntities: anyEntity;
    isOnSurface: (target: Entity) => boolean;
    canMoveRight: (target: Entity) => boolean;
    canMoveLeft: (target: Entity) => boolean;
}

export default class CollisionClass implements Collision {
    public entities: anyEntity;
    public splittedEntities: anyEntity;

    constructor(entities: anyEntity) {
        this.entities = entities;
    }

    // TODO save last splittedEntities
    public updateSplitted({ min, max }: Screen) {
        const splitted: anyEntity = [];
        for (const item of this.entities) {
            if (item.leftSide() >= min && item.rightSide() <= max) {
                splitted.push(item);
            }
        }
        this.splittedEntities = splitted;
    }

    // true if on surface
    public isOnSurface(target: Entity): boolean {
        for (const item of this.splittedEntities) {
            if (target === item) {
                continue;
            }
            if (
                target.bottomSide() >= item.topSide() &&
                target.leftSide() < item.rightSide() &&
                target.rightSide() > item.leftSide()
            ) {
                return true;
            }
        }
        return false;
    }

    public canMoveRight(target: Entity): boolean {
        for (const item of this.splittedEntities) {
            if (target === item) {
                continue;
            }
            if (
                target.rightSide() + target.speed >= item.leftSide() &&
                target.topSide()

            ) {
                return true;
            }
        }
        return false;
    }

    public canMoveLeft(target: Entity): boolean {
        return true
    }
}

interface Screen {
    min: number;
    max: number;
    width: number;
}
