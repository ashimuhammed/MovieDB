import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Detail from "../pages/Detail/Detail";

import * as Config from "../constants/Config";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Search Page */}
      <Route
        path={`/${Config.HOME_PAGE}/:category/search/:keyword`}
        element={<Catalog />}
      />

      {/* Detail Page */}
      <Route
        path={`/${Config.HOME_PAGE}/:category/:id`}
        element={<Detail />}
      />

      {/* Category Listing */}
      <Route path={`/${Config.HOME_PAGE}/:category`} element={<Catalog />} />

      {/* Home Page */}
      <Route path={`/${Config.HOME_PAGE}`} element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
