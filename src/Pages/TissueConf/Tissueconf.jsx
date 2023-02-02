import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Actions from "../../Components/Actions/Actions";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import { OpenModal } from "../../Context/OpenModal/OpenModalContext";

const TissueConf = () => {
  const { isOpen, setIsOpen } = useContext(OpenModal);
  const [tissueConfs, setTissueConfs] = useState([]);
  const { tissueId } = useParams();
  const [sendTissueConfLoad, setTissueConfLoad] = useState(false);
  const [tissue, setTissue] = useState();
  const [tissueConfData, setTissueConfData] = useState({
    name: "",
    color: "",
    hex_color: "",
    tissue: tissueId,
  });

  console.log(tissue);

  useEffect(() => {
    axios
      .get(`tissue/${tissueId}`)
      .then((res) => {
        setTissue(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/tissue-conf")
      .then((res) => setTissueConfs(res.data))
      .catch((err) => console.log(err));
  }, []);

  const data = {
    headerInfos: {
      title: "Tissues Configuration",
      btnTitle: "Add Config",
    },
  };

  const sendTissueConf = (e) => {
    e.preventDefault();
    setTissueConfLoad(true);
    axios
      .post("/tissue-conf", {
        name: tissueConfData.name,
        color: tissueConfData.color,
        hex_color: tissueConfData.hex_color,
        tissue: tissueConfData.tissue,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Added new tissue config");
        }
      })
      .catch((err) => {
        if (err) {
          toast.error("Tissue conf qoshilmadi qayta urinib koring");
        }
      })
      .finally(() => {
        setTissueConfLoad(false);
        setIsOpen(false);
        axios.get("/tissue-conf").then((res) => setTissueConfs(res.data));
      });
  };

  console.log(tissueConfs, "confs");
  console.log(tissue, "tissue");

  return (
    <div className="app-container">
      <Navbar />
      <div className="app-content">
        <Header headerInfos={data} />
        <Actions />
        <Link style={{ color: "white", width: "170px" }} to="/tissues">
          <h3>{"< Back To Tissues"}</h3>
        </Link>

        <div>
          <h1 style={{ textAlign: "center", color: "white" }}>Configuration</h1>

          <div className="products-area-wrapper tableView">
            <div className="products-header">
              <div className="product-cell image">Config ID</div>
              <div className="product-cell category">Config Name</div>
              <div className="product-cell status-cell">Config Color</div>
              <div className="product-cell sales">Config Hex Color</div>
            </div>
            {tissueConfs &&
              tissueConfs.map((item, index) => {
                return (
                  <div key={index + 1} className="products-row">
                    <button className="cell-more-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-more-vertical"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>
                    <div className="product-cell image">
                      <span>{index + 1}</span>
                    </div>
                    <div className="product-cell category">
                      <span className="cell-label">Config Name:</span>
                      {item.name}
                    </div>

                    <div className="product-cell sales">
                      <span className="cell-label">Config Color:</span>
                      {item.color}
                    </div>
                    <div className="product-cell stock">
                      <span className="cell-label">Config Hex Color:</span>
                      {item.hex_color}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div
        onClick={() => setIsOpen(!isOpen)}
        style={isOpen ? { display: "block" } : { display: "none" }}
        className="add_modal"
      ></div>
      <form
        onSubmit={(e) => sendTissueConf(e)}
        style={isOpen ? { top: "50%" } : { top: "-100%" }}
        className="add_modal_form"
        action=""
      >
        <h1 className="add_modal_title">Add Config</h1>
        <div className="input-groups">
          <div className="input-box">
            <span className="input-label">Enter a config name</span>
            <input
              required={true}
              type="text"
              onChange={(e) =>
                setTissueConfData({ ...tissueConfData, name: e.target.value })
              }
              placeholder="config name"
            />
          </div>
          <div className="input-box">
            <span className="input-label">Enter a config color</span>
            <input
              required={true}
              type="text"
              onChange={(e) =>
                setTissueConfData({ ...tissueConfData, color: e.target.value })
              }
              placeholder="config color"
            />
          </div>
          <div className="input-box">
            <span className="input-label">Enter a config hex color</span>
            <input
              required={true}
              type="color"
              onChange={(e) => {
                setTissueConfData({
                  ...tissueConfData,
                  hex_color: e.target.value,
                });
                console.log(e.target.value);
              }}
              placeholder="config hex color"
            />
          </div>
        </div>
        <button className="add_modal_submit_btn">
          {sendTissueConfLoad ? "loading..." : "Add Model"}
        </button>
      </form>
    </div>
  );
};

export default TissueConf;
