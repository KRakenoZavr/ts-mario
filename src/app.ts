// import express from "express";
import Game from "./game/index";

// const app = express();
// const router = express.Router();
// const port = 3000;

declare global {
    interface Window { game: any; }
}

document.addEventListener("DOMContentLoaded", (event) => {

    const game = new Game();
    game.collision.updateSplitted({ min: 0, max: 150, width: 150 });

    game.collision.entities.forEach((el) => game.logEntity(el));

    console.log(game.collision.canMoveRight(game.mario));

    window.game = game;

});

// router.get("/", (req, res) => {
//     res.send("The sedulous hyena ate the antelope!");
// });
//
// app.use("/", router);
//
// app.listen(port);
//
// console.log(`Running at Port ${port}`);
