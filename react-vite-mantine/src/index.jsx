import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { store } from "./store";
import App from "./Containers/App.jsx";

createRoot(document.getElementById("root")).render(
  <MantineProvider>
    <Provider store={ store }>
      <App />
    </Provider>
  </MantineProvider>
);
