import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

import App from "./App";
import { UserContextProvider } from "./context/userContext";
import "./styles.css";

const client = new ApolloClient({
  uri: "http://127.0.0.1:5000/graphql/",
  cache: new InMemoryCache(),
});
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <ApolloProvider client={client}>
    <UserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </ApolloProvider>
);
