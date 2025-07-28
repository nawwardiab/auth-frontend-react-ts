import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

//TODO
// create AuthContext to pass data to global state
// create protected routes (when user is logged in)
//
createRoot(document.getElementById("root")!).render(<App />);
