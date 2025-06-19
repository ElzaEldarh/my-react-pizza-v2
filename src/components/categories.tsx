import { FC, memo } from "react";


type CategoriesProps = {
  categoryId: number;
  onChangeCategory: (i: number) => void;
};

const Categories: FC<CategoriesProps> = memo(({ categoryId, onChangeCategory }) => {
  
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onChangeCategory(i)}
            className={categoryId === i ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});
export default Categories;
