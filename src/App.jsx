import Charachters from './pages/characters/Characters';
import { Routes, Route, Navigate } from 'react-router-dom';
import SingleEpisode from './pages/SingleEpisode';
import SingleLocation from './pages/SingleLocation';
import NavBar from './components/NavBar';
import SingleCharacter from './pages/characters/SingleCharacter';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import { AuthContext } from './context/authContext';
import { useContext } from "react";

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/characters"
            element={
              currentUser?.accessToken ? <Charachters /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/character/:id"
            element={
              currentUser?.accessToken ? <SingleCharacter /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/episode/:id"
            element={
              currentUser?.accessToken ? <SingleEpisode /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/location/:id"
            element={
              currentUser?.accessToken ? <SingleLocation /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
