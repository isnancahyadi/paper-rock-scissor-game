import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/utils/_define.scss";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faForward, faBackward } from "@fortawesome/free-solid-svg-icons";
import StartGame from "./components/StartGame";
import SinglePlayer from "./components/SinglePlayer";
import MultiPlayer from "./components/MultiPlayer";

library.add(faForward, faBackward);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<StartGame />} />
      <Route path="/single-player" element={<SinglePlayer />} />
      <Route path="/multi-player" element={<MultiPlayer />} />
    </Route>
  )
);

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
