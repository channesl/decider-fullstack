import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div>
      <h3>{roomCode}</h3>
      <p>Deciders: {numberOfDeciders}</p>
      <p>Category: {category}</p>
      <p>Is Host?: {isHost.toString()}</p>
    </div>
  );
}

export default Room;
