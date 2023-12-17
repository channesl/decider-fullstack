import React, { useState } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import HomePage from "./HomePage";
import JoinRoomPage from "./JoinRoomPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@material-ui/core/";
import green from "@material-ui/core/colors/green";
import pink from "@material-ui/core/colors/pink";

const theme = createTheme({
  palette: {
    secondary: pink,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/join" element={<JoinRoomPage />} />
          <Route path="/create" element={<CreateRoomPage />} />
          <Route path="/room/:roomCode" element={<Room />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
const appDiv = ReactDOM.createRoot(document.getElementById("app"));

//const appDiv = document.getElementById("app");
appDiv.render(<App />);
