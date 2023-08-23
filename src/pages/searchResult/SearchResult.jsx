import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchDataFromApi } from "../../utils/api";
import contentWrapper from "../../Components/contentWrapper/ContentWrapper";
import Spinner from "../../Components/spinner/Spinner";
import noResults from "../../Assests/no-poster.png";
import ContentWrapper from "../../Components/contentWrapper/ContentWrapper";
import MovieCard from "../../Components/movieCard/MovieCard";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchIntialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1); // increasing page number by 1.
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({ results: [...data?.results, ...res?.results] });
          
          setLoading(false);
        }
        else{
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    setPageNum(1);
    fetchIntialData();
  }, [query]);

  return <div className="searchResultsPage">
    { loading ? (<Spinner initial={true}/>) : (
      <ContentWrapper>
        {data?.results?.length > 0 ? (<>
              <div className="pageTitle">
                {`Search ${data?.total_results > 1 ? "results" : 'result'} of ${query}`}
              </div>
              {console.log(data)}
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results.map((item, index)=>{
                  if(item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  )
                })}
              </InfiniteScroll>
        </>):(
          <span className= "resultNotFound">Results not found !</span>
        )}
      </ContentWrapper>
    )}
  </div>;
};

export default SearchResult;
