import React, { useState } from "react";

const SinglePlayer = () => {
  const [fighter, setFigter] = useState("");
  const [fighting, setFighting] = useState(true);

  return (
    <div className="SinglePlayer d-flex">
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <div className="card border-light text-center w-50 h-70">
          <div className="card-body">
            {fighting ? (
              <>
                <div className="fighting d-flex justify-content-between">
                  <div className={`col-md-5`}>
                    <h2 className="text-light m-0 p-0">You</h2>
                    <img
                      id="player"
                      className="fighter"
                      src="/assets/rock.svg"
                      alt="fighter"
                    />
                  </div>
                  <div className={`col-md-5`}>
                    <h2 className="text-light m-0 p-0">Computer</h2>
                    <img
                      id="computer"
                      className="fighter"
                      src="/assets/rock.svg"
                      alt="fighter"
                    />
                  </div>
                </div>
                <h1 className="text-light m-0 p-0">Fighting...</h1>
              </>
            ) : (
              <>
                <div className="row choose-fighter d-flex justify-content-center">
                  <div
                    id="paper"
                    className={`option col-md-3 ${
                      fighter === "paper" ? "selected" : ""
                    }`}
                    onClick={() => setFigter("paper")}
                  >
                    <img
                      className="fighter"
                      src="/assets/paper.svg"
                      alt="fighter"
                    />
                  </div>
                  <div
                    id="rock"
                    className={`option col-md-3 ${
                      fighter === "rock" ? "selected" : ""
                    }`}
                    onClick={() => setFigter("rock")}
                  >
                    <img
                      className="fighter"
                      src="/assets/rock.svg"
                      alt="fighter"
                    />
                  </div>
                  <div
                    id="scissors"
                    className={`option col-md-3 ${
                      fighter === "scissors" ? "selected" : ""
                    }`}
                    onClick={() => setFigter("scissors")}
                  >
                    <img
                      className="fighter"
                      src="/assets/scissors.svg"
                      alt="fighter"
                    />
                  </div>
                </div>
                <div className="action mt-3">
                  {fighter ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => setFighting(true)}
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
