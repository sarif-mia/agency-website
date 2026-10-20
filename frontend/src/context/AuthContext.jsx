import { useEffect, useState } from "react";
import api from "../services/api";
import { AuthContext } from "./auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [restoring, setRestoring] = useState(
    Boolean(localStorage.getItem("authToken")),
  );
  const [sessionError, setSessionError] = useState("");

  useEffect(() => {
    let active = true;
    const clear = () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      if (active) setUser(null);
    };
    const restore = async () => {
      if (!localStorage.getItem("authToken")) {
        clear();
        setRestoring(false);
        return;
      }
      setRestoring(true);
      try {
        const result = await api.auth.me();
        if (active) {
          setUser(result.user);
          setSessionError("");
        }
      } catch (error) {
        if (error.status === 401) clear();
        else if (active)
          setSessionError(
            "We could not verify your session. Please sign in again.",
          );
      } finally {
        if (active) setRestoring(false);
      }
    };
    const storage = (event) => {
      if (event.key === "authToken") restore();
    };
    restore();
    window.addEventListener("auth:expired", clear);
    window.addEventListener("storage", storage);
    return () => {
      active = false;
      window.removeEventListener("auth:expired", clear);
      window.removeEventListener("storage", storage);
    };
  }, []);

  const authenticate = async (mode, credentials) => {
    setLoading(true);
    try {
      const result = await api.auth[mode](credentials);
      if (!result.success || !result.token)
        throw new Error(result.message || "Authentication failed");
      localStorage.setItem("authToken", result.token);
      localStorage.removeItem("authUser");
      setUser(result.user);
      setSessionError("");
      return result;
    } catch (error) {
      return {
        success: false,
        error:
          error.name === "TimeoutError"
            ? "The server took too long to respond. Please try again."
            : error.message,
      };
    } finally {
      setLoading(false);
    }
  };
  const login = (email, password) =>
    authenticate("login", { email: email.trim(), password });
  const register = (name, email, password, company = "") => {
    const [first_name, ...lastName] = name.trim().split(/\s+/);
    return authenticate("register", {
      email: email.trim(),
      password,
      confirm_password: password,
      first_name,
      last_name: lastName.join(" "),
      company,
    });
  };
  const logout = async () => {
    setLoading(true);
    try {
      await api.auth.logout();
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      setUser(null);
    } catch (error) {
      if (error.status !== 401) throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        restoring,
        sessionError,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
