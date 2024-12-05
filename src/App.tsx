import "./App.css";
import AppRoutes from "./AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
// import { Helmet } from "react-helmet-async";

function App() {
  return (
    <div>
      {/* <Helmet>
        <title>test</title>
        <meta name="description" content="ewavespro website" />
        <link rel="icon" href={icon} type="image/x-icon" />
      </Helmet> */}
      <h1>hello</h1>
      <h2>another test</h2>
      <h3>another test</h3>
      <Router future={{ v7_startTransition: true }}>
        <AppRoutes />
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
