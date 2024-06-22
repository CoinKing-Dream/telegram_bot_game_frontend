import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";
import Ranking from "./page/Ranking";
import { ToastContainer } from "react-toastify";
import Footer from "./component/Footer";
import Layout from "./Layout";
import { Provider as ReduxProvider } from "react-redux";
import {store} from "./store";
import { useEffect, useState } from "react";
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  
  return (
    <Router>
      {loading ? '' :
      <div className="App w-full h-[100vh]">
        <ReduxProvider store={store}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="ranking" element={<Ranking />} />
            </Route>
          </Routes>
          <ToastContainer />
          <Footer />
        </ReduxProvider>
      </div>
      }
    </Router>
  );
}

export default App;
