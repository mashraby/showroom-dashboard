import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import eye_close from "../../Assets/svg/eye-close.svg";
import eye_open from "../../Assets/svg/eye-open.svg";
import "./Login.css";

const Login = () => {
  const passInput = useRef();
  const userNameInput = useRef();
  const submitBtn = useRef();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [wrong, setWrong] = useState(false);

  const SubmitHandler = () => {
    if (username === "") {
      userNameInput.current.classList.add("error-input")
      userNameInput.current.placeholder = "username kiritilishi shart!"
    } else {
      userNameInput.current.classList.remove("error-input")
    }
    if (password === "") {
      passInput.current.classList.add("error-input")
      passInput.current.placeholder = "password kiritilishi shart!"
    } else {
      passInput.current.classList.remove("error-input")
    }

    if(username!==""&&password!=="") {
      setWrong(true)
    }

    fetch("http://localhost:9000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          window.localStorage.setItem("token", data.token);
          navigate("/roles");
        } else {
          console.log("Password or username wrong");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.message === "Network request failed") {
          console.log("Network ");
        } else {
          console.log(err);
        }
      });
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
      <div className="box-login">
        <h1 className="login_heading">Login</h1>
        <input
          ref={userNameInput}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
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

        {wrong ? (
          <p className="alert-wrong">Wrong Password Or Username !!!..</p>
        ) : null}

        <button ref={submitBtn} onClick={SubmitHandler} className="submit-btn">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;