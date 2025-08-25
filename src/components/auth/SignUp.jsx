import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css";

const SignUp = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            login({
                email: user.email,
                accessToken: await user.getIdToken(),
            });
            setMessage("✅ Successfully registered!");

            setTimeout(() => {
                navigate('/login')
            }, 2000);

        } catch (error) {
            setMessage("❌ " + error.message);
        }
    };

    return (

        <div className="signup-page">
            <div className="signup-card">
                <h1>Sign up</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <br />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br />
                    <button type="submit">Sign Up</button>
                </form>
                <p>Already have an account?</p>
                <Link to="/login"> Login</Link>
                {message && <p>{message}</p>}
            </div>
        </div >
    );
};

export default SignUp;
