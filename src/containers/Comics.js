import ComicsItem from "../components/ComicsItems";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";

import axios from "axios";
import Cookies from "js-cookie";
const Comics = ({ value, userToken, paginationC, setPaginationC }) => {
  const [data, setData] = useState();
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-back-kfachas.herokuapp.com/comics?skip=${paginationC.skip}&limit=${paginationC.limit}&title=${value}`
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
  }, [paginationC.skip, paginationC.limit, value, userToken]);

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
          , here is the list of all MARVEL's comics !
        </span>
      )}
      <h3>List of MARVEL's comics</h3>
      <ul className="characters">
        <ComicsItem
          data={data}
          userToken={userToken}
          userData={userData}
          setUserData={setUserData}
        />
      </ul>
      <div className="paginationBtn">
        {paginationC.skip >= 50 && (
          <button
            onClick={() => {
              const obj = { ...paginationC };
              obj.skip -= 50;
              setPaginationC(obj);
            }}
          >
            Previous page
          </button>
        )}
        {paginationC.skip < count && (
          <button
            onClick={() => {
              const obj = { ...paginationC };
              obj.skip += 50;
              setPaginationC(obj);
            }}
          >
            Next page
          </button>
        )}
      </div>
    </main>
  );
};

export default Comics;
