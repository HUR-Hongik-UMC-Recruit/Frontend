import "./App.css";
import GlobalStyle from "./GlobalStyles";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./pages/Routing";
import DeviceDetect from "./components/DeviceDetect";
import { isMobile, isTablet, isChrome } from "react-device-detect";

function App() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isTouchDevice = navigator.maxTouchPoints > 1;

  // 갤럭시탭이면서 터치가 되는 기기 (데스크탑 모드에서도 감지)
  const isSamsungTablet =
    (userAgent.includes("samsung") || isChrome) &&
    isTouchDevice &&
    !userAgent.includes("windows");

  const isMobileOrTablet = isMobile || isTablet || isSamsungTablet;

  return isMobileOrTablet ? (
    <DeviceDetect />
  ) : (
    <Router>
      <GlobalStyle />
      <Routing />
    </Router>
  );
}

export default App;
