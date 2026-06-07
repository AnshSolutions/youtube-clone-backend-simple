
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";

import LandingPage from "./Screens/LandingPage";
import { SignupPage } from "./Screens/SignupPage";
import { SigninPage } from "./Screens/SigninPage";
import { VideoPage } from "./Screens/VideoPage";
import {WatchPage}  from "./Screens/WatchPage";
import {UploadPage} from "./Screens/UploadPage";
import { Appbar } from "./components/Appbar";




export function App() {
  return (
    <BrowserRouter>
      <Appbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/watch" element={<VideoPage />} />
        <Route path="/watch/:id" element={<WatchPage />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
