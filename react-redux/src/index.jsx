import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./Containers/App.jsx";

const container = document.querySelector("root");
createRoot(container).render(
  <Provider store={ store }>
    <App />
  </Provider>
);
