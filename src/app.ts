// import express from "express";
import Game from "./game/index";

// const app = express();
// const router = express.Router();
// const port = 3000;

const game = new Game();
game.collision.updateSplitted({ min: 0, max: 150, width: 150 });
console.log(game.mario);
console.log(game.collision);

console.log(game.checkCollision());

// router.get("/", (req, res) => {
//     res.send("The sedulous hyena ate the antelope!");
// });
//
// app.use("/", router);
//
// app.listen(port);
//
// console.log(`Running at Port ${port}`);
