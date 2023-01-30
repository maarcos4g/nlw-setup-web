import { Route, Routes } from "react-router-dom";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Home />} />
    </Routes>
  );
}