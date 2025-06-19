import Categories from "../components/categories";
import Sort, { lists } from "../components/sort";
import PizzaBlock from "../components/PizzaBlock/index";
import Skeleton from "../components/PizzaBlock/skeleton";
import { FC, useCallback, useEffect, useRef } from "react";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";

import qs from "qs";
import { Link, useNavigate } from "react-router-dom";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
  FilterSliceState,
} from "../redux/slices/filterSlice";
import {
  fetchPizzas,
  SearchPizzaParams,
  selectPizzaData,
} from "../redux/slices/pizzaSlice";
import { useAppDispatch } from "../redux/store";

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);


  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);


  const onChangeCurrentPage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
  dispatch(
    fetchPizzas({
      searchValue,
      categoryId,
      currentPage,
      sort,
    })
  );
  window.scrollTo(0, 0);
};


  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(
  //       window.location.search.substring(1)
  //     ) as unknown as SearchPizzaParams;

  //     const sort =
  //       lists.find((obj) => obj.sortProperty === String(params.sort)) ||
  //       lists[0];

  //     dispatch(
  //       setFilters({
  //         sort,
  //         currentPage: Number(params.currentPage),
  //         categoryId: Number(params.categoryId),
  //         searchValue: params.search || "",
  //       })
  //     );

  //     isSearch.current = true;
  //   }
  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sort.sortProperty, currentPage]);

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
        <Sort value={sort}/>
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
