import React from "react";
import Warehouse from "./pages/Warehouse";
import Rack from "./components/Racks/Rack";
import { Routes, BrowserRouter, Route, Link } from "react-router-dom";
import { RouterProvider } from "react-router";
import ForkliftReport from "./pages/ForkliftReport";
import Map from "./pages/Map";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

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
    {
      path: "/warehouse/:id",
      element: <Warehouse />,
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
          </ul>
        </nav>
        <Routes>
          {router.map((route, index) => (
            <Route key={index} element={route.element} path={route.path} />
          ))}
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
