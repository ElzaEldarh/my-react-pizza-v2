import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import "./scss/app.scss";

const rootElem = document.getElementById("root");

if (rootElem) {
  const root = createRoot(rootElem).render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}
