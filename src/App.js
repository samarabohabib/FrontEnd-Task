import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

import "./App.css";

import GameList from "./Game/List";

const uuidv1 = require("uuid/v1");

function App() {
  return <GameList key={uuidv1()} />;
}

export default App;
