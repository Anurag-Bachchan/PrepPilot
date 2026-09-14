import "../auth.form.scss";
import {useState} from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/auth_hook";
import { useToast } from "../../../Shared/toast_context";
import { getErrorMessage } from "../../../Shared/getErrorMessage";
import Loader from "../../../Shared/Loader";

const Login = () => {

    const {loading, handleLogin}=useAuth();
    const navigate=useNavigate();
    const {showToast}=useToast();

    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            await handleLogin({email,password});
            showToast("Logged in successfully.", "success");
            navigate("/");
        }catch(error){
            showToast(getErrorMessage(error, "Failed to login."));
        }
    }

    if(loading){
        return <Loader message="Logging in..." />
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter email address" required 
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter password" required 
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="button primary-button">Login</button>
                </form>
                <p>Don't have an account? <Link to={"/register"}>Sign up</Link></p>
            </div>
        </main>
    )
}

export default Login;