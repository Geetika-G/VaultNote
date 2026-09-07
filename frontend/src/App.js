import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import Login from "./Login"
import Register from "./Register"
import Dashboard from "./Dashboard"
import ProtectedRoute from "./ProtectedRoute"

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Default Route */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Register */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App