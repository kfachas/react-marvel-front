import axios from "axios";
import { useEffect, useState } from "react";

const Favorites = ({ userToken }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
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
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [userToken]);
  return isLoading ? (
    <span>En cours de chargement</span>
  ) : userToken ? (
    <main className="favorites">
      <h3>Characters favorites</h3>
      <ul className="fav">
        {data.charactersFav.map((elem) => {
          return (
            <li key={elem.id}>
              {elem.name}{" "}
              <img
                src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                alt=""
              />{" "}
            </li>
          );
        })}
      </ul>
      <h3>Comics favorites</h3>
      <ul className="fav">
        {data.comicsFav.map((elem) => {
          return (
            <li key={elem.id}>
              {elem.title}{" "}
              <img
                src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                alt=""
              />{" "}
            </li>
          );
        })}
      </ul>
    </main>
  ) : (
    <span style={{ color: "white" }}>
      Vous devez être connecter pour pouvoir avoir accès aux favoris.
    </span>
  );
};

export default Favorites;
