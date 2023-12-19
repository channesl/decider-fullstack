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

  const leaveButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((_response) => {
      navigate("/");
    });
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
          src="https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"
          height={300}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Typography component={"div"} variant="h4">
          Furious X
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <IconButton color="secondary" variant="contained" size="medium">
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
