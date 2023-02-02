import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import eye_close from "../../Assets/svg/eye-close.svg";
import eye_open from "../../Assets/svg/eye-open.svg";
import "./Login.css";

const Login = () => {
  const passInput = useRef();
  const submitBtn = useRef();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      axios
        .post("/login", {
          username,
          password,
        })
        .then((res) => {
          console.log(res);
          if (res.data.token) {
            window.localStorage.setItem("token", res.data.token);
            navigate("/");
          }
        })
        .catch((err) => {
          if (err.message === "Request failed with status code 409") {
            toast.error("Username yoki password xato");
          }
        });
    }
  };

  let isShowPassword = false;

  const showPassword = (e) => {
    isShowPassword = !isShowPassword;
    if (isShowPassword) {
      passInput.current.type = "text";
      e.target.src = eye_open;
    } else {
      passInput.current.type = "password";
      e.target.src = eye_close;
    }
  };

  return (
    <div className="login_wrapper">
      <form onSubmit={(e) => SubmitHandler(e)} className="box-login">
        <h1 className="login_heading">Login</h1>
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required={true}
          className="input-auth"
          type="text"
          placeholder="Username"
        />

        <div className="password_input">
          <input
            ref={passInput}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required={true}
            className="input-auth"
            type="password"
            placeholder="Password"
          />
          <img
            onClick={(e) => showPassword(e)}
            src={eye_close}
            alt=""
            width="26"
            height="26"
          />
        </div>

        <button ref={submitBtn} className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
