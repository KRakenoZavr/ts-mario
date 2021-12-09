// import express from "express";
import Game from './game/index'
import {config} from "./game/config/config";
// const app = express();
// const router = express.Router();
// const port = 3000;

declare global {
    interface Window {
        game: any,
        gameConfig: any,
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    const game = new Game()

    game.collision.updateSplitted(0, 2500000)

    // game.collision.entities.forEach((el) => game.logEntity(el))

    window.game = game
    window.gameConfig = config
})

// router.get("/", (req, res) => {
//     res.send("The sedulous hyena ate the antelope!");
// });
//
// app.use("/", router);
//
// app.listen(port);
//
// console.log(`Running at Port ${port}`);
