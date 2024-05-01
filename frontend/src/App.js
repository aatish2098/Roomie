import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Budgeting from "./components/Budgeting";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import LoginScreen from "./screens/LoginScreen";
import ListingsScreen from "./screens/ListingsScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import PetsScreen from "./screens/PetsScreen";
import ViewListingScreen from "./screens/ViewListingScreen";
import AdvancedSearchScreen from "./screens/AdvancedSearchScreen";
import SearchInterest from "./screens/SearchInterest";

export default function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<LoginScreen />}></Route>
          <Route exact path="/listings" element={<ListingsScreen />}></Route>
          <Route exact path="/unit/:id" element={<ViewListingScreen />}></Route>
          <Route exact path="/signup" element={<SignUpScreen />}></Route>
          <Route
            exact
            path="/favorites/:id"
            element={<FavoritesScreen />}
          ></Route>
          <Route exact path="/budgeting" element={<Budgeting />} />
          <Route
            exact
            path="/interests/:unitRentID"
            element={<SearchInterest />}
          />
          <Route exact path="/login" element={<LoginScreen />}></Route>
          <Route path="/profile/:id" element={<PetsScreen />} />
          <Route
            exact
            path="/advanced-search"
            element={<AdvancedSearchScreen />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}
