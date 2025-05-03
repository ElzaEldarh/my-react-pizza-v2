import Header from "./components/header";
import Home from "./pages/home";
import Cart from "./pages/cart";
import NotFound from "./pages/notFound";
import { Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";
import "./scss/app.scss";

export const SearchContext = createContext();

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      <div className="wrapper">
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </div>
        </SearchContext.Provider>
      </div>
    </>
  );
};

export default App;
