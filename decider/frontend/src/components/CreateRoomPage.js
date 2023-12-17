import React, { Component, useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link, useNavigate } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function CreateRoomPage() {
  const defaultDeciders = 2;
  const defaultCategory = "Movie";

  const [numberOfDeciders, setNumberOfDeciders] = useState(defaultDeciders);
  const [category, setCategory] = useState(defaultCategory);

  const navigate = useNavigate();

  const handleDecidersChange = (e) => {
    setNumberOfDeciders(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleCreateRoomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        number_of_deciders: numberOfDeciders,
        category: category,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => navigate("/room/" + data.code));
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component={"div"} variant="h4">
          Create A Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText component={"div"}>
            <div align="center">What To Decide?</div>
          </FormHelperText>
          <RadioGroup row defaultValue="Movie" onChange={handleCategoryChange}>
            <FormControlLabel
              value="Movie"
              control={<Radio color="primary" />}
              label="Movie"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="Food"
              control={<Radio color="secondary" />}
              label="Food"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            onChange={handleDecidersChange}
            type="number"
            defaultValue={defaultDeciders}
            inputProps={{
              min: 2,
              style: { textAlign: "center" },
            }}
          />
          <FormHelperText component={"div"}>
            <div align="center">Number Of Deciders</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          color="secondary"
          variant="contained"
          onClick={handleCreateRoomButtonPressed}
        >
          Create A Room
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

export default CreateRoomPage;
