import { FC } from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😿</span>
        <br />
        Ничего нет
      </h1>
      <p className={styles.description}>
        К сожалению данная страница отсутвует
      </p>
    </div>
  );
};
export default NotFoundBlock;
