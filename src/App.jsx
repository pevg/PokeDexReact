import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  // Estado para controlar si el sidebar está abierto o cerrado
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Función para alternar el estado del sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Efecto que maneja el estado del sidebar en función del tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="app">
      <Sidebar isOpen={sidebarOpen} />
      <div className={`main-content ${sidebarOpen ? "" : "closed"}`}>
        <Navbar
          className={`navbar ${sidebarOpen ? "" : "closed"}`}
          toggleSidebar={toggleSidebar}
        />
        <Content />
        <Footer />
      </div>
    </div>
  );
};

export default App;
