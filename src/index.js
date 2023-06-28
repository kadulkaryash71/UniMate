import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { UserContextProvider } from "./context/userContext";
import "./styles.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <UserContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserContextProvider>
);
