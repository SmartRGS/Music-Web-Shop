import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./login/App";
import Login from "./login/Login";
import Register from "./login/Register";
import MusicCatalog from "./shop&cart/Shop";
import MJ from "./songs/song1";
import Cart from "./shop&cart/cart";
import Abba1 from "./songs/song2";
import Abba2 from "./songs/song3";
import Profile from "./Profile/profile";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element = {<Login /> } />
      <Route path="/register" element={<Register />} />
      <Route path="/shop" element={<MusicCatalog />} />
      <Route path="/MJ" element={<MJ />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/Abba1" element={<Abba1 />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/Abba2" element={<Abba2 />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
