import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";
import Ranking from "./page/Ranking";
import { ToastContainer } from "react-toastify";
import Footer from "./component/Footer";
import Layout from "./Layout";
import { Provider as ReduxProvider } from "react-redux";
import {store} from "./store";
function App() {
  
  return (
    <Router>
      
        <div className=" App w-[700px] h-[75vh] max-sm:w-[400px] max-sm:h-[70vh]">
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
    </Router>
  );
}

export default App;
