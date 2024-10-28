import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    login(userName, password);
  }
  useEffect(
    () => {
      if (isAuthenticated) navigate("/");
    },
    [isAuthenticated],
    navigate
  );
  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="formControl">
          <label htmlFor="username">UserName</label>
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div className="formControl">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="buttons">
          <button className="btn btn--primary">Login</button>
        </div>
      </form>
    </div>
  );
}
