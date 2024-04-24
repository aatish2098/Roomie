import { useState } from "react";
import { Button } from "react-bootstrap";
import "../App.css";

import { SearchBar } from "../components/SearchBar";
import { SearchResultsList } from "../components/SearchResultsList";

function HomeScreen() {
  const [results, setResults] = useState([]);

  return (
    <div>
      <div className="HomeScreen">
        <div className="search-bar-container">
          <SearchBar setResults={setResults} />
          <SearchResultsList results={results} />
          <a href="destination-page.html">
            <Button className="search-button" type="submit">
              Search
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
