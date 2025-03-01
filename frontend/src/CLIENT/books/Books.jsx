import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CustomPagination from "../pagination/CustomPagination";
import SmallBanner from "../bannerHome/SmallBanner";
import PopularBooks from "./PopularBooks";
import { backend_server } from "../../main";
import BrowseCollectionBooks from "./BrowseCollectionBooks";
import { Toaster } from "react-hot-toast";
import FilterBooksForm from "./FilterBooksForm";

const Books = () => {
  const API_URL = `${backend_server}/api/v1/book/`;
  const location = useLocation();

  const [bookData, setBookData] = useState([]);
  const [searchResult, setSearchResult] = useState(true);
  const [filterActive, setFilterActive] = useState(false);

  const fetchData = async (pageNumber) => {
    try {
      const resp = await axios.get(`${API_URL}/?page=${pageNumber}`);
      const data = resp.data.data;
      setBookData(data);
    } catch (error) {
      console.log("Error fetching books collections");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className={`container ${
        location.pathname === "/books" ? "bottom-margin" : ""
      }`}
    >
      {/* Browse Collections */}
      <div className="col mt-5">
        <h1 className="h1" style={{ textAlign: "center" }}>
          Browse Collections
        </h1>

        <div className="mt-1">
          <FilterBooksForm
            setBookData={setBookData}
            setSearchResult={setSearchResult}
            setFilterActive={setFilterActive}
          />
        </div>

        <BrowseCollectionBooks
          bookData={bookData}
          searchResult={searchResult}
        />

        <div className="my-3 d-flex justify-content-center">
          <CustomPagination fetchData={fetchData} filterActive={filterActive} />
        </div>
      </div>

      {/* Popular Books Section */}
      <div className="row">
        <h1 className="h1 mt-3" style={{ textAlign: "center" }}>
          Popular Books
        </h1>
        <PopularBooks />
      </div>

      <SmallBanner />
    </div>
  );
};

export default Books;
