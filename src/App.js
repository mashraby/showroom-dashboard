import { Route, Routes } from "react-router-dom";
import "./App.css";
import Companys from "./Pages/Companys/Companys";
import Furnute_types from "./Pages/Furnuture_types/Furnute_types";
import Login from "./Pages/Login/Login";
import Models from "./Pages/Models/Models";
import NotFound from "./Pages/NotFound/NotFound";
import Roles from "./Pages/Roles/Roles";
import Tissues from "./Pages/Tissues/Tissues";
import Users from "./Pages/Users/Users";
import Private from "./Routes/Private";
import Public from "./Routes/Public";
import { Provider as GetFetchProvider } from "./Context/GetFetchContext/GetFetchContext";
import Typemodels from "./Pages/Typemodels/Typemodels";
import Configurations from "./Pages/Configurations/Configurations";
import Legs from "./Pages/Legs/Legs";
import TissueConf from "./Pages/TissueConf/Tissueconf";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <GetFetchProvider>
      <div className="app-container">
        <ToastContainer autoClose={3000} />
        <Routes>
          <Route path="/" element={<Private />}>
            <Route path="/" element={<Roles />} />
            <Route path="/users" element={<Users />} />
            <Route path="/companys" element={<Companys />} />
            <Route path="/furniture_types" element={<Furnute_types />} />
            <Route path="/models" element={<Models />} />
            <Route path="/typemodels/:id" element={<Typemodels />} />
            <Route path="/configurations" element={<Configurations />} />
            <Route path="/tissues" element={<Tissues />} />
            <Route path="/tissue/:tissueId" element={<TissueConf />} />
            <Route path="/legs" element={<Legs />} />
          </Route>
          <Route path="/" element={<Public />}>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </GetFetchProvider>
  );
}

export default App;
