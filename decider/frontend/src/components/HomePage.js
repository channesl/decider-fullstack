import React, { Component, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link, useNavigate, useParams } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function HomePage() {
  const [roomCode, setRoomCode] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function checkIfAlreadyInRoom() {
      fetch("/api/user-in-room")
        .then((response) => response.json())
        .then((data) => {
          setRoomCode(data.code);
          if (data.code !== null) {
            navigate("/room/" + data.code);
          }
        });
    }

    checkIfAlreadyInRoom();
  }, []);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          to="/create"
          component={Link}
        >
          Host Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="primary" variant="contained" to="/join" component={Link}>
          Join Room
        </Button>
      </Grid>
    </Grid>
  );
}

export default HomePage;
