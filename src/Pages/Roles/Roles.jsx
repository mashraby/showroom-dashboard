import React, { useEffect, useState } from "react";
import Actions from "../../Components/Actions/Actions";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import seller from "../../Assets/img/seller.jpg";
import admin from "../../Assets/img/admin.jpg";
import { useContext } from "react";
import { OpenModal } from "../../Context/OpenModal/OpenModalContext";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../../Components/Spinner/Spinner";

export default function Roles() {
  const { isOpen, setIsOpen } = useContext(OpenModal);
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [loading, setLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(true);

  const data = {
    headerInfos: {
      title: "Roles",
      btnTitle: "Add Roles",
    },
  };

  const sendRole = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/role", {
        role_name: roleName,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Added new role");
        }
      })
      .finally(() => {
        setLoading(false);
        setIsOpen(false);
        axios.get("/roles").then((res) => setRoles(res.data));
        e.target.role_name.value = null;
      })
      .catch((err) => {
        if (err) {
          toast.error("role qo'shilmadi qayta urinib ko'ring");
        }
      });
  };

  useEffect(() => {
    axios
      .get("/roles")
      .then((res) => setRoles(res.data))
      .finally(() => {
        setGetLoading(false);
      })
      .catch((err) => console.error(err));
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
              <div className="product-cell image">Role ID</div>
              <div className="product-cell category">Role Name</div>
            </div>
            {roles &&
              roles.map((item, index) => {
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
                        src={item.role_name === "SELLER" ? seller : admin}
                        alt="product"
                      />
                      <span>{index + 1}</span>
                    </div>
                    <div className="product-cell category">
                      <span className="cell-label">Role Name:</span>
                      {item.role_name}
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
        onSubmit={(e) => sendRole(e)}
        style={isOpen ? { top: "50%" } : { top: "-100%" }}
        className="add_modal_form"
        action=""
      >
        <h1 className="add_modal_title">Add Role</h1>
        <div className="input-groups">
          <div className="input-box">
            <span className="input-label">Enter a role name</span>
            <input
              required={true}
              type="text"
              name="role_name"
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="role name"
            />
          </div>
        </div>
        <button className="add_modal_submit_btn">
          {loading ? "loading..." : "Add Role"}
        </button>
      </form>
    </div>
  );
}
