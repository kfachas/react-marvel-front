import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const ComicsItem = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/comics/${id}`);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
  return isLoading ? (
    <span>En cours de chargement..</span>
  ) : (
    <main className="comicsItem">
      <h3>{data.name}</h3>
      <ul>
        {data.comics.map((elem, index) => {
          return (
            <li key={elem._id} style={{ marginBottom: "20px" }}>
              <span>{elem.title}</span>
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

export default ComicsItem;
