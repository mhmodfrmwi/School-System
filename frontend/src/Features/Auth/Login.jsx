import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./AuthRedux/loginSlice";
import Img2 from "../../assets/loginImg2.png";
import logo from "../../assets/logologin.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.login);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    dispatch(loginUser({ email, password }));
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#FFD1B0]">
      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center rounded-lg bg-gradient-to-r from-[#FEDCC5] to-[#FEDDC6] shadow-lg lg:grid lg:grid-cols-2">
        <form
          className="flex w-full flex-col items-center justify-center p-6 lg:p-10"
          onSubmit={handleSubmit}
        >
          <div className="mb-6 flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-8 w-8" />
            <h2 className="text-2xl font-poppins text-[#F25019]">Learnova</h2>
          </div>

          <h1 className="mb-8 text-3xl font-poppins font-bold text-[#F25019]">
            Login
          </h1>

          <div className="mb-4 w-full">
            <label htmlFor="email" className="mb-1 font-poppins block font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="username@gmail.com"
              className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div className="mb-6 w-full">
            <label htmlFor="password" className="mb-1 font-poppins block font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-lg bg-[#F25019] px-4 py-2 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        <div className="hidden h-full w-full lg:flex lg:items-center lg:justify-center">
          <img src={Img2} alt="Login Illustration" className="h-full w-full rounded-r-lg object-cover" />
        </div>
      </div>
    </section>
  );
}

export default Login;
