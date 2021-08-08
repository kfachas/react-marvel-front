import axios from "axios";
import { useState, useEffect } from "react";
import CharactersItem from "../components/CharactersItem";
import Loader from "../components/Loader";

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
      <h3>List of MARVEL's characters</h3>
      <ul className="characters">
        <CharactersItem data={data} userData={userData} userToken={userToken} />
      </ul>
      <div className="paginationBtn">
        {pagination.skip >= 10 && (
          <button
            onClick={() => {
              const obj = { ...pagination };
              obj.skip -= 10;
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
              obj.skip += 10;
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
