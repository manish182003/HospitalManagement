import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { AdminAppContext } from "../context/AdminAppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { token, setUserData } = useContext(AppContext);
  const { setAToken } = useContext(AdminAppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!role) {
        toast.error("Please select a role");
        setLoading(false);
        return;
      }

      let endpoint =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/";

      if (role === "admin") {
        endpoint += "api/admin/login";
      } else if (role === "doctor") {
        endpoint += "api/doctor/login";
      } else if (role === "patient") {
        endpoint += "api/user/login";
      }

      const res = await axios.post(endpoint, { email, password });

      if (res.data.success) {
        toast.success("Login successful!");

        if (role === "admin") {
          localStorage.setItem("aToken", res.data.token);
          setAToken(res.data.token);
          navigate("/admin-dashboard");
        } else if (role === "doctor") {
          localStorage.setItem("dToken", res.data.token);
          navigate("/doctor-dashboard");
        } else {
          localStorage.setItem("token", res.data.token);
          setUserData(res.data.user);
          navigate("/my-appointment");
        }
      } else {
        toast.error(res.data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">Login</p>
        <p>Please login to book appointments</p>

        <div className="w-full">
          <p>Select Role</p>
          <select
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            onChange={(e) => setRole(e.target.value)}
            value={role}
            required
          >
            <option value="">Select Role</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <p
            onClick={() => navigate("/forgot-password")}
            className="text-blue-600 underline text-sm cursor-pointer mt-1"
          >
            Forgot Password?
          </p>
        </div>

        <button
          type="submit"
          className={`bg-gray-600 text-white w-full py-2 rounded-md text-base cursor-pointer flex justify-center items-center ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Create a new account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 underline cursor-pointer"
          >
            Click here
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
