import 'swiper/css';
import 'boxicons/css/boxicons.min.css';
import "./App.scss";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Detail from "./pages/Detail/Detail";
import * as Config from './constants/Config';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path={`/${Config.HOME_PAGE}`} element={<Home />} />
          <Route path={`/${Config.HOME_PAGE}/:category`} element={<Catalog />} />
          <Route path={`/${Config.HOME_PAGE}/:category/:id`} element={<Detail />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;