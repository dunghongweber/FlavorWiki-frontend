import React from "react";
import Table from "./components/Table";
import EditRow from "./components/EditRow";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Table />}></Route>
        <Route path="/:id" element={<EditRow />}></Route>
      </Routes>
    </div>
  );
}

export default App;
