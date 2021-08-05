import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = ({ value, userToken }) => {
  const [pagination, setPagination] = useState({ skip: 0, limit: 10 });
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-back-kfachas.herokuapp.com/characters?skip=${pagination.skip}&limit=${pagination.limit}&name=${value}`
        );
        setData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [pagination.skip, pagination.limit, value]);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <main>
      <ul className="characters">
        {data.map((elem) => {
          return (
            <li key={elem._id}>
              <div>
                {elem.name}{" "}
                <button
                  onClick={async () => {
                    try {
                      const response = await axios.put(
                        "https://marvel-back-kfachas.herokuapp.com/user/addFavorites",
                        {
                          id: elem._id,
                          token: userToken,
                          thumbnail: elem.thumbnail,
                          name: elem.name,
                        },
                        {
                          headers: {
                            authorization: `Bearer ${userToken}`,
                          },
                        }
                      );
                      console.log(response);
                    } catch (error) {
                      console.log(error.message);
                    }
                  }}
                >
                  add to favorites
                </button>
              </div>
              <Link to={`/comics/${elem._id}`}>
                <img
                  src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                  alt={elem.name}
                />
              </Link>
              {elem.description}
            </li>
          );
        })}
      </ul>
      {pagination.skip >= 10 && (
        <button
          onClick={() => {
            const obj = { ...pagination };
            obj.skip -= 10;
            setPagination(obj);
          }}
        >
          Page précédente
        </button>
      )}
      <button
        onClick={() => {
          const obj = { ...pagination };
          obj.skip += 10;
          setPagination(obj);
        }}
      >
        Page suivante
      </button>
    </main>
  );
};

export default Home;
