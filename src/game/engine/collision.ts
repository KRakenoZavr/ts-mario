import {Entity, EntityWithHelper, Mario, MoveableEntity, StaticEntityWithHelper} from '../entities'

type AnyEntityWithHelper = EntityWithHelper | StaticEntityWithHelper
type AnyEntity = AnyEntityWithHelper[]

export interface Collision {
    // all game elements
    allEntities: AnyEntity
    // game elements near mario
    splittedEntities: AnyEntity
    // all static elements
    staticEntites: StaticEntityWithHelper[]
    // all movable elements
    movableEntities: EntityWithHelper[]
    // movable elements near mario
    splittedMovableEntities: EntityWithHelper[]

    isOnSurface: (target: Entity) => boolean
    somethingOnTop: (target: Entity) => boolean
    canMoveRight: (target: Entity) => boolean
    canMoveLeft: (target: Entity) => boolean
}

export default class CollisionClass implements Collision {
    public readonly allEntities: AnyEntity
    public splittedEntities: AnyEntity

    public readonly staticEntites: StaticEntityWithHelper[]

    public readonly movableEntities: EntityWithHelper[]
    public splittedMovableEntities: EntityWithHelper[]

    private readonly _mario: Mario
    private readonly _config: any

    constructor(entities: AnyEntity, mario: Mario, config) {
        this._mario = mario

        this._config = config

        this.movableEntities = []
        this.splittedMovableEntities = []


        this._initEntites(entities)

        this.allEntities = entities
        // TODO only 10 items left and right
        this.splittedEntities = entities
        // TODO update splitted entites and splitted movable

    }

    private _initEntites(entities: AnyEntity) {
        for (const item of entities) {
            if (item instanceof MoveableEntity) {
                this.movableEntities.push(item)
            }
        }
        console.log("movables::", this.movableEntities)
    }

    // TODO save last splittedEntities
    public updateSplitted(min: number, max: number) {
        const splitted: AnyEntity = []
        for (const item of this.allEntities) {
            if (item.leftSide() >= min && item.rightSide() <= max) {
                splitted.push(item)
            }
        }
        this.splittedEntities = splitted
    }

    // true if on surface
    public isOnSurface(target: EntityWithHelper): boolean {
        for (const item of this.splittedEntities) {
            if (target === item) {
                continue
            }
            if (
                target.bottomSide() === item.topSide() &&
                target.leftSide() < item.rightSide() &&
                target.rightSide() > item.leftSide()
            ) {
                return true
            }
        }
        return false
    }

    public somethingOnTop(target: EntityWithHelper): boolean {
        for (const item of this.splittedEntities) {
            if (target === item) {
                continue
            }
            if (
                target.topSide() === item.bottomSide() &&
                target.leftSide() < item.rightSide() &&
                target.rightSide() > item.leftSide()
            ) {
                return true
            }
        }
        return false
    }

    public canMoveRight(target: EntityWithHelper): boolean {
        for (const item of this.splittedEntities) {
            if (target === item) {
                continue
            }
            if (
                this._targetRightBetweenItem(target, item) &&
                (this._targetTopBetweenItem(target, item) ||
                    this._targetBottomBetweenItem(target, item))
            ) {
                return false
            }
        }
        return true
    }

    public canMoveLeft(target: EntityWithHelper): boolean {
        for (const item of this.splittedEntities) {
            if (target === item) {
                continue
            }
            if (
                this._targetLeftBetweenItem(target, item) &&
                (this._targetTopBetweenItem(target, item) ||
                    this._targetBottomBetweenItem(target, item))
            ) {
                return false
            }
        }
        return true
    }

    private _targetTopBetweenItem(
        target: EntityWithHelper,
        item: AnyEntityWithHelper
    ): boolean {
        return (
            target.topSide() >= item.topSide() &&
            target.topSide() < item.bottomSide()
        )
    }

    private _targetBottomBetweenItem(
        target: EntityWithHelper,
        item: AnyEntityWithHelper
    ): boolean {
        return (
            target.bottomSide() > item.topSide() &&
            target.bottomSide() < item.bottomSide()
        )
    }

    private _targetRightBetweenItem(
        target: EntityWithHelper,
        item: AnyEntityWithHelper
    ): boolean {
        return (
            target.rightSide() >= item.leftSide() &&
            target.rightSide() < item.rightSide()
        )
    }

    private _targetLeftBetweenItem(
        target: EntityWithHelper,
        item: AnyEntityWithHelper
    ): boolean {
        return (
            target.leftSide() <= item.rightSide() &&
            target.leftSide() > item.leftSide()
        )
    }
}

interface Screen {
    min: number
    max: number
    width: number
}
