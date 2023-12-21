import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Grid,
  Button,
  Typography,
  Box,
  ButtonGroup,
  IconButton,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import { Cancel, Favorite, Close } from "@material-ui/icons";

//import {
//  Grid,
//  Button,
//  Typography,
//  Box,
//  ButtonGroup,
//  IconButton,
//} from "@mui/material";
//import { Favorite, Close } from "@mui/icons-material";

function Room() {
  const defaultDeciders = 2;
  const defaultCategory = "Movie";
  const defaultIsHost = false;

  const [numberOfDeciders, setNumberOfDeciders] = useState(defaultDeciders);
  const [category, setCategory] = useState(defaultCategory);
  const [isHost, setIsHost] = useState(defaultIsHost);
  const [movieList, setMovieList] = useState();
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [currentMovie, setCurrentMovie] = useState();
  const [currentMovieImg, setCurrentMovieImg] = useState();
  const { roomCode } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const getRoomDetails = () => {
      fetch("/api/get-room" + "?code=" + roomCode)
        .then((response) => {
          if (!response.ok) {
            navigate("/");
          }
          return response.json();
        })
        .then((data) => {
          setNumberOfDeciders(data.number_of_deciders);
          setCategory(data.category);
          setIsHost(data.is_host);
        });
    };

    getRoomDetails();
  }, [roomCode]);

  useEffect(() => {
    const getMoviesDetails = () => {
      fetch("/api/get-movies" + "?list_name=" + "popular_movies_6")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.movie_list);
          setMovieList(JSON.parse(data.movie_list));
          setCurrentMovie(JSON.parse(data.movie_list).movies[0].original_title);
          setCurrentMovieImg(JSON.parse(data.movie_list).movies[0].poster_path);
          return movieList;
        });
    };

    getMoviesDetails();
  }, []);

  const leaveButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((_response) => {
      navigate("/");
    });
  };

  const setNextMovie = () => {
    setCurrentMovieIndex(currentMovieIndex + 1);
    updateCurrentMovie();
    console.log(currentMovieIndex);
  };

  const updateCurrentMovie = () => {
    console.log(currentMovieIndex);
    setCurrentMovie(movieList.movies[currentMovieIndex].original_title);
    setCurrentMovieImg(movieList.movies[currentMovieIndex].poster_path);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component={"div"} variant="h4">
          Room Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <img
          className="contentImg"
          src={"https://image.tmdb.org/t/p/w500/" + currentMovieImg}
          height={300}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Typography component={"div"} variant="h4">
          {currentMovie}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <IconButton
          color="secondary"
          variant="contained"
          size="medium"
          onClick={setNextMovie}
        >
          <Cancel />
        </IconButton>
        <IconButton color="primary" variant="contained" size="medium">
          <Favorite />
        </IconButton>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          color="default"
          variant="contained"
          onClick={leaveButtonPressed}
        >
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}

export default Room;
