import { useState, useEffect } from "react";
import PortalCautive from "./components/PortalCautive";
import "./App.css";

const App = () => {
  const [message, setMessage] = useState("Disfrute nuestro WIFI");
  const [macAddress, setMacAddress] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carga

  const getMacAddressFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const mac = urlParams.get("id");
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
    setMessage("Iniciando conexión, por favor espere un poco");

    setLoading(true); // Inicia el spinner

    try {
      const response = await fetch(
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
        setMessage(`Conexión exitosa`);
        setLoading(false); // Detiene el spinner
        window.location.href =
          "https://www.instagram.com/maremareshotel/?utm_source=ig_web_button_share_sheet";
      } else {
        setMessage(`Hubo un problema al conectarse`);
      }

      console.log("Respuesta del servidor:", JSON.stringify(data, null, 2));
    } catch (error) {
      setMessage(`Error de conexión, intente de nuevo.`);
    }
  };

  return (
    <PortalCautive
      macAddress={macAddress}
      handleConnect={handleConnect}
      message={message}
      loading={loading}
    />
  );
};

export default App;
