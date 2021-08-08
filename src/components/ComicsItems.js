import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons";

const ComicsItem = ({ data, userToken, userData, setUserData }) => {
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
  return (
    <>
      {data.map((elem) => {
        let flag = 0;
        if (userToken && userData.comicsFav.length > 0) {
          for (let i = 0; i < userData.comicsFav.length; i++) {
            if (elem._id === userData.comicsFav[i]._id) {
              console.log(userData.comicsFav[i].title);
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
              {elem.title}
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
                      console.log(response);
                      updateData();
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

            <div
              className="imgCha"
              style={{
                background: `url(${elem.thumbnail.path}.${elem.thumbnail.extension})`,
                backgroundSize: "cover",
              }}
            >
              <p className="test">{elem.description}</p>
            </div>
          </li>
        );
      })}
    </>
  );
};

export default ComicsItem;
