import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./Store/homeSlice";
import { fetchDataFromApi } from "./utils/api"; /*fetchDataFromApi is a non default return function*/

// importing various components of our site.
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Explore from "./pages/explore/Explore";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import PageNotFound from "./pages/404/PageNotFound";
import SearchResult from "./pages/searchResult/SearchResult";

function App() {
  const url = useSelector((state) => state.home.url);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  // function to fetch data from api.
  const fetchApiConfig = () =>
    fetchDataFromApi("/configuration").then((res) => {
      console.log("api call succesfully");

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
    });

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((i) => {
      promises.push(fetchDataFromApi(`/genre/${i}/list`));
    });

    const data = await Promise.all(promises); // it will return both data parallely.

    data.map(({ genres }) => {
      // destructuring genres that is present in data.
      return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  };

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:mediaType/:id" element={<Details />}></Route>
          <Route path="/search/:query" element={<SearchResult />}></Route>
          <Route path="/explore/:mediaType" element={<Explore />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
