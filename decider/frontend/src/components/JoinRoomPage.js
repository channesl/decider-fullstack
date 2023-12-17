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
    let upperCaseCode = e.target.value.toUpperCase();
    setRoomCode(upperCaseCode);
  };

  const handleJoinRoomPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          navigate("/room/" + roomCode);
        } else {
          setJoinButtonText("Wrong Code");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component={"div"} variant="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <FormHelperText component={"div"}>
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
