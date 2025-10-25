import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Inicio, Login, PanelAdmin } from './pages'
import { AuthProvider } from "./context/AuthContext";
import { Footer, Header } from "./componentes";


function App() {

  
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<PanelAdmin />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
