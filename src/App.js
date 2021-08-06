import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

import Header from "./containers/Header";
import Home from "./containers/Home";
import Comics from "./containers/Comics";
import ComicsByCharacters from "./containers/ComicsByCharacters";
import Favorites from "./containers/Favorites";
import Modal from "./components/Modal";
import Footer from "./containers/Footer";

function App() {
  const [value, setValue] = useState("");
  const [modal, setModal] = useState(false);
  const [clickLogin, setClickLogin] = useState(false);
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
        setClickLogin={setClickLogin}
        clickLogin={clickLogin}
      />
      <Modal
        modal={modal}
        setModal={setModal}
        setUser={setUser}
        clickLogin={clickLogin}
      />
      <Switch>
        <Route exact path="/comics">
          <Comics value={value} userToken={userToken} />
        </Route>
        <Route path="/favorites">
          <Favorites userToken={userToken} />
        </Route>
        <Route exact path="/comics/:id">
          <ComicsByCharacters />
        </Route>
        <Route path="/">
          <Home value={value} userToken={userToken} />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
