import axios from "axios";
import { useEffect, useState } from "react";

import FavCharacters from "../components/FavCharacters";
import FavComics from "../components/FavComics";

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
      <span>En cours de chargement</span>
    ) : (
      <main className="favorites">
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
      <span style={{ color: "white" }}>
        You must be logged in to have access to favorites
      </span>
    );
  }
};

export default Favorites;
