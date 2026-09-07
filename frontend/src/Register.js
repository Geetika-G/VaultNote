import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

function Register() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")



  const handleRegister = async (e) => {

    e.preventDefault()

    try {

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        {
          name,
          email,
          password
        }
      )

      alert("Registration Successful")

      navigate("/login")

    }
    catch (error) {

      console.log(error)

      alert("Registration Failed")
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
          Create Your Account
        </p>



        {/* REGISTER FORM */}
        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          <div>

            <label className="block mb-2 text-slate-300">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e)=>
                setName(e.target.value)
              }
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-purple-500"
              required
            />

          </div>



          <div>

            <label className="block mb-2 text-slate-300">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>
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
              placeholder="Create password"
              value={password}
              onChange={(e)=>
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
            Create Account
          </button>

        </form>



        {/* LOGIN LINK */}
        <div className="text-center mt-6">

          <p className="text-slate-400">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-purple-400 hover:underline"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  )
}

export default Register
