import { useState, useEffect } from "react";
import PortalCautive from "./components/PortalCautive";
import "./App.css";

const App = () => {
  const [message, setMessage] = useState("Disfrute nuestro WI-FI");
  const [macAddress, setMacAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);

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

  const handleConnect = async (upBandWidth, downBandWidth, time) => {
    if (!macAddress) {
      setMessage("Dirección MAC no válida.");
      return;
    }
    setMessage("Iniciando conexión, por favor espere...");
    setConnected(false);
    setLoading(true);

    try {
      const response = await fetch(
        "https://backend-portal-captive-bbh.onrender.com/connect",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mac: macAddress,
            up: upBandWidth,
            down: downBandWidth,
            minutes: time,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(`Conexión exitosa`);
        setConnected(true);
        setLoading(false);

        // Intenta abrir la aplicación de Instagram
        const instagramUrl = "instagram://user?username=maremareshotel";
        const webUrl = "http://www.instagram.com/maremareshotel/?hl=es";

        // Crea un elemento <a> oculto para simular un clic
        const link = document.createElement("a");
        link.href = instagramUrl;
        document.body.appendChild(link);

        // Simula un clic en el enlace
        link.click();

        // Espera un momento y redirige a la web si la app no se abre
        setTimeout(() => {
          window.location.href = webUrl;
        }, 500);
      } else {
        setMessage(
          `Hubo un problema al conectarse, intenta de nuevo mas tarde.`
        );
      }

      console.log("Respuesta del servidor:", JSON.stringify(data, null, 2));
      // eslint-disable-next-line no-unused-vars
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
      connected={connected}
    />
  );
};

export default App;
