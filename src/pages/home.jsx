import Categories from "../components/categories";
import Sort from "../components/sort";
import PizzaBlock from "../components/PizzaBlock/index";
import Skeleton from "../components/PizzaBlock/skeleton";
import { useEffect, useState } from "react";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://67fd003b3da09811b1744c6c.mockapi.io/pizzas")
      .then((res) => res.json())
      .then((arr) => setItems(arr))
      .catch((err) => {
        console.warn("Ошибка при получении пицц:", err);
      });
    setIsLoading(false);
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}{" "}
        {/* new Array(6) — что это?  
              Создаёт пустой массив из 6 ячеек: [ , , , , , ]
              Но с ним нельзя напрямую делать .map() — он «пустой».
              Поэтому мы оборачиваем его:[...new Array(6)]  
              Это превращает массив в настоящий итерируемый массив из 6 undefined'ов, 
              например:[undefined, undefined, undefined, undefined, undefined, undefined]
              Теперь можно делать .map().
              .map((_, index) => <Skeleton key={index} />)
             "_" — это просто заглушка для элемента (нам не нужен сам undefined).
             index — порядковый номер, от 0 до 5.
              <Skeleton key={index} /> — рендерим 6 одинаковых компонентов "заглушек", пока идёт загрузка.*/}
      </div>
    </>
  );
};

export default Home;
