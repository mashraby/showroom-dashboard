import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import accounting from "accounting";
import { OpenModal } from "../../Context/OpenModal/OpenModalContext";
import "./Typemodel.css";
import Actions from "../../Components/Actions/Actions";
import { toast } from "react-toastify";

export default function Typemodels() {
  const { id, tissueId } = useParams();

  const { isOpen, setIsOpen, isUpdateOpen, setIsUpdateOpen } =
    useContext(OpenModal);

  const [modalData, setModalData] = useState({});
  const [loading, setLoading] = useState(false);
  const [precent, setPrecent] = useState({
    id: null,
    precent: null,
    cost: null,
    nats: null,
    avg: null,
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
        setModel(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`/confs/${tissueId}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  let arr1 = model?.configurations.map((e) => {
    return Number(e.cost) * e.running_qty;
  });

  let sumMoney = arr1?.reduce((a, b) => a + b);

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

  const changePrecent = (btnId) => {
    let changeId = Number(btnId);
    if (changeId === 1) {
      setLoading(true);
      axios
        .put(`/model`, {
          model_id: id,
          price1: precent.precent,
        })
        .then((res) => {
          if(res.status===200) {
            toast.success("Foiz muvaffaqiyatli o'zgartirildi")
          }
        })
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
        .catch((err) => {
          if(err) {
            toast.error("Foiz o'zgarmadi qayta urinib ko'ring")
          }
        });
    } else if (changeId === 2) {
      setLoading(true);
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

  let bg = document.querySelector(".big-wrapper");

  bg?.addEventListener("scroll", (e) => {
    if (
      document.querySelector(".products-header").getBoundingClientRect().y < 230
    ) {
      document.querySelector(".products-header").style.position = "sticky";
      document.querySelector(".products-header").style.top = "0px";
    } else {
      document.querySelector(".products-header").style.position = "";
      document.querySelector(".products-header").style.top = "";
    }
  });

  return (
    <div className="app-container">
      <Navbar />
      <div className="app-content">
        <Actions />
        <Link style={{ color: "white", width: "170px" }} to="/models">
          <h3>{"< Back to models"}</h3>
        </Link>

        <div className="big-wrapper">
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
                  Avarage: <b>{accounting.formatNumber(factAvg, 0, " ")}</b>{" "}
                  so'm
                </p>
              </div>
              <button
                onClick={() => {
                  setIsUpdateOpen(true);
                  setPrecent({
                    ...precent,
                    id: 1,
                    precent: model?.price1,
                    cost: sumMoney,
                    nats: factNats,
                    avg: factAvg,
                  });
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
                  Avarage: <b>{accounting.formatNumber(showAvg, 0, " ")}</b>{" "}
                  so'm
                </p>
              </div>
              <button
                onClick={() => {
                  setIsUpdateOpen(true);
                  setPrecent({
                    ...precent,
                    id: 2,
                    precent: model?.price2,
                    cost: factAvg,
                    nats: showNats,
                    avg: showAvg,
                  });
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
                  setPrecent({
                    ...precent,
                    id: 3,
                    precent: model?.price3,
                    cost: showAvg,
                    nats: dillNats,
                    avg: dilAvg,
                  });
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
                  setPrecent({
                    ...precent,
                    id: 4,
                    precent: model?.sale,
                    cost: dilAvg,
                    nats: aksNats,
                    avg: aksAvg,
                  });
                }}
              >
                Edit price
              </button>
            </div>
          </div>

          <h1
            className="heading__conf"
            style={{ color: "white", textAlign: "center", padding: 25 }}
          >
            Configuration
          </h1>

          <div className="products-area-wrapper tableView">
            <div className="products-header">
              <div className="product-cell image">
                Configuration ID
                <button className="sort-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                    />
                  </svg>
                </button>
              </div>
              <div className="product-cell category">
                Configuration Name
                <button className="sort-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                    />
                  </svg>
                </button>
              </div>
              <div className="product-cell category">
                Configuration Cost
                <button className="sort-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                    />
                  </svg>
                </button>
              </div>
              <div className="product-cell category">
                Configuration Count
                <button className="sort-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                    />
                  </svg>
                </button>
              </div>
              <div className="product-cell category">
                Edit Configuration
                <button className="sort-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {model?.configurations &&
              model.configurations.map((item, index) => {
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
                      <img
                        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        alt="product"
                      />
                      <span>{index + 1}</span>
                    </div>
                    <div className="product-cell category">
                      <span className="cell-label">Config Name:</span>
                      {item.name}
                    </div>
                    <div className="product-cell category">
                      <span className="cell-label">Config Cost:</span>
                      {item.cost}
                    </div>
                    <div className="product-cell category">
                      <span className="cell-label">Config Count:</span>
                      {item.running_qty}
                    </div>
                    <div className="product-cell category">
                      <span className="cell-label">Edit Config:</span>
                      <button
                        id={item.id}
                        onClick={(e) => OpenEditModal(e.target.id)}
                      >
                        Edit
                      </button>
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
            <span>Cost:</span>
            <b>{accounting.formatNumber(precent.cost, 0, " ")}</b>
          </div>
          <div className="input-box">
            <span className="input-label">Edit precent</span>
            <input
              onChange={(e) => {
                let newNats = precent.cost * (e.target.value / 100);
                let newAvg = newNats + precent.cost;
                setPrecent({
                  ...precent,
                  precent: e.target.value,
                  nats: newNats,
                  avg: newAvg,
                });
              }}
              defaultValue={precent.precent}
              required={true}
              type="text"
              placeholder="Edit precent"
            />
          </div>
          <div className="input-box">
            наценка: <b>{accounting.formatNumber(precent.nats, 0, " ")}</b> so'm
          </div>
          <div className="input-box">
            Avarage: <b>{accounting.formatNumber(precent.avg, 0, " ")}</b> so'm
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
