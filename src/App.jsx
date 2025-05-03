import Header from "./components/header";
import Home from "./pages/home";
import Cart from "./pages/cart"
import NotFound from "./pages/notFound";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./scss/app.scss";

const App = () => {
  const[searchValue, setSearchValue]=useState('')
  return (
    <>
      <div className="wrapper">
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="content">
  
          <Routes>
            <Route path="/" element={<Home searchValue={searchValue} />}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="*" element={<NotFound/>}></Route>
          </Routes>
          
        </div>
      </div>
    </>
  );
};

export default App;
