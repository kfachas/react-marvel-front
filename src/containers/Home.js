import axios from "axios";
import { useState, useEffect } from "react";
import CharactersItem from "../components/CharactersItem";

const Home = ({ value, userToken }) => {
  const [pagination, setPagination] = useState({ skip: 0, limit: 10 });
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
    <span>En cours de chargement...</span>
  ) : (
    <main>
      <h3>List of MARVEL's characters</h3>
      <ul className="characters">
        <CharactersItem data={data} userData={userData} userToken={userToken} />
      </ul>
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
      <button
        onClick={() => {
          const obj = { ...pagination };
          obj.skip += 10;
          setPagination(obj);
        }}
      >
        Next page
      </button>
    </main>
  );
};

export default Home;
