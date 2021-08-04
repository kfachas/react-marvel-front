import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

import Header from "./containers/Header";
import Home from "./containers/Home";
import Comics from "./containers/Comics";
import ComicsItem from "./containers/ComicsItem";
import Favorites from "./containers/Favorites";
import Modal from "./components/Modal";

function App() {
  const [favory, setFavory] = useState([]);
  const [value, setValue] = useState("");
  const [modal, setModal] = useState(false);
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const setUser = (token) => {
    Cookies.set("userToken", token);
    setUserToken(token);
  };
  return (
    <Router>
      <Header
        setValue={setValue}
        modal={modal}
        setModal={setModal}
        userToken={userToken}
        setUserToken={setUserToken}
      />
      <Modal modal={modal} setModal={setModal} setUser={setUser} />
      <Switch>
        <Route exact path="/comics">
          <Comics favory={favory} setFavory={setFavory} value={value} />
        </Route>
        <Route path="/favorites">
          <Favorites favory={favory} userToken={userToken} />
        </Route>
        <Route exact path="/comics/:id">
          <ComicsItem />
        </Route>
        <Route path="/">
          <Home favory={favory} setFavory={setFavory} value={value} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
