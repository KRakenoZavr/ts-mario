export interface Position {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface StaticEntity extends Position {
    rightSide?(): number;
    leftSide?(): number;
    topSide?(): number;
    bottomSide?(): number;
}

export interface Entity extends StaticEntity {
    speed: number;
    gravity?: number;
}
