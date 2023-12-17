import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Button,
  Typography,
  Box,
  ButtonGroup,
  IconButton,
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

  useEffect(() => {
    const getRoomDetails = () => {
      fetch("/api/get-room" + "?code=" + roomCode)
        .then((response) => response.json())
        .then((data) => {
          setNumberOfDeciders(data.number_of_deciders);
          setCategory(data.category);
          setIsHost(data.is_host);
        });
    };

    getRoomDetails();
  }, [roomCode]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component={"div"} variant="h4">
          Room Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Box display={"flex"} justifyContent={"center"} margin={2}>
          <IconButton color="secondary" variant="contained" size="medium">
            <Cancel />
          </IconButton>
          <IconButton color="primary" variant="contained" size="medium">
            <Favorite />
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="default" variant="contained" xs={{ m: 2 }}>
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}

export default Room;
