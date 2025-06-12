import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { addItem, minusItem, removeItem } from "../redux/slices/cartSlice";
import MinusProductSvg from "../assets/svg/minusProductSvg";
import PlusProductSvg from "../assets/svg/plusProductSvg";
import RemoveProductSvg from "../assets/svg/removeProductSvg";

type CartItemProps = {
  id: string;
  title: string;
  price: number;
  count: number;
  imageUrl: string;
  type: string;
  size: number;
};

const CartItem: FC<CartItemProps> = ({
  id,
  title,
  price,
  count,
  imageUrl,
  type,
  size,
}) => {
  const dispatch = useDispatch();
  const onClickPlus = () => {
    dispatch(
      addItem({
        id,
        title,
        price,
        imageUrl,
        type,
      })
    );
  };

  const onClickMinus = () => {
    dispatch(minusItem(id));
  };

  const onClickRemove = () => {
    if (window.confirm("Вы действительно хотите удалить?")) {
      dispatch(removeItem(id));
    }
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type}, {size} см.
        </p>
      </div>
      <div className="cart__item-count">
        <div
          onClick={onClickMinus}
          className="button button--outline button--circle cart__item-count-minus"
        >
          <MinusProductSvg />
        </div>
        <b>{count}</b>
        <div
          onClick={onClickPlus}
          className="button button--outline button--circle cart__item-count-plus"
        >
          <PlusProductSvg />
        </div>
      </div>
      <div className="cart__item-price">
        <b>{price * count} ₽</b>
      </div>
      <div className="cart__item-remove">
        <div
          onClick={onClickRemove}
          className="button button--outline button--circle"
        >
          <RemoveProductSvg />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
