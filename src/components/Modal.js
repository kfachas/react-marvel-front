import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
const Modal = ({ modal, setModal, setUser, clickLogin }) => {
  const history = useHistory();
  const [values, setValues] = useState({});
  const [verify, setVerify] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const regexSpecialChar = /[^A-Za-z0-9_|\s]/g;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };
  const handleSubmitSignup = async (event) => {
    try {
      event.preventDefault();
      const searchSpecialChar = values.password.match(regexSpecialChar);
      const testEmail = values.email.match(regexEmail);
      if (!testEmail) {
        return alert("Not a correct email");
      }
      if (!searchSpecialChar) {
        return alert("Need one special character");
      }
      if (
        values.password.charAt(0) !== values.password.charAt(0).toUpperCase()
      ) {
        return alert(
          "The first character of your password must be a capital letter"
        );
      }
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
        alert(
          "Votre inscription à été validée ! Vous pouvez dès maintenant vous connectez"
        );
      } else {
        setVerify(false);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmitLogin = async (event) => {
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
      history.push("/favorites");
    } catch (error) {
      setErrorMessage(true);
      console.log(error.response);
    }
  };

  return clickLogin ? (
    <div className={modal === false ? "hiddenModal" : "displayModal"}>
      <div>
        <FontAwesomeIcon
          className="cross"
          onClick={() => {
            setModal(false);
          }}
          color="white"
          icon={faTimesCircle}
        />
      </div>
      <form onSubmit={handleSubmitLogin}>
        <input
          type="email"
          placeholder="email"
          onChange={(event) => {
            const obj = { ...values };
            obj.email = event.target.value;
            setValues(obj);
          }}
          required
        />
        <input
          type="password"
          name="password"
          minlength="6"
          placeholder="password"
          onKeyDown={handleKeyDown}
          onChange={(event) => {
            const obj = { ...values };
            obj.password = event.target.value;
            setValues(obj);
          }}
          required
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
      <div>
        <FontAwesomeIcon
          className="cross"
          onClick={() => {
            setModal(false);
          }}
          color="white"
          icon={faTimesCircle}
        />
      </div>
      <form onSubmit={handleSubmitSignup}>
        <h3>INSCRIPTION</h3>

        <input
          type="text"
          name="name"
          placeholder="Username"
          minlength="5"
          onChange={(event) => {
            const obj = { ...values };
            const value = event.target.value;
            obj.username = value;
            setValues(obj);
          }}
          required
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(event) => {
            const obj = { ...values };
            const value = event.target.value;
            obj.email = value;
            setValues(obj);
          }}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          minlength="6"
          onKeyDown={handleKeyDown}
          style={{ border: verify === false ? "1px solid red" : "" }}
          onChange={(event) => {
            const obj = { ...values };
            const value = event.target.value;
            obj.password = value;
            setValues(obj);
          }}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Confirm password"
          minlength="6"
          onKeyDown={handleKeyDown}
          style={{ border: verify === false ? "1px solid red" : "" }}
          onChange={(event) => {
            const obj = { ...values };
            if (event.currentTarget.value.includes(" ")) {
              event.currentTarget.value = event.currentTarget.value.replace(
                /\s/g,
                ""
              );
            }
            const value = event.target.value;
            obj.passwordConfirm = value;
            setValues(obj);
          }}
          required
        />

        <input type="submit" />
      </form>
    </div>
  );
};

export default Modal;
