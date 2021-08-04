import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../assets/Marvel_Logo.svg.png";
const Header = ({ setValue, modal, setModal, userToken, setUserToken }) => {
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
      {userToken === null ? (
        <button onClick={() => setModal(!modal)}>
          S'inscrire/Se connecter
        </button>
      ) : (
        <button
          onClick={() => {
            Cookies.remove("userToken");
            setUserToken(null);
          }}
        >
          Se déconnecter
        </button>
      )}
    </header>
  );
};

export default Header;
