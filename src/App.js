import "./App.css";
import GlobalStyle from "./GlobalStyles";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./pages/Routing";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routing />
    </Router>
  );
}

export default App;
