import Categories from "../components/categories";
import Sort, { lists } from "../components/sort";
import PizzaBlock from "../components/PizzaBlock/index";
import Skeleton from "../components/PizzaBlock/skeleton";
import { useEffect, useState, useContext, useRef } from "react";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";

import qs from "qs";
import { useNavigate } from "react-router-dom";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filterSlice
  );
  const { items, status } = useSelector((state) => state.pizzaSlice);

  const { searchValue } = useContext(SearchContext);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangeCurrentPage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const search = searchValue ? `&search=${searchValue}` : "";
    dispatch(
      fetchPizzas({
        search,
        categoryId,
        currentPage,
        sort,
      })
    );
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = lists.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  const pizzas = Array.isArray(items)
    ? items
        .filter((obj) =>
          obj?.title?.toLowerCase().includes((searchValue || "").toLowerCase())
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
      {status === "error" ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>Не удалось получить пиццы. Попробуйде повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}{" "}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        onChangePage={onChangeCurrentPage}
      />
    </div>
  );
};

export default Home;
