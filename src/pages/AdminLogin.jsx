import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAppContext } from "../context/AdminAppContext";
import { toast } from "react-toastify";
import axios from "axios";

const AdminLogin = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAToken, backendUrl } = useContext(AdminAppContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let endpoint = "";
      if (state === "Admin") endpoint = `${backendUrl}/admin/login`;
      else if (state === "Doctor") endpoint = `${backendUrl}/doctor/login`;
      else endpoint = `${backendUrl}/user/login`;

      const response = await axios.post(endpoint, { email, password });

      if (response.data.success) {
        const token = response.data.token;
        if (state === "Admin") {
          setAToken(token);
          localStorage.setItem("adminToken", token);
          toast.success("Admin Login Successful");
          navigate("/admin/dashboard");
        } else {
          // handle Doctor/Patient redirect here
          toast.success(`${state} login successful`);
        }
      } else {
        toast.error("Login failed: " + response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error logging in. Check console.");
    }
  };

  return (
    <>
      <form
        className="min-h-[80vh] flex items-center"
        onSubmit={handleLogin}
      >
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
          <p className="text-2xl font-semibold m-auto">
            <span className="text-zinc-600">{state}</span> Login
          </p>

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
          </div>
          <button
            type="submit"
            className="bg-gray-600 text-white w-full py-2 rounded-md text-base cursor-pointer"
          >
            Login
          </button>

          <p>
            {state === "Admin" ? "Doctor Login ?" : "Admin Login ?"}{" "}
            <span
              onClick={() =>
                setState((prev) => (prev === "Admin" ? "Doctor" : "Admin"))
              }
              className="text-blue-600 underline cursor-pointer"
            >
              click here
            </span>
          </p>
        </div>
      </form>
    </>
  );
};

export default AdminLogin;
