import ComicsItem from "../components/ComicsItems";

import { useState, useEffect } from "react";

import axios from "axios";
const Comics = ({ value, userToken, paginationC, setPaginationC }) => {
  const [data, setData] = useState();
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState();

  useEffect(() => {
    const formData2 = window.localStorage.getItem("comics");
    setPaginationC(JSON.parse(formData2));
  }, [setPaginationC]);
  useEffect(() => {
    window.localStorage.setItem("comics", JSON.stringify(paginationC));
  });
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
    <div class="wrapper">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="shadow"></div>
      <div class="shadow"></div>
      <div class="shadow"></div>
      <span>Loading</span>
    </div>
  ) : (
    <main>
      <h3>List of MARVEL's comics</h3>
      <ul className="characters">
        <ComicsItem data={data} userToken={userToken} userData={userData} />
      </ul>
      <div className="paginationBtn">
        {paginationC.skip >= 10 && (
          <button
            onClick={() => {
              const obj = { ...paginationC };
              obj.skip -= 10;
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
              obj.skip += 10;
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
