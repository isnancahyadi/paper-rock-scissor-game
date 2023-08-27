import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const MultiPlayGameScenes = (props) => {
  const { round } = props;
  const [selectFighter, setSelectFighter] = useState("");
  const [fighter, setFighter] = useState({
    player1: "",
    player2: "",
  });
  const [playerTurn, setPlayerTurn] = useState(1);
  const [readyToFight, setReadyToFight] = useState(false);
  const [fighting, setFighting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [winner, setWinner] = useState("");
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState({
    player1: 0,
    player2: 0,
  });

  useEffect(() => {
    Swal.fire({
      title: "Rules",
      text: "If it's player 1 turn, then player 2 looks away. If it's player 2 turn, then player 1 looks away",
      icon: "warning",
    });
  }, []);

  const nextPlayer = () => {
    if (playerTurn === 1) {
      setFighter({ ...fighter, player1: selectFighter });
    } else if (playerTurn === 2) {
      setFighter({ ...fighter, player2: selectFighter });
      setReadyToFight(true);
    }

    setSelectFighter("");
    setPlayerTurn((prev) => prev + 1);
  };

  const selectedPlayer1Fighter = () => {
    switch (fighter.player1) {
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

  const selectedPlayer2Fighter = () => {
    switch (fighter.player2) {
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
      paper_rock: "Player 1",
      paper_scissors: "Player 2",
      rock_paper: "Player 2",
      rock_rock: "Draw",
      rock_scissors: "Player 1",
      scissors_paper: "Player 1",
      scissors_rock: "Player 2",
      scissors_scissors: "Draw",
    };

    let result = `${fighter.player1}_${fighter.player2}`;

    setWinner(rule[result]);

    if (rule[result] === "Player 1") {
      setScore({ ...score, player1: score.player1 + 1 });
    } else if (rule[result] === "Player 2") {
      setScore({ ...score, player2: score.player2 + 1 });
    }
  };

  const startFighting = () => {
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
    setReadyToFight(false);
    setPlayerTurn(1);
    setFighter({ player1: "", player2: "" });
    setWinner("");
  };

  const finalResult = () => {
    Swal.fire({
      title:
        score.player1 > score.player2
          ? "Player 1 a Winner!"
          : score.player1 === score.player2
          ? "Draw Game"
          : "Player 2 is a Winner!",
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
    <div className="MultiPlayGameScenes">
      <div className="card mb-5 p-0 border-light text-center">
        <div className="card-body">
          <h3 className="text-light mb-2 p-0">Score</h3>
          <h3 className="text-light m-0 p-0">
            Player 1 ( {score.player1} ) vs ( {score.player2} ) Player 2
          </h3>
        </div>
      </div>
      <h1 className="text-light p-0">Round {currentRound}</h1>
      {fighting ? (
        <>
          <div className="fighting row d-flex justify-content-between">
            <div className={`col-6 ${loading && "start"}`}>
              <img
                id="player1"
                className="fighter"
                src={loading ? "/assets/rock.svg" : selectedPlayer1Fighter()}
                alt="fighter"
              />
            </div>
            <div className={`col-6 ${loading && "start"}`}>
              <img
                id="player2"
                className="fighter"
                src={loading ? "/assets/rock.svg" : selectedPlayer2Fighter()}
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
      ) : readyToFight ? (
        <>
          <div className="row d-flex justify-content-center">
            <div className="col-4">
              <h1 className="text-light m-0 p-0">Player 1</h1>
              <h1 className="text-light m-0 p-0">
                {fighter.player1 && "Ready"}
              </h1>
            </div>
            <div className="col-4">
              <h3 className="text-light m-0 p-0">vs</h3>
            </div>
            <div className="col-4">
              <h1 className="text-light m-0 p-0">Player 2</h1>
              <h1 className="text-light m-0 p-0">
                {fighter.player2 && "Ready"}
              </h1>
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              startFighting();
            }}
          >
            FIGHT!
          </button>
        </>
      ) : (
        <>
          <div className="row choose-fighter d-flex justify-content-center">
            <h1 className="text-light mb-5 p-0">Player {playerTurn} turn</h1>
            <div
              id="paper"
              className={`option col-4 ${
                selectFighter === "paper" && "selected"
              }`}
              onClick={() => setSelectFighter("paper")}
            >
              <img className="fighter" src="/assets/paper.svg" alt="fighter" />
            </div>
            <div
              id="rock"
              className={`option col-4 ${
                selectFighter === "rock" && "selected"
              }`}
              onClick={() => setSelectFighter("rock")}
            >
              <img className="fighter" src="/assets/rock.svg" alt="fighter" />
            </div>
            <div
              id="scissors"
              className={`option col-4 ${
                selectFighter === "scissors" && "selected"
              }`}
              onClick={() => setSelectFighter("scissors")}
            >
              <img
                className="fighter"
                src="/assets/scissors.svg"
                alt="fighter"
              />
            </div>
          </div>
          <div className="action mt-3">
            {selectFighter ? (
              <button
                className="btn btn-primary"
                onClick={() => {
                  nextPlayer();
                }}
              >
                Next Player
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

export default MultiPlayGameScenes;
