import { useState, useEffect } from "react";
import PortalCautive from "./components/PortalCautive";
import "./App.css";

const UnifiData = {
  url: "https://unifimaremares.share.zrok.io",
  siteID: "d41gke5t",
  userName: "API.Admin",
  pw: "123456BBH#",
};

const App = () => {
  const [message, setMessage] = useState("Disfrute de nuestra red wifi.");
  const instagramUrl = `https://www.instagram.com/maremareshotel/?hl=es`;
  const androidUrl = "https://www.google.com/generate_204"; // URL para Android
  const iosUrl = "http://captive.apple.com/hotspot-detect.html"; // URL para iOS
  const [macAddress, setMacAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [showInstagramBtn, setShowInstagramBtn] = useState(false);
  
  // Detecta si el usuario está en iOS
  const isIOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);


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

  // Chequea conectividad a internet haciendo fetch a un sitio externo
  const checkInternetAccess = async () => {
    try {
      // Google generate_204 es ideal para este propósito
      const res = await fetch(androidUrl , { mode: "no-cors" });
      // Si no lanza error, se asume acceso
      setShowInstagramBtn(true);
      setMessage("¡Ya tienes acceso a internet! Haz clic en navegar.");
    } catch (e) {
      // Si hay error, aún no hay acceso
      setTimeout(checkInternetAccess, 5000); // Reintenta en 1 segundos
    }
  };

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
        setMessage(isIOS ? "Conexión exitosa, puedes cerrar la ventana." : "Conexión exitosa, verificando acceso a internet...");
        setConnected(true);
        setLoading(false);
        setTimeout(checkInternetAccess, 500); // Comienza a chequear acceso tras 0.5s
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
    <>
      <PortalCautive
        macAddress={macAddress}
        handleConnect={handleConnect}
        message={message}
        loading={loading}
        connected={connected}
        instagramUrl={instagramUrl}
        showInstagramBtn={showInstagramBtn}
        isIOS={isIOS}
        iosUrl={iosUrl}
        androidUrl={androidUrl}
      />
    </>
  );
};

export default App;
