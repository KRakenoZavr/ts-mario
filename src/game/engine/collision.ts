import {Entity, EntityWithHelper, Mario, MoveableEntity, StaticEntity, StaticEntityWithHelper} from '../entities'

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
        this.staticEntites = []
        this.splittedMovableEntities = []
        this.splittedEntities = []


        this._initEntites(entities)

        this.allEntities = entities
        // TODO update splitted entites and splitted movable

    }

    private _initEntites(entities: AnyEntity) {
        for (const item of entities) {
            if (item instanceof MoveableEntity) {
                this.movableEntities.push(item)
            } else if (item instanceof StaticEntity) {
                this.staticEntites.push(item)
            }

            this._isItemNearMario(item)
        }
        console.log("movables::", this.movableEntities)
        console.log("static::", this.staticEntites)
    }

    private _maxLeftAndRight() {
        const min = this._mario.leftSide() - this._config.maxLeft * this._config.width
        const max = this._mario.rightSide() + this._config.maxLeft * this._config.width
        return {min, max}
    }

    private _isItemNearMario(item: AnyEntityWithHelper) {
        const {min, max} = this._maxLeftAndRight()

        if (item.x > min && item.x < max) {
            this.splittedEntities.push(item)
        }
    }

    // TODO save last splittedEntities
    public updateSplitted() {
        this.splittedEntities.splice(0, this.splittedEntities.length)

        for (const item of this.allEntities) {
            this._isItemNearMario(item)
        }
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
