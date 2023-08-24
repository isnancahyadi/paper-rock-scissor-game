import React from "react";
import { Link } from "react-router-dom";

const StartGame = () => {
  return (
    <div className="Start d-flex">
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <div className="card border-light text-center w-50">
          <div className="card-body">
            <img id="logo-app" src="/assets/prs_game_logo.svg" alt="logo" />
            <h1 className="text-light mt-5 mb-5">Let's get started!</h1>
            <div className="row justify-content-center">
              <div className="col-auto">
                <Link to={"/single-player"}>
                  <button className="btn btn-primary fs-5">
                    Single Player
                  </button>
                </Link>
              </div>
              <div className="col-auto">
                <button className="btn btn-primary fs-5">Multi Player</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartGame;
