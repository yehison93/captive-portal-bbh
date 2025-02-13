/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import PortalCautive from "./components/PortalCautive";
import "./App.css";

const UnifiData = {
  url: "https://buddhabarbeachhotel.ddns.net:8443",
  siteID: "d41gke5t",
  userName: "API.Admin",
  pw: "123456BBH#",
};

const App = () => {
  const [message, setMessage] = useState("Disfrute de nuestra red wifi.");
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
            url: UnifiData.url,
            siteID: UnifiData.siteID,
            pw: UnifiData.pw,
            user: UnifiData.userName,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(`Conexión exitosa`);
        setConnected(true);
        setLoading(false);
        window.location.assign(
          "https://www.instagram.com/maremareshotel/?hl=es"
        );
      } else {
        setMessage(
          `Hubo un problema al conectarse, intenta de nuevo más tarde.`
        );
      }

      console.log("Respuesta del servidor:", JSON.stringify(data, null, 2));
    } catch (error) {
      setMessage(`Error de conexión, intente de nuevo.`);
      setLoading(false);
      console.log(error);
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
