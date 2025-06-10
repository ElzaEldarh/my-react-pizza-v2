import Header from "./components/header";
import Home from "./pages/home";
import Cart from "./pages/cart";
import NotFound from "./pages/notFound";
import FullPizza from "./pages/fullPizza";
import { Route, Routes } from "react-router-dom";

import "./scss/app.scss";

const App = () => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/pizza/:id" element={<FullPizza/>}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
