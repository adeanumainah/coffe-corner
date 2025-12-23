import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

   // Validation 1: All fields are required
  if (!username || !email || !password || !confirmPassword) {
    setError("All fields are required");
    return;
  }

  // Validation 2: Email format
  if (!email.includes("@gmail.com") || !email.includes(".")) {
    setError("Invalid email format");
    return;
  }

  // Validation 3: Username minimum 3 characters
  if (username.length < 3) {
    setError("Username must be at least 3 characters long");
    return;
  }

  // Validation 4: Password minimum 6 characters
  if (password.length < 6) {
    setError("Password must be at least 6 characters long");
    return;
  }

  // Validation 5: Passwords must match
  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  // Validation 6: Phone number (if provided) must be valid
  if (phone) {
    const cleanedPhone = phone.replace(/[\s-]/g, "");

    if (!/^\+?\d{10,15}$/.test(cleanedPhone)) {
      setError("Please enter a valid phone number (10–15 digits)");
      return;
    }
  }

    const result = register({
      username,
      email,
      phone,
      password,
      role: "user"
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-amber-50 to-brown-50 relative overflow-hidden">

      {/* Back to Home button */}
      <div className="absolute top-6 right-6 z-10">
        <Link
          to="/"
          className="flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-amber-600 to-amber-800 text-white rounded-xl hover:from-amber-700 hover:to-amber-900 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
        >
          <span>←</span>
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-brown-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

    
      {/* Logo/Brand */}
      <div className="absolute top-6 left-6 flex items-center space-x-2 z-10">
        <div className="w-8 h-8 bg-linear-to-r from-amber-700 to-brown-700 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white text-xl">☕</span>
        </div>
        <span className="text-brown-900 font-bold text-xl">Coffe Corner</span>
      </div>

      <div className="relative z-10 w-full max-w-lg mx-4">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Header with icon */}
          <div className="text-center mb-8 animate-fade-in-down">
            <div className="w-20 h-20 mx-auto mb-4 bg-linear-to-r from-amber-600 to-brown-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl text-white">📝</span>
            </div>
            <h1 className="text-3xl font-bold text-brown-900 mb-2">Create Account</h1>
            <p className="text-brown-700">Join our cafe community</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg animate-shake">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Grid for inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Username */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-brown-900">Username *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-amber-600">👤</span>
                  </div>
                  <input
                    placeholder="Choose username (min 3 chars)"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/50 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-300"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-brown-900">Email *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-amber-600">✉️</span>
                  </div>
                  <input
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/50 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-300"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-brown-900">Phone</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-amber-600">📱</span>
                  </div>
                  <input
                    placeholder="+62 xxx xxx xxx"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/50 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-300"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-brown-900">Password *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-amber-600">🔒</span>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password (min 6 chars)"
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

              {/* Confirm Password */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-brown-900">Confirm Password *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-amber-600">✓</span>
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-white/50 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-300"
                  />
                  {/* Show/Hide Confirm Password Button */}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-amber-600 hover:text-amber-700 transition-colors duration-300"
                  >
                    <span className="text-lg">
                      {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-linear-to-r from-amber-600 to-brown-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Create Account
            </button>

            {/* Login link */}
            <div className="text-center pt-6 border-t border-amber-200">
              <p className="text-brown-700">
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="text-amber-800 font-semibold hover:text-amber-900 transition-colors duration-300"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
  