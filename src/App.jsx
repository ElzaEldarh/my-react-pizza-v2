import Header from "./components/header";
import Categories from "./components/categories";
import Sort from "./components/sort";
import PizzaBlock from "./components/pizzaBlock";
import { useEffect, useState } from "react";
import "./scss/app.scss";

const App = () => {
  const [items, setItems] = useState([]);

 useEffect(() => {
  fetch("https://67fd003b3da09811b1744c6c.mockapi.io/pizzas")
    .then((res) => res.json())
    .then((arr) => setItems(arr))
    .catch((err) => {
      console.warn("Ошибка при получении пицц:", err);
    });
}, []);
  

  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {items.map((obj) => (
                <PizzaBlock key={obj.id} {...obj} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
