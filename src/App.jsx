import { useState, useEffect } from "react";
import PortalCautive from "./components/PortalCautive";
import "./App.css";

const App = () => {
  const [message, setMessage] = useState("");
  const [macAddress, setMacAddress] = useState("");

  // Función para obtener la dirección MAC del cliente desde la URL
  const getMacAddressFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const mac = urlParams.get("id"); // Cambiamos a 'id' para obtener la MAC del cliente
    if (mac) {
      setMacAddress(mac);
    } else {
      setMessage(
        "Disculpa, pero hubo un error. Desconecta el dispositivo de la red WIFI y vuelve a conectar para continuar. Si el problema persiste solicita ayuda."
      );
    }
  };

  useEffect(() => {
    getMacAddressFromUrl();
  }, []);

  const handleConnect = async () => {
    if (!macAddress) {
      setMessage("Dirección MAC no válida.");
      return;
    }

    try {
      const response = await fetch(
        //backend alojado en render
        "https://backend-portal-captive-bbh.onrender.com/connect",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mac: macAddress }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(
          `Conexión exitosa: ${data.message || "Conectado exitosamente"}`
        );
        window.location.href =
          "https://www.instagram.com/maremareshotel/?utm_source=ig_web_button_share_sheet"; // Redirige a una página de confirmación
      } else {
        setMessage(`Error: ${data.error || "Hubo un problema al conectarse"}`);
      }

      console.log("Respuesta del servidor:", JSON.stringify(data, null, 2));
    } catch (error) {
      setMessage(`Error de conexión: ${error.message}`);
    }
  };

  return (
    <PortalCautive
      macAddress={macAddress}
      handleConnect={handleConnect}
      message={message}
    />
  );
};

export default App;
