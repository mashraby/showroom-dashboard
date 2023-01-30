import React, { useContext, useEffect, useState } from "react";
import Actions from "../../Components/Actions/Actions";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import seller from "../../Assets/img/seller.jpg";
import admin from "../../Assets/img/admin.jpg";
import { GetFetchContext } from "../../Context/GetFetchContext/GetFetchContext";
import { OpenModal } from "../../Context/OpenModal/OpenModalContext";
import axios from "axios";
import Toast from "../../Components/Toast/Toast";

export default function Users() {
  const { isOpen, setIsOpen, setIsToastOpen } = useContext(OpenModal);
  const [users, setUsers] = useState([]);
  const { roles } = useContext(GetFetchContext);
  const [companys, setCompanys] = useState([]);
  const [loading, setLoading] = useState(false);
  const access_token = localStorage.getItem("token");
  const [toastingData, setToastingData] = useState({
    message: "",
    status: null
  })
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    role: "",
    company: "",
  });

  const data = {
    headerInfos: {
      title: "Users",
      btnTitle: "Add User",
    },
  };

  const sendUserData = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post("/signup", {
        role: userData.role,
        company: userData.company,
        username: userData.username,
        password: userData.password,
      })
      .then((res) => console.log(res))
      .finally(() => {
        setLoading(false)
        setIsOpen(false)
        axios.get("/users")
          .then(res => setUsers(res.data))
      })
      .catch((err) => console.log(err))
  };

  useEffect(() => {
    axios
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get("/company", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => setCompanys(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <div className="app-content">
        <Header headerInfos={data} />
        <Actions />
        <div className="products-area-wrapper tableView">
          <div className="products-header">
            <div className="product-cell image">
              User ID
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
              User Name
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
            <div className="product-cell status-cell">
              Status
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
            <div className="product-cell sales">
              User Role
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
          {users &&
            users.map((item, index) => {
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
                      src={item.role?.role_name === "SELLER" ? seller : admin}
                      alt="product"
                    />
                    <span>{index + 1}</span>
                  </div>
                  <div className="product-cell category">
                    <span className="cell-label">User Name:</span>
                    {item.username}
                  </div>
                  <div className="product-cell status-cell">
                    <span className="cell-label">Status:</span>
                    <span
                      className={`status ${
                        item.is_active ? "active" : "disabled"
                      }`}
                    >
                      {item.is_active ? "Active" : "Disabled"}
                    </span>
                  </div>
                  <div className="product-cell sales">
                    <span className="cell-label">User Role:</span>
                    {item.role?.role_name}
                  </div>
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
        onSubmit={(e) => sendUserData(e)}
        style={isOpen ? { top: "50%" } : { top: "-100%" }}
        className="add_modal_form"
        action=""
      >
        <h1 className="add_modal_title">Add User</h1>
        <div className="input-groups">
          <div className="input-box">
            <span className="input-label">Enter a username</span>
            <input
              required={true}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="input-box">
            <span className="input-label">Enter a password</span>
            <input
              required={true}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              type="password"
              placeholder="password"
            />
          </div>
          <div className="input-box">
            <span className="input-label">Choose a role</span>
            <select
              defaultValue="Choose a role"
              onChange={(e) =>
                setUserData({ ...userData, role: e.target.value })
              }
              name=""
              id=""
            >
              <option value="Choose a role" disabled>
                Choose a role
              </option>
              {roles &&
                roles.map((el) => {
                  return (
                    <option key={el.id} value={el.id}>
                      {el.role_name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="input-box">
            <span className="input-label">Choose a company</span>
            <select
              defaultValue="Choose a company"
              onChange={(e) =>
                setUserData({ ...userData, company: e.target.value })
              }
            >
              <option value="Choose a company" disabled hidden>
                Choose a company
              </option>
              {companys &&
                companys.map((el) => {
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
          {loading ? "loading..." : "Add User"}
        </button>
      </form>
      {/* <Toast data={toastingData} /> */}
    </div>
  );
}
