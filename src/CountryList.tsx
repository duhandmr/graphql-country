// src/CountryList.tsx
import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import "./index.css";

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
    }
  }
`;

const predefinedColors = [
  "lightblue",
  "lightcoral",
  "lightgreen",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightsteelblue",
  "lightyellow",
  "lightcyan",
];

const CountryList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [filter, setFilter] = useState<string>("");
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(
    null
  );
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && data) {
      const countries = data.countries;

      // Automatically select the 10th item or the last one if there are fewer than 10 items
      if (countries.length > 0) {
        const indexToSelect = Math.min(9, countries.length - 1);
        setSelectedItem(countries[indexToSelect].code);
      }
    }
  }, [loading, data]);

  const handleSelectItem = (code: string) => {
    const newIndex =
      selectedColorIndex === null
        ? 0
        : (selectedColorIndex + 1) % predefinedColors.length;

    setSelectedColorIndex(newIndex);
    setSelectedItem(code);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredCountries = data.countries.filter((country: any) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="country-list">
      <input
        type="text"
        placeholder="Search..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="search-input"
      />
      <ul className="countries">
        {filteredCountries.map((country: any) => (
          <li
            key={country.code}
            onClick={() => handleSelectItem(country.code)}
            className={`country ${
              selectedItem === country.code ? "selected" : ""
            }`}
            style={{
              backgroundColor:
                selectedItem === country.code
                  ? predefinedColors[selectedColorIndex!]
                  : "white",
            }}
          >
            {country.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
