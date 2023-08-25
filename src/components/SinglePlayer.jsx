import React, { useEffect, useRef, useState } from "react";

const SinglePlayer = () => {
  const [playerFighter, setPlayerFighter] = useState("");
  const [compFighter, setCompFighter] = useState("");
  const [fighting, setFighting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [winner, setWinner] = useState("");

  const compFighterRef = useRef();
  compFighterRef.current = compFighter;

  const computerFighter = () => {
    const fighter = ["paper", "rock", "scissors"];
    const randomNumber = Math.floor(Math.random() * 3);

    setCompFighter(fighter[randomNumber]);
  };

  const selectedPlayerFighter = () => {
    switch (playerFighter) {
      case "paper":
        return "/assets/paper.svg";
      case "rock":
        return "/assets/rock.svg";
      case "scissors":
        return "/assets/scissors.svg";
      default:
        break;
    }
  };

  const selectedCompFighter = () => {
    switch (compFighter) {
      case "paper":
        return "/assets/paper.svg";
      case "rock":
        return "/assets/rock.svg";
      case "scissors":
        return "/assets/scissors.svg";
      default:
        break;
    }
  };

  const gameResult = () => {
    const rule = {
      paper_paper: "Draw",
      paper_rock: "You",
      paper_scissors: "Computer",
      rock_paper: "Computer",
      rock_rock: "Draw",
      rock_scissors: "You",
      scissors_paper: "You",
      scissors_rock: "Computer",
      scissors_scissors: "Draw",
    };

    let result = `${playerFighter}_${compFighterRef.current}`;

    setWinner(rule[result]);
  };

  const startFighting = () => {
    computerFighter();
    setFighting(true);
    setLoading(true);

    setTimeout(() => {
      gameResult();
      setLoading(false);
    }, 2500);
  };

  return (
    <div className="SinglePlayer d-flex">
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <div className="card border-light text-center w-50 h-70">
          <div className="card-body">
            {fighting ? (
              <>
                <div className="fighting d-flex justify-content-between">
                  <div className={`col-md-6 ${loading && "start"}`}>
                    <h2 className="text-light m-0 p-0">You</h2>
                    <img
                      id="player"
                      className="fighter"
                      src={
                        loading ? "/assets/rock.svg" : selectedPlayerFighter()
                      }
                      alt="fighter"
                    />
                  </div>
                  <div className={`col-md-6 ${loading && "start"}`}>
                    <h2 className="text-light m-0 p-0">Computer</h2>
                    <img
                      id="computer"
                      className="fighter"
                      src={loading ? "/assets/rock.svg" : selectedCompFighter()}
                      alt="fighter"
                    />
                  </div>
                </div>
                {loading ? (
                  <h1 className="text-light m-0 p-0">Fighting...</h1>
                ) : (
                  <h1 className="text-light m-0 p-0">
                    {winner === "Draw" ? "Game Draw!" : `${winner} Win!`}
                  </h1>
                )}
              </>
            ) : (
              <>
                <div className="row choose-fighter d-flex justify-content-center">
                  <div
                    id="paper"
                    className={`option col-md-4 ${
                      playerFighter === "paper" ? "selected" : ""
                    }`}
                    onClick={() => setPlayerFighter("paper")}
                  >
                    <img
                      className="fighter"
                      src="/assets/paper.svg"
                      alt="fighter"
                    />
                  </div>
                  <div
                    id="rock"
                    className={`option col-md-4 ${
                      playerFighter === "rock" ? "selected" : ""
                    }`}
                    onClick={() => setPlayerFighter("rock")}
                  >
                    <img
                      className="fighter"
                      src="/assets/rock.svg"
                      alt="fighter"
                    />
                  </div>
                  <div
                    id="scissors"
                    className={`option col-md-4 ${
                      playerFighter === "scissors" ? "selected" : ""
                    }`}
                    onClick={() => setPlayerFighter("scissors")}
                  >
                    <img
                      className="fighter"
                      src="/assets/scissors.svg"
                      alt="fighter"
                    />
                  </div>
                </div>
                <div className="action mt-3">
                  {playerFighter ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        startFighting();
                      }}
                    >
                      FIGHT!
                    </button>
                  ) : (
                    <h1 className="text-light m-0 p-0">Choose your fighter!</h1>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePlayer;
