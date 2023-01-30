import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import accounting from "accounting";
import { OpenModal } from "../../Context/OpenModal/OpenModalContext";
import "./Typemodel.css";

export default function Typemodels() {
  const { id, tissueId } = useParams();

  const { isOpen, setIsOpen, isUpdateOpen, setIsUpdateOpen } =
    useContext(OpenModal);

  const [modalData, setModalData] = useState({});
  const [confs, setConfs] = useState({});
  const [updateLoad, setUpdateLoad] = useState(false);

  const [updateData, setUpdateData] = useState({
    id: "",
    name: null,
    cost: null,
    running_qty: null,
  });

  // comment

  const ModelCost = (confs) => {
    let modelCost = 0;

    confs?.map((e) => {
      return (modelCost = modelCost + e.cost * e.running_qty);
    });

    return modelCost;
  };

  const [model, setModel] = useState();

  const filterObj = (obj) => {
    setUpdateLoad(true);

    Object.keys(obj).forEach((key) => {
      if (obj[key] === null) {
        delete obj[key];
      }

      return obj;
    });

    axios
      .put("/config", obj)
      .then((res) => {
        setUpdateLoad(true);
        setConfs(res);
      })
      .finally(() => {
        setUpdateLoad(false);
        setIsOpen(false);
        axios.get(`/model/${id}`).then((res) => setModel(res.data));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios
      .get(`/model/${id}`)
      .then((res) => {
        console.log(res.data);

        setModel(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`/confs/${tissueId}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  const OpenEditModal = (id) => {
    setIsOpen(!isOpen);
    setUpdateData({ ...updateData, id: id });
    const findConfigure = model?.configurations.find((e) => e.id === id);
    setModalData(findConfigure);
  };

  const openPrecentEditModal = (id) => {
    setIsUpdateOpen(true);
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="app-content">
        <h2 style={{ color: "white", textAlign: "center", padding: 25 }}>
          Model: {model?.name}
        </h2>

        <div className="edit-price-section">
          <div>
            <div>
              <h3>Factory</h3>
              <hr />
              <br />
              <p>
                Cost:
                <b>
                  {accounting.formatNumber(
                    ModelCost(
                      model?.configurations ? model.configurations : []
                    ),
                    0,
                    " "
                  )}
                </b>{" "}
                So'm
              </p>
              <p>Percent: {model?.price1} %</p>
              <p>наценка: {accounting.formatNumber(54200, 0, " ")}</p>
              <br />
              <p>
                Avarage: <b>{accounting.formatNumber(452147000, 0, " ")}</b>{" "}
                so'm
              </p>
            </div>
            <button onClick={(e) => openPrecentEditModal(e.target.id)}>
              Edit price
            </button>
          </div>
          <div>
            <div>
              <h3>Showroom</h3>
              <hr />
              <br />
              <p>
                Cost:
                <b>
                  {accounting.formatNumber(
                    ModelCost(
                      model?.configurations ? model.configurations : []
                    ),
                    0,
                    " "
                  )}
                </b>{" "}
                So'm
              </p>
              <p>Percent: {model?.price1} %</p>
              <p>наценка: {accounting.formatNumber(54200, 0, " ")}</p>
              <br />
              <p>
                Avarage: <b>{accounting.formatNumber(452147000, 0, " ")}</b>{" "}
                so'm
              </p>
            </div>
            <button onClick={(e) => openPrecentEditModal(e.target.id)}>
              Edit price
            </button>
          </div>
          <div>
            <div>
              <h3>Diller</h3>
              <hr />
              <br />
              <p>
                Cost:
                <b>
                  {accounting.formatNumber(
                    ModelCost(
                      model?.configurations ? model.configurations : []
                    ),
                    0,
                    " "
                  )}
                </b>{" "}
                So'm
              </p>
              <p>Percent: {model?.price1} %</p>
              <p>наценка: {accounting.formatNumber(54200, 0, " ")}</p>
              <br />
              <p>
                Avarage: <b>{accounting.formatNumber(452147000, 0, " ")}</b>{" "}
                so'm
              </p>
            </div>
            <button onClick={(e) => openPrecentEditModal(e.target.id)}>
              Edit price
            </button>
          </div>
          <div>
            <div>
              <h3>aksiya</h3>
              <hr />
              <br />
              <p>
                Cost:
                <b>
                  {accounting.formatNumber(
                    ModelCost(
                      model?.configurations ? model.configurations : []
                    ),
                    0,
                    " "
                  )}
                </b>{" "}
                So'm
              </p>
              <p>Percent: {model?.price1} %</p>
              <p>наценка: {accounting.formatNumber(54200, 0, " ")}</p>
              <br />
              <p>
                Avarage: <b>{accounting.formatNumber(452147000, 0, " ")}</b>{" "}
                so'm
              </p>
            </div>
            <button onClick={(e) => openPrecentEditModal(e.target.id)}>
              Edit price
            </button>
          </div>
        </div>

        <h1 style={{ color: "white", textAlign: "center", padding: 25 }}>
          Configuration
        </h1>

        <div className="edit-price-section">
          {model?.configurations?.map((e, i) => {
            return (
              <div key={i + 1} className="conf-boxes">
                <div className="head-conf-box">
                  <p>Name: {e.name}</p>
                  <p>
                    Cost: <b>{accounting.formatNumber(e.cost, 0, " ")}</b> so'm
                  </p>
                  <p>Count: {e.running_qty}</p>
                </div>
                <button id={e.id} onClick={(e) => OpenEditModal(e.target.id)}>
                  Edit conf
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div
        onClick={() => setIsOpen(!isOpen)}
        style={isOpen ? { display: "block" } : { display: "none" }}
        className="add_modal"
      ></div>
      <form
        style={isOpen ? { top: "50%" } : { top: "-100%" }}
        className="add_modal_form"
        action=""
      >
        <h1 className="add_modal_title">Edit {modalData?.name}</h1>
        <div className="input-groups">
          <div className="input-box">
            <span className="input-label">Edit Name</span>
            <input
              onChange={(e) =>
                setUpdateData({ ...updateData, name: e.target.value })
              }
              defaultValue={modalData?.name}
              required={true}
              type="text"
              placeholder="Edit name"
            />
          </div>
          <div className="input-box">
            <span className="input-label">Edit Cost</span>
            <input
              onChange={(e) =>
                setUpdateData({ ...updateData, cost: e.target.value })
              }
              defaultValue={modalData?.cost}
              required={true}
              type="text"
              placeholder="Edit cost"
            />
          </div>
          <div className="input-box">
            <span className="input-label">Edit Count</span>
            <input
              onChange={(e) =>
                setUpdateData({ ...updateData, running_qty: e.target.value })
              }
              defaultValue={modalData?.running_qty}
              required={true}
              type="text"
              placeholder="Edit count"
            />
          </div>
        </div>
        <button
          onClick={() => filterObj(updateData)}
          type="button"
          className="add_modal_submit_btn"
        >
          {updateLoad ? "loading..." : "Edit Config"}
        </button>
      </form>

      <div
        onClick={() => setIsUpdateOpen(!isUpdateOpen)}
        style={isUpdateOpen ? { display: "block" } : { display: "none" }}
        className="add_modal"
      ></div>
      <form
        style={isUpdateOpen ? { top: "50%" } : { top: "-100%" }}
        className="add_modal_form"
      >
        <h1 className="add_modal_title">Edit</h1>
        <div className="input-groups">
          <div className="input-box">
            <span className="input-label">Edit precent</span>
            <input required={true} type="text" placeholder="Edit precent" />
          </div>
        </div>
        <button type="button" className="add_modal_submit_btn">
          add
        </button>
      </form>
    </div>
  );
}
