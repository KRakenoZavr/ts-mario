"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from "express";
const index_1 = __importDefault(require("./game/index"));
// const app = express();
// const router = express.Router();
// const port = 3000;
const game = new index_1.default();
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
//# sourceMappingURL=app.js.map