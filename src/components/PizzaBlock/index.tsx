import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  CartItem,
  selectcartItemById,
} from "../../redux/slices/cartSlice";
import AddPizzaSvg from "../../assets/svg/addPizzaSvg";
import { Link } from "react-router-dom";

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: any;
  types: number[];
};

const PizzaBlock: FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectcartItemById(id));
  const [activeSize, setActiveSize] = useState(0);
  const [activeType, setActiveType] = useState(0);
  const typeNames = ["тонкое", "традиционное"];

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
       <Link key={id} to={`/pizza/${id}`}> <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {Array.isArray(types) &&
              types.map((type) => (
                <li
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={activeType === type ? "active" : ""}
                >
                  {typeNames[type]}{" "}
                </li>
              ))}
          </ul>
          <ul>
            {Array.isArray(sizes) &&
              sizes.map((size, i) => (
                <li
                  key={size}
                  onClick={() => setActiveSize(i)}
                  className={activeSize === i ? "active" : ""}
                >
                  {size} см.
                </li>
              ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{price} ₽</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <AddPizzaSvg />
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};
export default PizzaBlock;
