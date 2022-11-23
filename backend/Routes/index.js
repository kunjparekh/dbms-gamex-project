const express = require("express");
const router = express.Router();
const{
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getGames,
    createGame,
    deleteGame,
    updateGame,
    getQuery,
    runQuery
} = require("../Controllers/index")


router.get("/", (req,res)=>res.render("index"));
router.get("/users",getUsers);
router.post("/users",createUser);
router.put("/users/:id",updateUser);
router.delete("/users/:id",deleteUser);
router.get("/games",getGames);
router.post("/games",createGame);
router.put("/games/:id",updateGame);
router.delete("/games/:id",deleteGame);
router.get("/queries",getQuery);
router.post("/queries",runQuery);


module.exports = router;
