const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const db = require("./config/db");
const { User, Favorite } = require("./models");

// SCHEMA: TYPE DEF, QUERY, MUTATION
const schema = buildSchema(`

    type User {
        id: Int
        name: String
        lastname: String
        fullname: String
        email: String
        password: String
        nickname: String
        salt: String
        favorites: [Favorite]
    }

    type Favorite {
        id: Int
        media_id: Int
        media_type: String
        name: String
        poster_path: String
    }

    type Query {
        users: [User]
    	user(id: Int): User
        favorites: [Favorite]
    }

    type Mutation {
    	addUser(name: String, lastname: String, email: String, password: String): User
  	}

`);

// Obtener todos los usuarios
const getAllUsers = () => {
  return User.findAll({ include: Favorite }).then((users) => users);
};

// Obtener 1 usuario
const getUser = (data) => {
  return User.findOne({
    where: { id: data.id },
    include: Favorite,
  }).then((user) => user);
};

// Crear 1 usuario
const addUser = ({ name, lastname, email, password }) => {
  return User.create({ name, lastname, email, password }).then((user) => user);
};

// Obtener todos los favoritos
const getFavorites = () => {
  return Favorite.findAll().then((favorites) => favorites);
};

// Función para resolver las peticiones
const root = {
  users: () => getAllUsers(),

  user: (data) => getUser(data),

  addUser: (data) => addUser(data),

  favorites: () => getFavorites(),
};

const app = express();

app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

db.sync({ force: false }).then(() =>
  app.listen(4000, () => {
    console.log("Now browse to localhost:4000/graphql");
  })
);
