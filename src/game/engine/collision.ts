import { Entity, EntityWithHelper, StaticEntityWithHelper } from "../entities";

type AnyEntityWithHelper = EntityWithHelper | StaticEntityWithHelper;
type AnyEntity = Array<(AnyEntityWithHelper)>;

export interface Collision {
    entities: AnyEntity;

    isOnSurface: (target: Entity) => boolean;
    canMoveRight: (target: Entity) => boolean;
    canMoveLeft: (target: Entity) => boolean;
}

export default class CollisionClass implements Collision {
    public entities: AnyEntity;
    private _splittedEntities: AnyEntity;

    constructor(entities: AnyEntity) {
        this.entities = entities;
    }

    // TODO save last splittedEntities
    public updateSplitted({ min, max }: Screen) {
        const splitted: AnyEntity = [];
        for (const item of this.entities) {
            if (item.leftSide() >= min && item.rightSide() <= max) {
                splitted.push(item);
            }
        }
        this._splittedEntities = splitted;
    }

    // true if on surface
    public isOnSurface(target: EntityWithHelper): boolean {
        for (const item of this._splittedEntities) {
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

    public canMoveRight(target: EntityWithHelper): boolean {
        for (const item of this._splittedEntities) {
            if (target === item) {
                continue;
            }
            if (
                this._targetRightBetweenItem(target, item) &&
                (
                    this._targetTopBetweenItem(target, item) ||
                    this._targetBottomBetweenItem(target, item)
                )
            ) {
                console.log("right", { target, item });
                return false;
            }
        }
        return true;
    }

    public canMoveLeft(target: EntityWithHelper): boolean {
        for (const item of this._splittedEntities) {
            if (target === item) {
                continue;
            }
            if (
                this._targetLeftBetweenItem(target, item) &&
                (
                    this._targetTopBetweenItem(target, item) ||
                    this._targetBottomBetweenItem(target, item)
                )
            ) {
                console.log("left", { target, item });
                return false;
            }
        }
        return true;
    }

    private _targetTopBetweenItem(target: EntityWithHelper, item: AnyEntityWithHelper): boolean {
        return target.topSide() > item.topSide() &&
            target.topSide() < item.bottomSide();
    }

    private _targetBottomBetweenItem(target: EntityWithHelper, item: AnyEntityWithHelper): boolean {
        return target.bottomSide() > item.topSide() &&
            target.bottomSide() < item.bottomSide();
    }

    private _targetRightBetweenItem(target: EntityWithHelper, item: AnyEntityWithHelper): boolean {
        return target.rightSide() >= item.leftSide() &&
            target.rightSide() < item.rightSide();
    }

    private _targetLeftBetweenItem(target: EntityWithHelper, item: AnyEntityWithHelper): boolean {
        return target.leftSide() <= item.rightSide() &&
            target.leftSide() > item.leftSide();
    }
}

interface Screen {
    min: number;
    max: number;
    width: number;
}
