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

  const [updateData, setUpdateData] = useState({
    id: "",
    name: null,
    cost: null,
    running_qty: null,
  });

  // comment

  const ModelCost = (confs) => {
    let modelCost = 0;

    // if()
    confs?.map((e) => {
      return (modelCost = modelCost + e.cost * e.running_qty);
    });

    return modelCost;
  };

  const [model, setModel] = useState();

  const filterObj = (obj) => {
    console.log(obj);

    Object.keys(obj).forEach((key) => {
      if (obj[key] === null) {
        delete obj[key];
      }

      return obj;
    });

    axios
      .put("/config", obj)
      .then((res) => setConfs(res))
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
    console.log(findConfigure);
    setModalData(findConfigure);
  };

  const openPrecentEditModal = (id) => {
    setIsUpdateOpen(true);
    // setMyId(id)
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="app-content">
        <h2 style={{ color: "white", textAlign: "center", padding: 25 }}>
          Model: {model?.name}
        </h2>

        <div className="edit-price-section">
          <div className="conf-boxes">
            <div className="head-conf-box">
              <p>Name: {}</p>
              <p>
                Cost: <b>0</b> so'm
              </p>
              <p>Count: 0</p>
            </div>
            <button>Edit conf</button>
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
        <h1 className="add_modal_title">Update {modalData?.name}</h1>
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
              defaultValue={model?.cost}
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
          type="button"
          onClick={(e) => filterObj(e)}
          className="add_modal_submit_btn"
        >
          Update
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
        <h1 className="add_modal_title">Edit </h1>
        <div className="input-groups">
          <div className="input-box">
            <span className="input-label">Edit precent</span>
            <input
              defaultValue={modalData?.name}
              required={true}
              type="text"
              placeholder="Edit precent"
            />
          </div>
        </div>
        <button type="button" className="add_modal_submit_btn">
          Edit Precent
        </button>
      </form>
    </div>
  );
}
