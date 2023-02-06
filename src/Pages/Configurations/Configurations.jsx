import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Actions from "../../Components/Actions/Actions";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import { OpenModal } from "../../Context/OpenModal/OpenModalContext";
import Spinner from "../../Components/Spinner/Spinner";
import accounting from "accounting";

export default function Configurations() {
  const { isOpen, setIsOpen } = useContext(OpenModal);
  const [sendConfigurationLoad, setSendConfigurationLoad] = useState(false);
  const [getLoading, setGetLoading] = useState(true);
  const [ConfigurationName, setConfigurationName] = useState("");
  const [configurations, setConfigurations] = useState([]);
  const [types, setTypes] = useState([]);
  const [models, setModels] = useState([]);
  const [running_qty, setRunningQty] = useState();
  const [selectType, setSelectType] = useState(
    "684ba7e9-7c95-4173-bfcf-3738116c8242"
  );
  const [selectModel, setSelectModel] = useState("");
  const [cost, setCost] = useState();
  const [title, setTitle] = useState();

  const data = {
    headerInfos: {
      title: "Configurations",
      btnTitle: "Add Configuration",
    },
  };

  const allInputs = document.querySelectorAll("input");

  const sendConfiguration = (e) => {
    e.preventDefault();
    setSendConfigurationLoad(true);

    axios
      .post("/configuration", {
        name: ConfigurationName,
        model: selectModel,
        cost,
        title,
        running_qty,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Added new config");
        }
      })
      .catch((err) => {
        if (err) {
          toast.error("Config qo'shilmadi qayta urinib ko'ring");
        }
      })
      .finally(() => {
        setIsOpen(false);
        setSendConfigurationLoad(false);
        axios
          .get("configurations")
          .then((res) => setConfigurations(res.data))
          .catch((err) => console.log(err));
        allInputs.forEach((input) => {
          return (input.value = null);
        });
      });
  };

  useEffect(() => {
    axios
      .get(`/typemodels/${selectType}`)
      .then((res) => {
        setModels(res.data);
      })
      .catch((err) => console.log(err));
  }, [selectType]);

  useEffect(() => {
    axios
      .get("/types")
      .then((res) => {
        setTypes(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("/configurations")
      .then((res) => {
        setConfigurations(res.data);
      })
      .finally(() => {
        setGetLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <div className="app-content">
        <Header headerInfos={data} />
        <Actions />
        {getLoading ? (
          <Spinner />
        ) : (
          <div className="products-area-wrapper tableView">
            <div className="products-header">
              <div className="product-cell image">Configuration ID</div>
              <div className="product-cell category">Configuration Name</div>
            </div>
            {configurations &&
              configurations.map((item, index) => {
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
                      <span className="cell-label">Model Name:</span>
                      {item.name}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      <div
        onClick={() => setIsOpen(!isOpen)}
        style={isOpen ? { display: "block" } : { display: "none" }}
        className="add_modal"
      ></div>
      <form
        onSubmit={(e) => sendConfiguration(e)}
        style={isOpen ? { top: "50%" } : { top: "-100%" }}
        className="add_modal_form"
        action=""
      >
        <h1 className="add_modal_title">Add Configuration</h1>
        <div className="input-groups">
          <div className="input-box">
            <span className="input-label">Enter a configuration name</span>
            <input
              required={true}
              type="text"
              onChange={(e) => setConfigurationName(e.target.value)}
              placeholder="configuration name"
            />
          </div>
          <div className="input-box">
            <span className="input-label">Enter a configuration Cost</span>
            <input
              required={true}
              type="text"
              onChange={(e) => {
                e.target.value = accounting.formatNumber(
                  e.target.value,
                  0,
                  " "
                );
                setCost(accounting.unformat(e.target.value));
              }}
              placeholder="configuration Cost"
            />
          </div>
          <div className="input-box">
            <span className="input-label">Enter a configuration Title</span>
            <input
              required={true}
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="configuration Title"
            />
          </div>
          <div className="input-box">
            <span className="input-label">Enter a configuration Quantity</span>
            <input
              required={true}
              type="number"
              onChange={(e) => setRunningQty(e.target.value)}
              placeholder="configuration Quantity"
            />
          </div>
          <div className="input-box">
            <span className="input-label">Choose a type</span>
            <select
              defaultValue="Choose ..."
              onChange={(e) => setSelectType(e.target.value)}
            >
              <option value="Choose ..." disabled hidden>
                Choose ...
              </option>
              {types &&
                types.map((el) => {
                  return (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="input-box">
            <span className="input-label">Choose a model</span>
            <select
              defaultValue="Choose ..."
              onChange={(e) => setSelectModel(e.target.value)}
              name=""
              id=""
            >
              <option value="Choose ..." disabled hidden>
                Choose ...
              </option>
              {models &&
                models.map((el) => {
                  return (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <button className="add_modal_submit_btn">
          {sendConfigurationLoad ? "loading..." : "Add Configuration"}
        </button>
      </form>
    </div>
  );
}
