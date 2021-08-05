import axios from "axios";
import { useState } from "react";
const Modal = ({ modal, setModal, setUser }) => {
  const [values, setValues] = useState({});
  const [verify, setVerify] = useState(true);
  const [modalLogin, setModalLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (values.passwordConfirm === values.password) {
        setVerify(true);
        const response = await axios.post(
          "https://marvel-back-kfachas.herokuapp.com/user/signup",
          {
            username: values.username,
            email: values.email,
            password: values.password,
          }
        );
        console.log(response);
      } else {
        setVerify(false);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmit2 = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://marvel-back-kfachas.herokuapp.com/user/login",
        {
          email: values.email,
          password: values.password,
        }
      );
      setUser(response.data.token);
      setErrorMessage(false);
      setModal(false);
    } catch (error) {
      setErrorMessage(true);
      console.log(error.response);
    }
  };

  return modalLogin ? (
    <div className={modal === false ? "hiddenModal" : "displayModal"}>
      <button
        onClick={() => {
          setModal(false);
        }}
      >
        Fermer la fenêtre
      </button>
      <form onSubmit={handleSubmit2}>
        <input
          type="text"
          placeholder="email"
          onChange={(event) => {
            const obj = { ...values };
            obj.email = event.target.value;
            setValues(obj);
          }}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(event) => {
            const obj = { ...values };
            obj.password = event.target.value;
            setValues(obj);
          }}
        />
        {errorMessage === true && (
          <span
            style={{
              color: "lightgrey",
              fontSize: "14px",
              marginBottom: "10px",
            }}
          >
            Email/Password is not correct
          </span>
        )}
        <input type="submit" />
      </form>
    </div>
  ) : (
    <div className={modal === false ? "hiddenModal" : "displayModal"}>
      <button
        onClick={() => {
          setModal(false);
        }}
      >
        Fermer la fenêtre
      </button>
      <form onSubmit={handleSubmit}>
        <h3>INSCRIPTION</h3>
        <span>
          Vous avez déjà un compte ? Veuillez cliquer{" "}
          <span
            style={{ color: "red" }}
            onClick={() => {
              setModalLogin(true);
            }}
          >
            ici
          </span>
        </span>
        <input
          type="text"
          placeholder="Username"
          onChange={(event) => {
            const obj = { ...values };
            const value = event.target.value;
            obj.username = value;
            setValues(obj);
          }}
        />
        <input
          type="text"
          placeholder="Email"
          onChange={(event) => {
            const obj = { ...values };
            const value = event.target.value;
            obj.email = value;
            setValues(obj);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          style={{ border: verify === false ? "1px solid red" : "" }}
          onChange={(event) => {
            const obj = { ...values };
            const value = event.target.value;
            obj.password = value;
            setValues(obj);
          }}
        />
        <input
          type="password"
          placeholder="Confirm password"
          style={{ border: verify === false ? "1px solid red" : "" }}
          onChange={(event) => {
            const obj = { ...values };
            const value = event.target.value;
            obj.passwordConfirm = value;
            setValues(obj);
          }}
        />

        <input type="submit" />
      </form>
    </div>
  );
};

export default Modal;
