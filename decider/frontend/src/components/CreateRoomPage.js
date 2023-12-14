import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class CreateRoomPage extends Component {
  defaultDeciders = 2;
  defaultCategory = "Movie";

  constructor(props) {
    super(props);
    this.state = {
      numberOfDeciders: this.defaultDeciders,
      category: this.defaultCategory,
    };
  }

  handleDecidersChange = (e) => {
    this.setState({
      numberOfDeciders: e.target.value,
    });
  };

  handleCategoryChange = (e) => {
    this.setState({
      category: e.target.value,
    });
  };

  handleCreateRoomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        number_of_deciders: this.state.numberOfDeciders,
        category: this.state.category,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Create A Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">What To Decide?</div>
            </FormHelperText>
            <RadioGroup
              row
              defaultValue="Movie"
              onChange={this.handleCategoryChange}
            >
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
              onChange={this.handleDecidersChange}
              type="number"
              defaultValue={this.defaultDeciders}
              inputProps={{
                min: 2,
                style: { textAlign: "center" },
              }}
            />
            <FormHelperText>
              <div align="center">Number Of Deciders</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="secondary"
            variant="contained"
            onClick={this.handleCreateRoomButtonPressed}
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
}
