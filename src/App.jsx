import React from "react";
import axios from "axios";

const App = () => {
  const user = { id: 1 };

  const newUser = {
    name: "Nico",
    lastname: "Garcia",
    email: "nico@garcia.com",
    password: "1234",
  };

  // OBTENER LISTA USUARIOS
  const getUsersFront = () => {
    return axios({
      url: "/graphql",
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        query: `
                  query {
                    users {
                      name
                      lastname
                      email
                    }
                  }
                `,
      },
    })
      .then((res) => {
        console.log("RESPONSE", res);
        return res.data;
      })
      .then(({ data }) => {
        console.log("DATA", data.users);
        return data;
      })
      .catch((err) => console.log("ERROR", err));
  };

  // OBTENER 1 USUARIO
  const getUserFront = () => {
    return axios({
      url: "/graphql",
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        query: `
                  query {
                    user (id: ${user.id}) {
                      name
                      lastname
                      email
                    }
                  }
                `,
      },
    })
      .then((res) => {
        console.log("RESPONSE", res);
        return res.data;
      })
      .then(({ data }) => {
        console.log("DATA", data.user);
        return data;
      })
      .catch((err) => console.log("ERROR", err));
  };

  // AÑADIR 1 USUARIO
  const addUserFront = () => {
    return axios({
      url: "/graphql",
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        query: `
                    mutation {
                        addUser(name: "${newUser.name}",
                                lastname: "${newUser.lastname}",
                                email: "${newUser.email}",
                                password: "${newUser.password}") {
                            id
                            email
                        }
                    }
                  `,
      },
    })
      .then((res) => {
        console.log("RESPONSE", res);
        return res.data;
      })
      .then(({ data }) => {
        console.log("DATA", data.addUser);
        return data;
      })
      .catch((err) => console.log("ERROR", err));
  };

  // OBTENER LISTA USUARIOS y LISTA FAVORITOS
  const getUsersAndFavoritesFront = () => {
    return axios({
      url: "/graphql",
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        query: `
                  query {
                    users {
                      fullname
                      email
                    }
                    favorites {
                        name
                        media_type
                    }
                  }
                `,
      },
    })
      .then((res) => {
        console.log("RESPONSE", res);
        return res.data;
      })
      .then(({ data }) => {
        console.log("DATA USERS", data.users);
        console.log("DATA FAVORITES", data.favorites);
        return data;
      })
      .catch((err) => console.log("ERROR", err));
  };

  return (
    <div>
      <h1>Front</h1>
      <div>
        <button id="getUsers" onClick={() => getUsersFront()}>
          GET USERS
        </button>
      </div>
      <br />
      <div>
        <button id="getUserX" onClick={() => getUserFront()}>
          {`GET USER ${user.id}`}
        </button>
      </div>
      <br />
      <div>
        <button id="addUser" onClick={() => addUserFront()}>
          ADD USER
        </button>
      </div>
      <br />
      <div>
        <button
          id="getUsersAndFavorites"
          onClick={() => getUsersAndFavoritesFront()}
        >
          GET USERS and FAVORITES
        </button>
      </div>
    </div>
  );
};

export default App;
