import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { TopNav, Home } from "./layout";

function App() {
  return (
    <>
      <TopNav />
      <div className="App">
        <Home />
      </div>
    </>
  );
}

export default App;
