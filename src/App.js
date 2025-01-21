import "./App.css";
import GlobalStyle from "./GlobalStyles";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./pages/Routing";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <GlobalStyle />
        <Routing />
      </Router>
    </AuthProvider>
  );
}

export default App;
