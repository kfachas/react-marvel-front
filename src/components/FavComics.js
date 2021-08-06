import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons";

const FavComics = ({ comicsFav, userToken }) => {
  return (
    <>
      {comicsFav.map((elem) => {
        return (
          <li key={elem.id}>
            <div>
              {elem.title}
              <FontAwesomeIcon
                icon={heartSolid}
                color="red"
                className="heartSol"
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
            </div>
            <img
              src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
              alt=""
            />{" "}
          </li>
        );
      })}
    </>
  );
};

export default FavComics;
