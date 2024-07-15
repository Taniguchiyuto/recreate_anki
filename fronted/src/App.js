import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientComponent from "./components/ClientComponent";
// import AdminComponent from "./components/AdminComponent";
import DeckDetail from "./components/DeckDetail"; // デッキ詳細ページのインポート

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/client" element={<ClientComponent />} />
        <Route path="/deck/:id" element={<DeckDetail />} />{" "}
        {/* デッキ詳細ページへのルート */}
        {/* <Route path="/admin" component={AdminComponent} /> */}
      </Routes>
    </Router>
  );
}

export default App;
