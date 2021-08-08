import axios from "axios";
import { useState, useEffect } from "react";
import CharactersItem from "../components/CharactersItem";
import Loader from "../components/Loader";

import Cookies from "js-cookie";

const Home = ({ value, userToken, pagination, setPagination }) => {
  const [count, setCount] = useState();
  const [data, setData] = useState();
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-back-kfachas.herokuapp.com/characters?skip=${pagination.skip}&limit=${pagination.limit}&name=${value}`
        );

        setData(response.data.results);
        setCount(response.data.count);
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
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [pagination.skip, pagination.limit, value, userToken]);

  return isLoading ? (
    <Loader />
  ) : (
    <main>
      {Cookies.get("username") && (
        <span>
          Helloo{" "}
          <span style={{ color: "red" }}>
            {Cookies.get("username").toUpperCase()}
          </span>
          , here is the list of all MARVEL's characters!
        </span>
      )}
      <h3>List of MARVEL's characters</h3>
      <ul className="characters">
        <CharactersItem
          data={data}
          userData={userData}
          userToken={userToken}
          setUserData={setUserData}
        />
      </ul>
      <div className="paginationBtn">
        {pagination.skip >= 50 && (
          <button
            onClick={() => {
              const obj = { ...pagination };
              obj.skip -= 50;
              setPagination(obj);
            }}
          >
            Previous page
          </button>
        )}
        {pagination.skip < count && (
          <button
            onClick={() => {
              const obj = { ...pagination };
              obj.skip += 50;
              setPagination(obj);
            }}
          >
            Next page
          </button>
        )}
      </div>
    </main>
  );
};

export default Home;
