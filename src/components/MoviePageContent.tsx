import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function MoviePageContetnt() {
  const params = useParams();

  const [movieVid, setMovieVid] = useState<Array<object>>();
  const [movieData, setMovieData] = useState<Array<object>>();

  const videosAPI = () => {
    axios
      .get(`https://nestjs-movie-theater.herokuapp.com/videos/${params.id}`)
      .then((res) => {
        movieAPI();
        setMovieVid(res.data);
      });
  };

  const movieAPI = () => {
    axios
      .get(`https://nestjs-movie-theater.herokuapp.com/${params.id}`)
      .then((res) => {
        setMovieData([res.data]);
      });
  };

  useEffect(() => {
    videosAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardActionArea>
        {movieVid?.map((e: any) => {
          return (
            <iframe
              title="id"
              id="video"
              width="100%"
              style={{ height: "50vh" }}
              src={`https://www.youtube.com/embed/${e.key}`}
              frameBorder="0"
              allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          );
        })}

        {movieData?.map((e: any) => {
          return (
            <CardContent key={e.id}>
              <Typography gutterBottom variant="h5" component="div">
                {e.original_title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Overview: {e.overview}
              </Typography>
              Genres:{" "}
              {e.genres.map((e: any) => {
                return <span style={{ marginRight: "5px" }}>{e.name}</span>;
              })}
              <Typography variant="body2" color="text.secondary">
                Total reviews {e.vote_count}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average rating: {e.vote_average}
              </Typography>
            </CardContent>
          );
        })}
      </CardActionArea>
    </Card>
  );
}

export default MoviePageContetnt;
