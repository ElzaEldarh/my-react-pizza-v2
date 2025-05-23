import { Link } from "react-router-dom";
import Search from "./search";
import { useSelector } from "react-redux";
import CartLogoSvg from "../assets/svg/cartLogoSvg";
import { selectCart } from "../redux/slices/cartSlice";

const Header = () => {
  const { items, totalPrice } = useSelector(selectCart);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img
              width="38"
              src="src/assets/img/pizza-logo.svg"
              alt="Pizza logo"
            />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        <Search />
        <div className="header__cart">
          <Link to="/cart" className="button button--cart">
            <span>{totalPrice}₽</span>
            <div className="button__delimiter"></div>
            <CartLogoSvg />
            <span>{totalCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
