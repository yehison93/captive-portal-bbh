import { useState, useEffect, useRef } from "react";
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
  const retryCountRef = useRef(0);
  const MAX_RETRIES = 30; // Número máximo de reintentos para verificar acceso a internet
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
  const iosTestUrls = [
    "http://captive.apple.com/hotspot-detect.html",
    "https://www.apple.com/library/test/success.html",
    "https://www.google.com/generate_204"
  ];

  const checkInternetAccess = async () => {
    const testUrl = isIOS ? iosUrl : androidUrl;
    let success = false;

    try {
      await fetch(testUrl, { mode: "no-cors", cache: "no-store" });
      success = true;
    } catch (e) {
      // Si falla, reintenta
    }

    if (success) {
      setShowInstagramBtn(true);
      setLoading(false);
      retryCountRef.current = 0;
      setMessage("¡Ya tienes acceso a internet! Haz clic en navegar.");
    } else {
      retryCountRef.current += 1;
      setMessage(`Intento ${retryCountRef.current}, Acceso a internet aún no disponible...`);
      if (retryCountRef.current < (isIOS ? 10 : MAX_RETRIES)) {
        setTimeout(checkInternetAccess, isIOS ? 1000 : 2000);
      } else {
        setMessage("Parece que hay un problema con la conexión. Por favor, intenta de nuevo o contacta al soporte.");
      }
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
        setMessage("Conexión exitosa, verificando acceso a internet...");
        setConnected(true);
        setTimeout(checkInternetAccess, 1000); // Comienza a chequear acceso tras 0.5s
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
