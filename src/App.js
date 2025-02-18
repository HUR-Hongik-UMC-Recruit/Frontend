import "./App.css";
import GlobalStyle from "./GlobalStyles";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./pages/Routing";
import DeviceDetect from "./components/DeviceDetect";
import { isMobile, isTablet } from 'react-device-detect';

function App() {

  const isMobileOrTablet = isMobile || isTablet;

  return (
    isMobileOrTablet ? (
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