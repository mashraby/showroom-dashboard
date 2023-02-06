import React, { useContext, useEffect, useState } from "react";
import Actions from "../../Components/Actions/Actions";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import seller from "../../Assets/img/seller.jpg";
import admin from "../../Assets/img/admin.jpg";
import { GetFetchContext } from "../../Context/GetFetchContext/GetFetchContext";
import { OpenModal } from "../../Context/OpenModal/OpenModalContext";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../../Components/Spinner/Spinner";

export default function Users() {
  const { isOpen, setIsOpen } = useContext(OpenModal);
  const [users, setUsers] = useState([]);
  const { roles } = useContext(GetFetchContext);
  const [companys, setCompanys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(true);
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
      .then((res) => {
        if (res.status === 200 || 201) {
          toast.success("Added new user");
        }
      })
      .finally(() => {
        setLoading(false);
        setIsOpen(false);
        axios.get("/users").then((res) => setUsers(res.data));
        e.target.username.value = null;
        e.target.password.value = null;
        e.target.role.value = null;
        e.target.company.value = null;
      })
      .catch((err) => {
        if (err) {
          toast.error("User qo'shilmadi qayta urinib ko'ring");
        }
      });
  };

  useEffect(() => {
    axios
      .get("/users")
      .then((res) => setUsers(res.data))
      .finally(() => {
        setGetLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get("/company", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        {getLoading ? (
          <Spinner />
        ) : (
          <div className="products-area-wrapper tableView">
            <div className="products-header">
              <div className="product-cell image">User ID</div>
              <div className="product-cell category">User Name</div>
              <div className="product-cell status-cell">Status</div>
              <div className="product-cell sales">User Role</div>
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
        )}
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
              name="username"
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
              name="password"
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
              name="role"
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
              name="company"
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
    </div>
  );
}
