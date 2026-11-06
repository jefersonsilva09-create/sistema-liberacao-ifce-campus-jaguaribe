import { useState } from "react";
import { Route, Routes } from "react-router";

import Menu from "./components/Menu";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import LiberacaoPage from "./pages/liberacao";

export default function App() {
  const [isLogado, setLogado] = useState(false);

  if (!isLogado) {
    return <LoginPage handleLogar={() => setLogado(true)} />;
  }

  return (
    <div className="container">
      <Menu />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/liberacao" element={<LiberacaoPage />} />
      </Routes>
    </div>
  );
}
