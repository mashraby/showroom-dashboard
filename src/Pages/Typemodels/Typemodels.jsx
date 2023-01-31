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
  const [precents, setPrecents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [precent, setPrecent] = useState({
    id: null,
    precent: null,
  });
  const [confs, setConfs] = useState({});
  const [updateLoad, setUpdateLoad] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: "",
    name: null,
    cost: null,
    running_qty: null,
  });
  const [model, setModel] = useState();

  // comment

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

  let sumMoney = model?.configurations.reduce(
    (a, b) => a.cost * a.running_qty + b.cost * b.running_qty
  );
  let factNats = sumMoney * (model?.price1 / 100);
  let factAvg = sumMoney + factNats;
  let showNats = factAvg * (model?.price2 / 100);
  let showAvg = factAvg + showNats;
  let dillNats = showAvg * (model?.price3 / 100);
  let dilAvg = showAvg + dillNats;
  let aksNats = dilAvg * (model?.sale / 100);
  let aksAvg = dilAvg + aksNats;

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

  const OpenEditModal = (id) => {
    setIsOpen(!isOpen);
    setUpdateData({ ...updateData, id: id });
    const findConfigure = model?.configurations.find((e) => e.id === id);
    setModalData(findConfigure);
  };

  useEffect(() => {
    console.log(precent);
  }, [precent]);

  const changePrecent = (btnId) => {
    let changeId = Number(btnId);
    if (changeId === 1) {
      setLoading(true);
      console.log(id);
      console.log(model);
      axios
        .put(`/model`, {
          model_id: id,
          price1: precent.precent,
        })
        .then((res) => console.log(res))
        .finally(() => {
          setIsUpdateOpen(false);
          setLoading(false);
          axios
            .get(`/model/${id}`)
            .then((res) => {
              setModel(res.data);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else if (changeId === 2) {
      setLoading(true);
      console.log(id);
      axios
        .put(`/model`, {
          model_id: id,
          price2: precent.precent,
        })
        .then((res) => console.log(res))
        .finally(() => {
          setIsUpdateOpen(false);
          setLoading(false);
          axios
            .get(`/model/${id}`)
            .then((res) => {
              setModel(res.data);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else if (changeId === 3) {
      setLoading(true);
      console.log(id);
      axios
        .put(`/model`, {
          model_id: id,
          price3: precent.precent,
        })
        .then((res) => console.log(res))
        .finally(() => {
          setIsUpdateOpen(false);
          setLoading(false);
          axios
            .get(`/model/${id}`)
            .then((res) => {
              setModel(res.data);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else if (changeId === 4) {
      setLoading(true);
      console.log(id);
      axios
        .put(`/model`, {
          model_id: id,
          sale: precent.precent,
        })
        .then((res) => console.log(res))
        .finally(() => {
          setIsUpdateOpen(false);
          setLoading(false);
          axios
            .get(`/model/${id}`)
            .then((res) => {
              setModel(res.data);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };


  return (
    <div className="app-container">
      <Navbar />
      <div className="app-content">
        <h2 style={{ color: "white", textAlign: "center", padding: 25 }}>
          Model: {model?.name}
        </h2>

        <div className="edit-price-section">
          <div className="aksiya_wrapper">
            <div>
              <h3>Factory</h3>
              <hr />
              <br />
              <p>
                Cost:
                <b>{accounting.formatNumber(sumMoney, 0, " ")}</b> So'm
              </p>
              <p id="1" className="precent">
                Percent: {model?.price1} %
              </p>
              <p>наценка: {accounting.formatNumber(factNats, 0, " ")} So'm</p>
              <br />
              <p>
                Avarage: <b>{accounting.formatNumber(factAvg, 0, " ")}</b> so'm
              </p>
            </div>
            <button
              onClick={() => {
                setIsUpdateOpen(true);
                setPrecent({ id: 1, precent: model?.price1 });
              }}
            >
              Edit price
            </button>
          </div>
          <div className="aksiya_wrapper">
            <div>
              <h3>Showroom</h3>
              <hr />
              <br />
              <p>
                Cost:
                <b>{accounting.formatNumber(factAvg, 0, " ")}</b> So'm
              </p>
              <p id="2" className="precent">
                Percent: {model?.price2} %
              </p>
              <p>наценка: {accounting.formatNumber(showNats, 0, " ")}</p>
              <br />
              <p>
                Avarage: <b>{accounting.formatNumber(showAvg, 0, " ")}</b> so'm
              </p>
            </div>
            <button
              onClick={() => {
                setIsUpdateOpen(true);
                setPrecent({ id: 2, precent: model?.price2 });
              }}
            >
              Edit price
            </button>
          </div>
          <div className="aksiya_wrapper">
            <div>
              <h3>Diller</h3>
              <hr />
              <br />
              <p>
                Cost:
                <b>{accounting.formatNumber(showAvg, 0, " ")}</b> So'm
              </p>
              <p id="3" className="precent">
                Percent: {model?.price3} %
              </p>
              <p>наценка: {accounting.formatNumber(dillNats, 0, " ")}</p>
              <br />
              <p>
                Avarage: <b>{accounting.formatNumber(dilAvg, 0, " ")}</b> so'm
              </p>
            </div>
            <button
              onClick={() => {
                setIsUpdateOpen(true);
                setPrecent({ id: 3, precent: model?.price3 });
              }}
            >
              Edit price
            </button>
          </div>
          <div className="aksiya_wrapper">
            <div>
              <h3>aksiya</h3>
              <hr />
              <br />
              <p>
                Cost:
                <b>{accounting.formatNumber(dilAvg, 0, " ")}</b> So'm
              </p>
              <p id="4" className="precent">
                Percent: {model?.sale} %
              </p>
              <p>наценка: {accounting.formatNumber(aksNats, 0, " ")}</p>
              <br />
              <p>
                Avarage: <b>{accounting.formatNumber(aksAvg, 0, " ")}</b> so'm
              </p>
            </div>
            <button
              onClick={() => {
                setIsUpdateOpen(true);
                setPrecent({ id: 4, precent: model?.sale });
              }}
            >
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
          onClick={() => {
            filterObj(updateData);
            console.log(modalData);
          }}
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
            <input
              onChange={(e) => {
                setPrecent({ ...precent, precent: e.target.value });
              }}
              defaultValue={precent.precent}
              required={true}
              type="text"
              placeholder="Edit precent"
            />
          </div>
        </div>
        <button
          id={precent.id}
          onClick={(e) => changePrecent(e.target.id)}
          type="button"
          className="add_modal_submit_btn"
        >
          {loading ? "loading..." : "Edit precent"}
        </button>
      </form>
    </div>
  );
}
