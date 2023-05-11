import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import "./App.css";

function App() {
  const [playerList, setPlayerList] = useState([]);
  const [inputVal, setInputVal] = useState("");

  // Listning in ascending order of Value..

  playerList.sort((a, b) => {
    let value1 = Number(a.Value);
    let value2 = Number(b.Value);

    if (value1 > value2) {
      return 1;
    }
    if (value2 > value1) {
      return -1;
    }
  });

  useEffect(() => {
    fetch("https://api.npoint.io/20c1afef1661881ddc9c")
      .then((response) => response.json())
      .then((data) => {
        setPlayerList(data.playerList);
      });
  }, []);

  const handleSearch = (e) => {
    setInputVal(e.target.value);
  };

  // the player named as Bafétimbi Gomis has has no image in players-images and date is  invailid in api

  return (
    <div className="container">
      <div className="searchBox">
        <input placeholder="Search Player" onChange={handleSearch} />
      </div>

      <div className="card">
        {playerList &&
          playerList
            .filter((player) => {
              if (
                player.TName.toLowerCase().includes(inputVal.toLowerCase()) ||
                player.PFName.toLowerCase().includes(inputVal.toLowerCase())
              ) {
                return player;
              }
            })
            .map((player) => (
              <div key={player.Id} className="card-body">
                <img
                  className="card-img"
                  src={`./images/${player.Id}.jpg`}
                  alt="playerImg"
                />

                <p>{player.PFName}</p>
                <p>{player.SkillDesc}</p>
                <span>${player.Value}</span>
                <p>
                  Next Match: {player.UpComingMatchesList[0].CCode} vs.{" "}
                  {player.UpComingMatchesList[0].VsCCode} on{" "}
                  {moment
                    .utc(player.UpComingMatchesList[0].MDate)
                    .tz(moment.tz.guess())
                    .format("DD-MM-YYYY h:mm:ss a")}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
}

export default App;
