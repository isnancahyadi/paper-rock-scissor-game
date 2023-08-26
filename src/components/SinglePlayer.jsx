import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SinglePlayGameScenes from "./SinglePlayGameScenes";
import { Link } from "react-router-dom";

const SinglePlayer = () => {
  const [round, setRound] = useState(1);
  const [start, setStart] = useState(false);

  return (
    <div className="SinglePlayer d-flex">
      <Link to={"/"}>
        <h5
          className="text-light mt-3 ms-4 p-0"
          style={{
            position: "absolute",
            // cursor: "pointer",
          }}
        >
          {"<<"} Back Home
        </h5>
      </Link>

      <div className="container-fluid d-flex justify-content-center align-items-center">
        <div className="card border-light text-center w-50 h-70">
          <div className="card-body">
            {start ? (
              <SinglePlayGameScenes round={round} />
            ) : (
              <>
                <h1 className="text-light m-0 p-0">Select Round</h1>
                <div className="mt-5 mb-5 gap-5 d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-box d-flex justify-content-center align-items-center border border-light border-3"
                    onClick={() => setRound((prev) => prev - 1)}
                    disabled={round === 1}
                  >
                    <FontAwesomeIcon className="ic" icon="backward" size="xl" />
                  </button>
                  <h2 className="text-light ms-5 me-5">{round}</h2>
                  <button
                    className="btn btn-box d-flex justify-content-center align-items-center border border-light border-3"
                    onClick={() => setRound((prev) => prev + 1)}
                    disabled={round === 7}
                  >
                    <FontAwesomeIcon className="ic" icon="forward" size="xl" />
                  </button>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => setStart(true)}
                >
                  Start Game
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePlayer;
