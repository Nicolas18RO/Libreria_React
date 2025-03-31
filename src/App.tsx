import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import AutorScreen from "./commons/Autor/Screen/AutorScreen";
import EditorialScreen from "./commons/Editorial/Screen/EditorialScreen";
import LibroScreen from "./commons/Libro/Screen/LibroScreen";
import MiembroScreen from "./commons/Miembro/Screen/MiembroScreen";
import NotFoundPage from "./pages/NotFound";
import SideBar from "./components/SideBar";
import PrestamoScreen from "./commons/Prestamo/Screen/PrestamoScreen";



function App() {
  return (
    <Router>
      <SideBar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/autor"element={<AutorScreen/>} />
        <Route path="/editorial"element={<EditorialScreen/>} />
        <Route path="/libro"element={<LibroScreen/>} />
        <Route path="/miembro"element={<MiembroScreen/>} /> 
        <Route path="/prestamo"element={<PrestamoScreen/>} /> 
        <Route path="*"element={<NotFoundPage/>} />      
      </Routes>
    </Router>

  );
    
}

export default App
