import "./App.css";
import AppRoutes from "./AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { Helmet } from "react-helmet-async";

function App() {
  return (
    <div>
      <Helmet>
        <title>test</title>
        <meta name="description" content="ewavespro website" />
        {/* <link rel="icon" href={icon} type="image/x-icon" /> */}
        <meta property="og:title" content="eWaves compony" />
        <meta
          property="og:description"
          content="ewaves pro company test og links"
        />
        <meta
          property="og:image"
          content="https://v4.ewavespro.com/public/images/team/team_672795a3750d43.89817576.png"
        />
        <meta
          property="og:url"
          content="https://informative-vite.vercel.app/"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <Router future={{ v7_startTransition: true }}>
        <AppRoutes />
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
