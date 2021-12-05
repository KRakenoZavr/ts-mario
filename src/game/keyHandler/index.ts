export enum keyCode {
    SPACE = 'Space',
    RIGHT = 'ArrowRight',
    LEFT = 'ArrowLeft',
    ESC = 'Escape',
    F = 'KeyF',
}

export interface KeyHandler {
    left: boolean
    right: boolean
    jump: boolean
}
