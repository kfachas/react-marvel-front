import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons";

import Loader from "../components/Loader";
const ComicsByCharacters = () => {
  const { id } = useParams();
  const location = useLocation();
  const { userToken } = location.state;
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-back-kfachas.herokuapp.com/comics/${id}`
        );
        setData(response.data);
        if (userToken) {
          const response2 = await axios.post(
            "https://marvel-back-kfachas.herokuapp.com/user/listFavorites",
            { token: userToken },
            {
              headers: {
                authorization: `Bearer ${userToken}`,
              },
            }
          );
          setUserData(response2.data);
          console.log(response2.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
        console.log(error);
      }
    };
    fetchData();
  }, [id, userToken]);

  const updateData = async () => {
    if (userToken) {
      const response2 = await axios.post(
        "https://marvel-back-kfachas.herokuapp.com/user/listFavorites",
        { token: userToken },
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      setUserData(response2.data);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <main className="comicsItem">
      <h3>
        {data.name}
        <br />
        <span
          style={{ fontSize: "17px", textShadow: "none", color: "lightgray" }}
        >
          {data.description}
        </span>
      </h3>
      <ul>
        {data.comics.length === 0 && (
          <span>This characters didnt get comics</span>
        )}
        {data.comics.map((elem, index) => {
          let flag = 0;
          if (userToken && userData.comicsFav.length > 0) {
            for (let i = 0; i < userData.comicsFav.length; i++) {
              if (elem._id === userData.comicsFav[i]._id) {
                flag = 1;
              }
            }
          }
          return (
            <li
              key={elem._id}
              style={{
                marginBottom: "20px",
                borderBottom: "1px solid red",
                paddingBottom: "20px",
              }}
            >
              <div>
                <span
                  style={{
                    textDecoration: "underline",
                    marginBottom: "10px",
                    fontSize: "20px",
                  }}
                >
                  {elem.title}
                </span>
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
                        updateData();
                        console.log(response);
                      } catch (error) {
                        if (!userToken) {
                          alert(
                            "You need to be connected if u want to add in favorite that item !"
                          );
                        } else {
                          alert("That item is already in ur favorites !");
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
                        updateData();
                        console.log(response);
                      } catch (error) {
                        console.log(error.response);
                      }
                    }}
                  />
                )}
              </div>
              <span>{elem.description}</span>
              <img
                src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                alt={elem.title}
              />
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default ComicsByCharacters;
