import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../assets/Marvel_Logo.svg.png";

const Header = ({
  setValue,
  modal,
  setModal,
  userToken,
  setUserToken,
  setClickLogin,
}) => {
  const history = useHistory();
  const handleChange = (event) => {
    const value = event.target.value;
    setValue(value);
  };
  return (
    <header>
      <img src={logo} alt="MARVEL" />
      <div className="dropdown">
        <button className="boutonmenuprincipal">Menu</button>
        <div className="dropdown-child">
          <button
            onClick={() => {
              history.push("/characters");
            }}
          >
            Characters
          </button>
          <button onClick={() => history.push("/comics")}>Comics</button>
          <button onClick={() => history.push("/favorites")}>Favorites</button>
          {userToken === null ? (
            <button
              style={{
                borderBottomRightRadius: "10px",
                borderBottomLeftRadius: "10px",
              }}
            >
              <span
                onClick={() => {
                  setClickLogin(false);
                  setModal(true);
                }}
              >
                Register now
              </span>
              /
              <span
                onClick={() => {
                  setClickLogin(true);
                  setModal(!modal);
                }}
              >
                Login
              </span>
            </button>
          ) : (
            <button
              onClick={() => {
                Cookies.remove("userToken");
                Cookies.remove("username");
                setUserToken(null);
              }}
            >
              Sign out
            </button>
          )}
        </div>
      </div>
      <div className="container">
        <div>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Recherche par titre.."
          />
        </div>
        <div>
          <button
            onClick={() => {
              history.push("/characters");
            }}
          >
            Characters
          </button>
          <button onClick={() => history.push("/comics")}>Comics</button>
          <button onClick={() => history.push("/favorites")}>Favorites</button>
        </div>
      </div>
      <div className="lastBtn">
        {userToken === null ? (
          <button>
            <span
              onClick={() => {
                setClickLogin(false);
                setModal(true);
              }}
            >
              Register now
            </span>
            /
            <span
              onClick={() => {
                setClickLogin(true);
                setModal(!modal);
              }}
            >
              Login
            </span>
          </button>
        ) : (
          <button
            onClick={() => {
              Cookies.remove("userToken");
              Cookies.remove("username");
              setUserToken(null);
            }}
          >
            Sign out
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
