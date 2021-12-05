export interface Position {
    x: number
    y: number
    width: number
    height: number
}

export interface StaticEntityHelper {
    rightSide(): number
    leftSide(): number
    topSide(): number
    bottomSide(): number
}

export interface StaticEntityWithHelper extends Position, StaticEntityHelper {}

export class StaticEntity implements StaticEntityWithHelper {
    public x: number
    public y: number
    public width: number
    public height: number

    constructor({ x, y, width, height }: Position) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    public rightSide(): number {
        return this.x + this.width
    }

    public leftSide(): number {
        return this.x
    }

    public topSide(): number {
        return this.y
    }

    public bottomSide(): number {
        return this.y + this.height
    }
}
