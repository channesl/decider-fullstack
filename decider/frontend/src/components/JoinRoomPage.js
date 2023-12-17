import React, { Component, useState } from "react";
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

function JoinRoomPage() {
  const [roomCode, setRoomCode] = useState("ABCDEF");
  const [joinButtonText, setJoinButtonText] = useState("Join Room");

  const navigate = useNavigate();

  const handleRoomCodeChange = (e) => {
    setRoomCode(e.target.value);
  };

  const handleJoinRoomPressed = () => {
    fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => response.json())
      .then((data) => {
        if (typeof data.code !== "undefined") {
          navigate("/room/" + data.code);
        }
        setJoinButtonText("Wrong Code");
      });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Join A Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <FormHelperText>
            <div align="center">Room Code:</div>
          </FormHelperText>
          <TextField
            required={true}
            defaultValue={roomCode}
            onChange={handleRoomCodeChange}
            inputProps={{
              style: { textAlign: "center" },
            }}
          ></TextField>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          color="secondary"
          variant="contained"
          onClick={handleJoinRoomPressed}
        >
          {joinButtonText}
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="primary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}

export default JoinRoomPage;
