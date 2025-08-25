import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setMessage("✅ Successfully logged in!");

      login(user);
      navigate('/characters');
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <br />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <br />
        <button type="submit">Sign in </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
