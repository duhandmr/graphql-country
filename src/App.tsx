import React from "react";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client";
import CountryList from "./CountryList";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>GraphQL Country List</h1>
        <CountryList />
      </div>
    </ApolloProvider>
  );
}

export default App;
