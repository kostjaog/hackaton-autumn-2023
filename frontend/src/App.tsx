import React from "react";
import Map from "./pages/Map";
import Rack from "./components/Racks/Rack";
import { Routes, BrowserRouter, Route, Link } from "react-router-dom";
import { RouterProvider } from "react-router";
import ForkliftReport from "./pages/ForkliftReport";

function App() {
  const router = [
    {
      path: "/",
      element: <Map />,
    },
    {
      path: "/report/:id",
      element: <ForkliftReport />,
    },
  ];

  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Главная</Link>
            </li>
            <li>
              <Link to={"/reports"}>Отчёты</Link>
            </li>
            <li>
              <Link to={"/statistics"}>Статистика</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          {router.map((route, index) => (
            <Route key={index} element={route.element} path={route.path} />
          ))}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
