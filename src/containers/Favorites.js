import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import FavCharacters from "../components/FavCharacters";
import FavComics from "../components/FavComics";
import Loader from "../components/Loader";
const Favorites = ({ userToken }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userToken) {
          const response = await axios.post(
            "https://marvel-back-kfachas.herokuapp.com/user/listFavorites",
            { token: userToken },
            {
              headers: {
                authorization: `Bearer ${userToken}`,
              },
            }
          );
          setData(response.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [userToken]);
  if (userToken) {
    return isLoading ? (
      <Loader />
    ) : (
      <main className="favorites">
        {Cookies.get("username") && (
          <span>
            Here are your favorites{" "}
            <span style={{ color: "red" }}>
              {Cookies.get("username").toUpperCase()}
            </span>{" "}
            !
          </span>
        )}
        {data.charactersFav.length === 0 ? (
          <h3>
            You have not yet set any favorites in this category! ("Characters
            favorites")
          </h3>
        ) : (
          <h3>Your favorite characters</h3>
        )}
        <ul className="fav">
          <FavCharacters
            charactersFav={data.charactersFav}
            userToken={userToken}
          />
        </ul>
        {data.comicsFav.length === 0 ? (
          <h3>
            You have not yet set any favorites in this category! ("Comics
            favorites")
          </h3>
        ) : (
          <h3>Your favorite comics</h3>
        )}
        <ul className="fav">
          <FavComics comicsFav={data.comicsFav} userToken={userToken} />
        </ul>
      </main>
    );
  } else {
    return (
      <h3 style={{ color: "white" }}>
        You must be logged in to have access to favorites
      </h3>
    );
  }
};

export default Favorites;
