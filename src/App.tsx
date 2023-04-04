import React from "react";
import AppContainer from "./components/AppContainer";
import { GlobalContextProvider } from "./context/context";

function App() {
  return (
    <GlobalContextProvider>
      <AppContainer />
    </GlobalContextProvider>
  );
}

export default App;
