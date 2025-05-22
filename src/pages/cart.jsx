import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/cartItem";
import { clearItem, selectCart } from "../redux/slices/cartSlice";
import CartPageLogoSvg from "../assets/svg/cartPageLogoSvg";
import TrashSvg from "../assets/svg/trashSvg";
import BackToHomePageSvg from "../assets/svg/backToHomePageSvg";
import CartEmpty from "../components/cartEmpty";

const Cart = () => {
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector(selectCart);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  const onClickClear = () => {
    if (window.confirm("Очитить корзину?")) {
      dispatch(clearItem());
    }
  };

  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <CartPageLogoSvg />
            Корзина
          </h2>
          <div onClick={onClickClear} className="cart__clear">
            <TrashSvg />
            <span>Очистить корзину</span>
          </div>
        </div>
        <div className="content__items">
          {Array.isArray(items) &&
            items.map((item) => <CartItem key={item.id} {...item} />)}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              {" "}
              Всего пицц: <b>{totalCount} шт.</b>{" "}
            </span>
            <span>
              {" "}
              Сумма заказа: <b>{totalPrice} ₽</b>{" "}
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link
              to="/"
              className="button button--outline button--add go-back-btn"
            >
              <BackToHomePageSvg />
              <span>Вернуться назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
