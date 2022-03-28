import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/system/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { moviesObject } from "../helpers/interfaces";

function HomePageContent() {
  const params = useParams();
  const navigate = useNavigate();

  const [bestMoviesData, setBestMoviesData] = useState<Array<moviesObject>>([]);
  const [noData, setNoData] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const redirect = (id: string) => {
    navigate(`/movie/${id}`);
  };

  const bestMovies = () => {
    axios
      .get(`${process.env.BASE_URL}`)
      .then((res) => {
        const newArr = res.data.map((obj: any): object => {
          return {
            ...obj,
            release_date: moment()
              .month(obj.release_date?.slice(5, 7) - 1)
              .format("MMMM YYYY"),
          };
        });
        setBestMoviesData(newArr);
        setNoData(false);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        throw e;
      });
  };

  const movieSearch = () => {
    axios
      .get(`${process.env.BASE_URL}videos-search/${params.searchWord}`)
      .then((res) => {
        const newArr = res.data.map((obj: any): object => {
          return {
            ...obj,
            release_date: moment()
              .month(obj.release_date?.slice(5, 7) - 1)
              .format("MMMM YYYY"),
          };
        });
        if (newArr.length === 0) {
          setNoData(true);
        } else {
          setNoData(false);
          setBestMoviesData(newArr);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        throw e;
      });
  };

  useEffect(() => {
    if (Object.keys(params).length !== 0) {
      setLoading(true);
      movieSearch();
    } else {
      setLoading(true);
      bestMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return loading ? (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  ) : (
    <ImageList sx={{ width: "100%", height: "100%", cursor: "pointer" }}>
      {noData ? (
        <span> no data</span>
      ) : (
        bestMoviesData?.map((item: moviesObject) => (
          <ImageListItem
            key={item.poster_path}
            onClick={() => {
              redirect(item.id);
            }}
          >
            <img
              src={
                item.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                  : "https://cdn.pixabay.com/photo/2016/03/31/18/36/cinema-1294496_960_720.png"
              }
              srcSet={
                item.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                  : "https://cdn.pixabay.com/photo/2016/03/31/18/36/cinema-1294496_960_720.png"
              }
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={
                <>
                  <span>date of release: {item.release_date}</span> <br />{" "}
                  <span>Rating: {item.vote_average}</span>
                </>
              }
              position="below"
            />
          </ImageListItem>
        ))
      )}
    </ImageList>
  );
}

export default HomePageContent;
