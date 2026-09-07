import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          email,
          password
        }
      )

      localStorage.setItem(
        "token",
        res.data.token
      )

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      )

      alert("Login Successful")

      navigate("/dashboard")

    }
    catch (error) {

      console.log(error)

      alert("Invalid Credentials")
    }
  }



  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 px-5">

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-lg p-8 rounded-3xl border border-slate-700 shadow-2xl">

        {/* LOGO */}
        <h1 className="text-4xl font-bold text-center text-purple-400 mb-3">
          VaultNote
        </h1>

        <p className="text-center text-slate-400 mb-8">
          Secure Cloud Notebook
        </p>



        {/* LOGIN FORM */}
        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>

            <label className="block mb-2 text-slate-300">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-purple-500"
              required
            />

          </div>



          <div>

            <label className="block mb-2 text-slate-300">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-purple-500"
              required
            />

          </div>



          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 transition p-3 rounded-xl font-semibold"
          >
            Login
          </button>

        </form>



        {/* REGISTER LINK */}
        <div className="text-center mt-6">

          <p className="text-slate-400">

            New user?{" "}

            <Link
              to="/register"
              className="text-purple-400 hover:underline"
            >
              Create Account
            </Link>

          </p>

        </div>

      </div>

    </div>
  )
}

export default Login
