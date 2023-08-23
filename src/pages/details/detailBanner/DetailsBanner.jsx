import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circle rating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../Assests/no-poster.png";
import { Playbtn } from "../playbtn";
import VideoPopup from "../../../Components/videoPopup/VideoPopUp";

const DetailsBanner = ({ video, crew }) => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const { url } = useSelector((state) => state.home);

  const {} = useFetch();

  const _genres = data?.genres?.map((g) => g.id);
  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story"
  );

  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState("");

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {" "}
          {/* fragments */}
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url.backdrop + data.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data.name || data.title}`}(
                      {dayjs(data.release_date).format("YYYY")})
                    </div>
                    <div className="subtitle">{data.tagline}</div>

                    <Genres data={_genres} />
                    <div className="row">
                      <CircleRating rating={data.vote_average.toFixed(1)} />
                      <div className="playbtn" onClick={() => {setShow(true); setVideoId(video.key)}}>
                        <Playbtn />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>

                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>

                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">status:</span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Realease Date:</span>
                          <span className="text">
                            {dayjs(data.release_date).format("DD-MM-YYYY")}
                          </span>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime:</span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director:</span>
                        <span className="text">
                          {director.map((data, index) => (
                            <span key={index}>
                              {data.name}
                              {director.length - 1 !== index ? ", " : ""}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                    {writer?.length > 0 /*for movies*/ && (
                      <div className="info">
                        <span className="text bold">Writter:</span>
                        <span className="text">
                          {writer.map((data, index) => (
                            <span key={index}>
                              {data.name}
                              {writer.length - 1 !== index ? ", " : ""}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                    {data.created_by?.length > 0 /* for tv shows */ && (
                      <div className="info">
                        <span className="text bold">Creator:</span>
                        <span className="text">
                          {data.created_by?.map((data, index) => (
                            <span key={index}>{data.name} </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId}>
                </VideoPopup>
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
