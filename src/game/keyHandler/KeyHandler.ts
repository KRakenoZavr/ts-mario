import {KeyHandler, keyCode} from "./index"

export default class KeyHandlerClass implements KeyHandler {
    public left: boolean;
    public right: boolean;
    public jump: boolean;

    constructor() {
        this.left = false;
        this.right = false;
        this.jump = false;

        window.addEventListener("keydown", this.keyDown)
        window.addEventListener("keyup", this.keyUp)
    }

    private keyDown(evt) {
        switch (evt.code) {
            case keyCode.LEFT:
                evt.preventDefault();
                this.left = true;
                break;
            case keyCode.RIGHT:
                evt.preventDefault();
                this.right = true;
                break;
            case keyCode.SPACE:
                evt.preventDefault();
                this.jump = true;
                break;
            default:
                break;
        }
    }

    private keyUp(evt) {
        switch (evt.code) {
            case keyCode.LEFT:
                evt.preventDefault();
                this.left = false;
                break;
            case keyCode.RIGHT:
                evt.preventDefault();
                this.right = false;
                break;
            case keyCode.SPACE:
                evt.preventDefault();
                this.jump = false;
                break;
            default:
                break;
        }
    }
}
