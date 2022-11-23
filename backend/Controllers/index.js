const { response } = require("express");
const { Pool } = require("pg");

const connectOptions = {
  host: process.env.HOST,
  user: process.env.USER,
  port: Number(process.env.PORT),
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

const pool = new Pool(connectOptions);

const getUsers = (req, res) => {
  pool
    .query(`select * from "3.16_G4_S3"."User" order by "User"."User_id" asc`)
    .then((results) => {
      console.log("users get successfully");
      res.render("users", { data: results });
    })
    .catch((e) => console.log(e));
};

const createUser = (req, res) => {
  const { User_id, User_name, Password, Email_id,BirthDate, Age } = req.body;
  console.log(req.body);
  pool
    .query(`INSERT into "3.16_G4_S3"."User" VALUES($1, $2, $3, $4,$5,$6)`, [
      User_id, User_name, Password, Email_id,BirthDate, Age
    ])
    .then((response) => {
      console.log("new user created successfully");
      console.log(response);
      res.redirect("/users");
    })
    .catch((err) => res.json(err));
};

const updateUser = (req, res) => {
  const id = Number(req.params.id);
  const { User_name,Password} = req.body;
   console.log(req.body);
  pool
    .query(
      `UPDATE "3.16_G4_S3"."User" SET "User_name" = $1,"Password" = $2 where "User_id" = $3`,
      [User_name,Password,id]
    )
    .then((response) => {
      console.log("user updated successfully");
      res.redirect("/users");
    })
    .catch((err) => res.json(err));
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  console.log(id);
  pool
    .query(`DELETE FROM "3.16_G4_S3"."User" where "User_id" = $1`, [id])
    .then((response) => {
      console.log(response);
      // res.json(response);
      res.redirect("/users");
    })
    .catch((err) => res.json(err));
};

const getGames = (req, res) => {
  pool
    .query(` select * from "3.16_G4_S3"."Games" order by "Games"."Game_id" asc`)
    .then((results) => {
      console.log("games get successfully");
      res.render("games", { data: results });
    })
    .catch((e) => res.json(e));
};


const createGame = (req, res) => {
  const { Game_id,Game_name,Version,Specification,Rating,Type_of_Game,Content_Rating,Price,Dev_id } =
    req.body;
  pool
    .query(
      `insert into "3.16_G4_S3"."Games" values($1, $2, $3, $4, $5,  $6,  $7, $8, $9)`,
      [Game_id,Game_name,Version,Specification,Rating,Type_of_Game,Content_Rating,Price,Dev_id]
    )
    .then((response) => {
      console.log("Game added successfully");
      res.redirect("/games");
    })
    .catch((err) => res.json(err));
};

const deleteGame = (req, res) => {
  const id = req.params.id;
  console.log(id);
  pool
    .query(`DELETE FROM "3.16_G4_S3"."Games" WHERE "Game_id" = $1`, [id])
    .then((response) => {
      console.log("Game deleted successfully");
      res.redirect("/games");
    })
    .catch((err) => res.json(err));
};

const updateGame = (req, res) => {
  const id = req.params.id;
  const { Version,Rating,Price } = req.body;
  pool
    .query(
      `UPDATE "3.16_G4_S3"."Games" SET "Version" = $1, 
                                              "Rating" = $2,
                                             "Price" = $3
                                              where "Game_id" = $4`,
      [Version,Rating,Price,id]
    )
    .then((response) => {
      console.log("Game updated successfully");
      res.redirect("/games");
    })
    .catch((err) => res.json(err));
};

const getQuery = (req, res) => {
  res.render("queries", { data: {} });
};

const runQuery = (req, res) => {
  // console.log(req.body);
  pool
    .query(`${req.body.query}`)
    .then((response) => res.render("queries", { data: response }))
    .catch((err) => res.json(err));
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  getGames,
  deleteUser,
  createGame,
  deleteGame,
  updateGame,
  getQuery,
  runQuery,
};
