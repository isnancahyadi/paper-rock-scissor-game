import React, { useRef, useState } from "react";
import Swal from "sweetalert2";

const SinglePlayGameScenes = (props) => {
  const { round } = props;
  const [playerFighter, setPlayerFighter] = useState("");
  const [compFighter, setCompFighter] = useState("");
  const [fighting, setFighting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [winner, setWinner] = useState("");
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState({
    you: 0,
    com: 0,
  });

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

    if (rule[result] === "You") {
      setScore({ ...score, you: score.you + 1 });
    } else if (rule[result] === "Computer") {
      setScore({ ...score, com: score.com + 1 });
    }
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

  const nextGame = () => {
    setCurrentRound((prev) => prev + 1);
    setFighting(false);
    setLoading(false);
    setPlayerFighter("");
    setCompFighter("");
    setWinner("");
  };

  const finalResult = () => {
    Swal.fire({
      title:
        score.you > score.com
          ? "You are a Winner!"
          : score.you === score.com
          ? "Draw Game"
          : "Computer is a Winner!",
      text: "Play again ?",
      allowOutsideClick: false,
      confirmButtonText: "Play again",
      showCancelButton: true,
      cancelButtonText: "Back to Home",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      } else if (result.isDismissed) {
        window.location.href = "/";
      }
    });
  };

  return (
    <div className="SinglePlayGameScenes">
      <div className="card mb-5 p-0 border-light text-center">
        <div className="card-body">
          <h3 className="text-light mb-2 p-0">Score</h3>
          <h3 className="text-light m-0 p-0">
            You ( {score.you} ) vs ( {score.com} ) Com
          </h3>
        </div>
      </div>
      <h1 className="text-light mb-5 p-0">Round {currentRound}</h1>
      {fighting ? (
        <>
          <div className="fighting row justify-content-between">
            <div className={`col-6 ${loading && "start"}`}>
              <img
                id="player"
                className="fighter"
                src={loading ? "/assets/rock.svg" : selectedPlayerFighter()}
                alt="fighter"
              />
            </div>
            <div className={`col-6 ${loading && "start"}`}>
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
            <>
              <h1 className="text-light mb-3 p-0">
                {winner === "Draw" ? "Game Draw!" : `${winner} Win!`}
              </h1>
              {currentRound === round ? (
                <h3
                  className="text-light m-0 p-0"
                  style={{ cursor: "pointer" }}
                  onClick={finalResult}
                >
                  Finish &gt;&gt;
                </h3>
              ) : (
                <h3
                  className="text-light m-0 p-0"
                  style={{ cursor: "pointer" }}
                  onClick={nextGame}
                >
                  Next Round &gt;&gt;
                </h3>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <div className="row choose-fighter d-flex justify-content-center">
            <div
              id="paper"
              className={`option col-4 ${
                playerFighter === "paper" ? "selected" : ""
              }`}
              onClick={() => setPlayerFighter("paper")}
            >
              <img className="fighter" src="/assets/paper.svg" alt="fighter" />
            </div>
            <div
              id="rock"
              className={`option col-4 ${
                playerFighter === "rock" ? "selected" : ""
              }`}
              onClick={() => setPlayerFighter("rock")}
            >
              <img className="fighter" src="/assets/rock.svg" alt="fighter" />
            </div>
            <div
              id="scissors"
              className={`option col-4 ${
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
  );
};

export default SinglePlayGameScenes;
