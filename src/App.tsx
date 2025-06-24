import Header from "./components/header";
import Home from "./pages/home";
//import Cart from "./pages/cart";

//import NotFound from "./pages/notFound";
//import FullPizza from "./pages/fullPizza";
import { Route, Routes } from "react-router-dom";

import "./scss/app.scss";
import { lazy, Suspense } from "react";

const Cart = lazy(() => import("./pages/cart"));
const NotFound = lazy(() => import("./pages/notFound"));
const FullPizza = lazy(() => import("./pages/fullPizza"));

const App = () => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/cart"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Cart />
                </Suspense>
              }
            ></Route>
            <Route
              path="/pizza/:id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <FullPizza />
                </Suspense>
              }
            ></Route>
            <Route
              path="*"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <NotFound />
                </Suspense>
              }
            ></Route>
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
