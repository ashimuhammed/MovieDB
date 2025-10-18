import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./movie-grid.scss";

import MovieCard from "./../movie-card/MovieCard";
import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
import Button, { OutlineButton } from "../button/Button";
import Input from "../input/Input";
import * as Config from "./../../constants/Config";

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const { keyword } = useParams();

  useEffect(() => {
    const getList = async () => {
      try {
        let response = null;
        const params = {};

        if (keyword === undefined) {
          switch (props.category) {
            case category.movie:
              response = await tmdbApi.getMoviesList(movieType.upcoming, {
                params,
              });
              break;
            default:
              response = await tmdbApi.getTvList(tvType.popular, { params });
          }
        } else {
          const params = { query: keyword };
          response = await tmdbApi.search(props.category, { params });
        }

        setItems(response.results || []);
        setTotalPage(response.total_pages || 0);
        setPage(1);
      } catch (error) {
        console.error("Error fetching movie list:", error);
      }
    };

    getList();
  }, [keyword, props.category]);

  const loadMore = async () => {
    try {
      let response = null;
      const params = { page: page + 1 };

      if (keyword === undefined) {
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        params.query = keyword;
        response = await tmdbApi.search(props.category, { params });
      }

      setItems((prevItems) => [...prevItems, ...(response.results || [])]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error loading more:", error);
    }
  };

  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={props.category} keyword={keyword} />
      </div>

      <div className="movie-grid">
        {items.length > 0 ? (
          items.map((item, index) => (
            <MovieCard key={index} category={props.category} item={item} />
          ))
        ) : (
          <p className="no-results">No results found.</p>
        )}
      </div>

      {page < totalPage && (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      )}
    </>
  );
};

const MovieSearch = (props) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(props.keyword || "");

  const goToSearch = useCallback(() => {
    const trimmed = keyword.trim();
    if (trimmed.length > 0) {
      navigate(
        `/${Config.HOME_PAGE}/${category[props.category]}/search/${trimmed}`
      );
    }
  }, [keyword, props.category, navigate]);

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter") goToSearch();
    };
    window.addEventListener("keyup", handleEnter);
    return () => window.removeEventListener("keyup", handleEnter);
  }, [goToSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className="small" onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};

export default MovieGrid;
