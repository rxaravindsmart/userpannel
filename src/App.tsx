import { useSelector } from "react-redux";
import "./assets/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import routes from "./routes/Router";
import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  const isUserLoggedIn = useSelector(
    (state: any) => state.applicationState.isUserLoggedIn
  );
  const routing = useRoutes(routes(isUserLoggedIn));
  return (
    <div>
      {routing}
      <ToastContainer autoClose={5000} closeOnClick />
    </div>
  );
}

export default App;
