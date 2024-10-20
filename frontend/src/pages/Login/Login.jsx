import React, { useState, useEffect } from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";


const Login = () => {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            localStorage.removeItem("token");
            navigate("/login");
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
      
        try {
          const response = await axios.post(`${config.BASE_URL}/loginUser`, {
            userName,
            userPassword,
          });
      
          const { token, user } = response.data;
      
          localStorage.setItem("token", token);
          localStorage.setItem("userType", user.userType); 
      
          if (user.userType === "Admin") {
            navigate("/dashboard");
          } else if (user.userType === "User") {
            navigate("/dashboardUser");
          }
        } catch (err) {
          setError(err.response?.data?.error || "An error occurred. Please try again.");
        }
      };
      

    return (
        <div className="login-container">
            <div className="form-container">
                <p className="title">Delma Mount View</p>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="input-box">
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="userName"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="userPassword"
                                value={userPassword}
                                onChange={(e) => setUserPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button className="sign" type="submit">Login</button>
                </form>

                {/* <div className="signup-box">
                    <p className="signup">Don't have an account?
                        <a rel="noopener noreferrer" href="#" className="">Sign up</a>
                    </p>
                </div> */}
            </div>
        </div>
    );
};

export default Login;
