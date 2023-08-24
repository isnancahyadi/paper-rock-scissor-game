import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/utils/_define.scss";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import StartGame from "./components/StartGame";
import SinglePlayer from "./components/SinglePlayer";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<StartGame />} />
      <Route path="/single-player" element={<SinglePlayer />} />
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
