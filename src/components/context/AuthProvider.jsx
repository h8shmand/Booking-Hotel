import axios from "axios";
import { createContext, useContext, useReducer, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};
function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("unknown action has been taken!");
  }
}

export default function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispath] = useReducer(
    authReducer,
    initialState
  );
  const [users, setUsers] = useState([]);
  async function login(userName, password) {
    try {
      const { data } = await axios.get("http://localhost:5000/users");
      setUsers(data);
    } catch (error) {
      setUsers([]);
      toast.error("something went wrong! please try again.");
    }
    const isUserValid = users.some(
      (user) => userName === user.userName && password === user.password
    );
    if (isUserValid) {
      dispath({ type: "login", payload: { userName, password } });
    } else {
      toast.error("Wrong UserName or Password!");
    }
  }
  function logout() {
    dispath({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const authContext = useContext(AuthContext);
  return authContext;
}
