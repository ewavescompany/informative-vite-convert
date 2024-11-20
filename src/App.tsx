import "./App.css";
import AppRoutes from "./AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div>
      <Router future={{ v7_startTransition: true }}>
        <AppRoutes />
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
