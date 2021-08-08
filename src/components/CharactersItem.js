import axios from "axios";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons";

const CharactersItem = ({ data, userData, userToken }) => {
  return (
    <>
      {data.map((elem) => {
        let flag = 0;
        if (userToken && userData.comicsFav.length > 0) {
          for (let i = 0; i < userData.charactersFav.length; i++) {
            if (elem._id === userData.charactersFav[i]._id) {
              flag = 1;
            }
          }
        }
        return (
          <li key={elem._id}>
            <div
              className="titleChar"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "5px",
                backgroundColor: "white",
                border: "1px solid black",
                height: "30px",
              }}
            >
              <p>{elem.name}</p>
              {flag === 0 ? (
                <FontAwesomeIcon
                  icon={heartRegular}
                  onClick={async () => {
                    try {
                      const response = await axios.put(
                        "https://marvel-back-kfachas.herokuapp.com/user/addFavorites",
                        {
                          fav: elem,
                          token: userToken,
                        },
                        {
                          headers: {
                            authorization: `Bearer ${userToken}`,
                          },
                        }
                      );
                      window.location.reload();
                      console.log(response);
                    } catch (error) {
                      if (!userToken) {
                        alert(
                          "Connectez vous pour pouvoir ajouter des favoris"
                        );
                      } else {
                        alert("Vous l'avez déjà rajouter en favori !");
                      }
                      console.log(error.message);
                    }
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={heartSolid}
                  color="red"
                  onClick={async () => {
                    try {
                      const response = await axios.put(
                        "https://marvel-back-kfachas.herokuapp.com/user/removeFavorites",
                        {
                          id: elem._id,
                          token: userToken,
                        },
                        {
                          headers: {
                            authorization: `Bearer ${userToken}`,
                          },
                        }
                      );
                      window.location.reload();
                      console.log(response);
                    } catch (error) {
                      console.log(error.response);
                    }
                  }}
                />
              )}
            </div>
            <Link to={`/comics/${elem._id}`}>
              <div
                className="imgCha"
                style={{
                  background: `url(${elem.thumbnail.path}.${elem.thumbnail.extension})`,
                  backgroundSize: "cover",
                }}
              >
                <p className="test">{elem.description}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default CharactersItem;
