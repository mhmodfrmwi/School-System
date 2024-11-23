import { useState } from "react";
import Img2 from "../../assets/loginImg2.png";
import logo from "../../assets/logologin.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUser } from "./userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { email: userEmail, password: userPassword } = useSelector(
    (state) => state.user,
  );
  console.log(userEmail, userPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) return;
    dispatch(updateUser(email, password));
    setEmail("");
    setPassword("");
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
            <h2 className="text-2xl font-semibold text-[#F25019]">Learnova</h2>
          </div>

          <h1 className="mb-8 text-3xl font-bold text-[#F25019]">Login</h1>

          <div className="mb-4 w-full">
            <label htmlFor="email" className="mb-1 block font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="username@gmail.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div className="mb-6 w-full">
            <label htmlFor="password" className="mb-1 block font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <p className="mb-6 w-full text-right text-sm font-semibold text-[#F25019]">
            Forgot password?
          </p>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#F25019] px-4 py-2 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
          >
            Sign In
          </button>
        </form>

        <div className="hidden h-full w-full lg:flex lg:items-center lg:justify-center">
          <img
            src={Img2}
            alt="Login Illustration"
            className="h-full w-full rounded-r-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Login;
