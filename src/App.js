import "./App.css";
import GlobalStyle from "./GlobalStyles";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./pages/Routing";
import DeviceDetect from "./components/DeviceDetect";
import { isMobile } from 'react-device-detect';

function App() {
  return (
    isMobile ? (
      <DeviceDetect />
    ) : (
      <Router>
        <GlobalStyle />
        <Routing />
      </Router>
    )
  );
}

export default App;