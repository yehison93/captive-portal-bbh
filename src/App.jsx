import { useState, useEffect } from "react";

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
      setMessage("Dirección MAC no encontrada en la URL.");
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
        "https://backend-portal-captive-bbh.onrender.com:3000/connect",
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
      } else {
        setMessage(`Error: ${data.error || "Hubo un problema al conectarse"}`);
      }

      console.log("Respuesta del servidor:", data);
    } catch (error) {
      setMessage(`Error de conexión: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Conectar Dispositivo</h1>
      {macAddress ? (
        <div>
          <p>Dirección MAC del cliente: {macAddress}</p>
          <button onClick={handleConnect}>Conectar</button>
        </div>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default App;
