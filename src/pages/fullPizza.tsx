import axios from "axios";
import React, { useEffect, useState, FC } from "react";
import { Link, useParams } from "react-router-dom";

const FullPizza: FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://67fd003b3da09811b1744c6c.mockapi.io/pizzas/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("errrroooorr");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Loading...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
       </Link>
    </div>
  );
};

export default FullPizza;
