import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import PrivateRoute from './component/PrivateRoute';
import AvatarSetup from './pages/AvatarSetup';
import ChangePassword from './pages/ChangePassword';
import EditProfile from './pages/EditProfile';
import ForgotPassword from './pages/ForgotPassword';
import Game from './pages/Game';
import LessionDetails from './pages/LessonDetails';
import Lessons from './pages/Lessons';
import Login from './pages/Login';
import MultipleGame from './pages/MultipleGame';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Topic from './pages/Topic';
import MultipleGameVoice from './pages/MultipleGameVoice';

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ChangePassword />} />

        {/* Private routes */}
        <Route path="/" element={
          <PrivateRoute>
            <Lessons />
          </PrivateRoute>
        } />
        <Route path="/avatar-setup" element={
          <PrivateRoute>
            <AvatarSetup />
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/games" element={
          <PrivateRoute>
            <Game />
          </PrivateRoute>
        } />
        <Route path="/edit-profile" element={
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        } />
        <Route path="/topic/:typeGame" element={
          <PrivateRoute>
            <Topic />
          </PrivateRoute>
        } />
        {/* <Route path="/quiz/game/:gameId/topic/:topicId" element={
          <PrivateRoute>
            <MultipleGame />
          </PrivateRoute>
        } /> */}
          <Route path="/quiz/game/:gameId/topic/:topicId" element={
          <PrivateRoute>
            <MultipleGame />
          </PrivateRoute>
        } />
        <Route path="/lesson" element={
          <PrivateRoute>
            <LessionDetails />
          </PrivateRoute>
        } />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
