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
      <div className="container">
        <input
          type="text"
          onChange={handleChange}
          placeholder="Recherche par titre.."
        />
        <button onClick={() => history.push("/characters")}>Characters</button>
        <button onClick={() => history.push("/comics")}>Comics</button>
        <button onClick={() => history.push("/favorites")}>Favorites</button>
      </div>
      <div>
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
