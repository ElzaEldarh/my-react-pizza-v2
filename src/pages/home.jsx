import Categories from "../components/categories";
import Sort from "../components/sort";
import PizzaBlock from "../components/PizzaBlock/index";
import Skeleton from "../components/PizzaBlock/skeleton";
import { useEffect, useState, useContext } from "react";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";


const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage} = useSelector((state) => state.filterSlice);

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangeCurrentPage=number =>{
    dispatch(setCurrentPage(number))
  }

  useEffect(() => {
    setIsLoading(true);
    const search = searchValue ? `&search=${searchValue}` : "";

    // fetch(
    //   `https://67fd003b3da09811b1744c6c.mockapi.io/pizzas?page=${currentPage}&limit=4${
    //     categoryId > 0 ? `&category=${categoryId}` : ""
    //   }&sortBy=${sort.sortProperty}&order=desc${search}`
    // )
    //   .then((res) => res.json())
    //   .then((arr) => {
    //     setItems(arr);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     console.warn("Ошибка при получении пицц:", err);
    //     setIsLoading(false);
    //   });

    axios
      .get(
        `https://67fd003b3da09811b1744c6c.mockapi.io/pizzas?page=${currentPage}&limit=4${
          categoryId > 0 ? `&category=${categoryId}` : ""
        }&sortBy=${sort.sortProperty}&order=desc${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = Array.isArray(items)
    ? items
        .filter((obj) =>
          obj.title.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map((obj) => <PizzaBlock key={obj.id} {...obj} />)
    : "По вашему запросу ничего не нашлось ):";
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas} </div>
      <Pagination currentPage={currentPage}  onChangePage={onChangeCurrentPage} />
    </div>
  );
};

export default Home;
