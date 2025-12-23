import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Username dan password wajib diisi");
      return;
    }

    setIsLoading(true);

    const result = login(username, password);

    if (!result.success) {
      setError(result.message);
      setIsLoading(false);
      return;
    }

    // 🔐 REDIRECT SESUAI ROLE
    if (result.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/menu");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-amber-50 to-amber-100 relative overflow-hidden">
      {/* Back to Home button - Gradient Version */}
      <div className="absolute top-6 right-6 z-10">
        <Link
          to="/"
          className="flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-amber-600 to-amber-800 text-white rounded-xl hover:from-amber-700 hover:to-amber-900 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
        >
          <span>←</span>
          <span>Back to Home</span>
        </Link>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brown-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Coffee cup icon */}
      <div className="absolute top-6 left-6 flex items-center space-x-2 z-10">
        <div className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center">
          <span className="text-white text-xl">☕</span>
        </div>
        <span className="text-amber-900 font-bold text-xl">Coffe Corner</span>
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Header with animation */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-linear-to-r from-amber-600 to-amber-800 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl text-white">☕</span>
            </div>
            <h1 className="text-3xl font-bold text-amber-900 mb-2 animate-fade-in-down">Welcome Back</h1>
            <p className="text-amber-700">Sign in to your account</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 rounded-r">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-amber-900">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-amber-600">👤</span>
                </div>
                <input
                  placeholder="Enter your username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/50 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-300"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-amber-900">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-amber-600">🔒</span>
                </div>
                <input
                  type={showPassword ? "text" : "password"} // Toggle type
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white/50 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-300"
                />
                {/* Show/Hide Password Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-amber-600 hover:text-amber-700 transition-colors duration-300"
                >
                  <span className="text-lg">
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </span>
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-linear-to-r from-amber-600 to-amber-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                  Loading...
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Register link */}
            <div className="text-center pt-4 border-t border-amber-200">
              <p className="text-amber-700">
                Don't have an account?{" "}
                <Link 
                  to="/register" 
                  className="text-amber-800 font-semibold hover:text-amber-900 transition-colors duration-300"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
