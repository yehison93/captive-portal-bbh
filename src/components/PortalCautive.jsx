import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Row, Button, Image, Stack } from "react-bootstrap";
import { useState, useEffect } from "react";
import Sponsors from "./Sponsors";
import Footer from "./Footer";
import logo from "../assets/logo.png";
import spinner from "../assets/logoSpinner.png";

// Importa dinámicamente todas las imágenes de la carpeta Fotos_Maremares
const images = import.meta.glob(
  "../assets/Fotos_Maremares/*.{png,jpg,jpeg,heic}"
);
const PortalCautive = ({
  // eslint-disable-next-line react/prop-types
  macAddress,
  // eslint-disable-next-line react/prop-types
  handleConnect,
  // eslint-disable-next-line react/prop-types
  message,
  // eslint-disable-next-line react/prop-types
  loading,
  // eslint-disable-next-line react/prop-types
  connected,
  // eslint-disable-next-line react/prop-types
  instagramUrl,
  // eslint-disable-next-line react/prop-types
  showInstagramBtn,
  // eslint-disable-next-line react/prop-types
  isIOS,
  // eslint-disable-next-line react/prop-types
  iosUrl,
}) => {
  const [numItem, setNumItem] = useState(0);
  // Guarda el índice aleatorio para evitar que cambie en cada render
  const [randomIndex] = useState(() => {
    const imagePaths = Object.keys(images);
    return imagePaths.length > 0
      ? Math.floor(Math.random() * imagePaths.length)
      : 0;
  });
  const [randomImage, setRandomImage] = useState("");

  useEffect(() => {
    const imagePaths = Object.keys(images);
    if (imagePaths.length > 0) {
      const selectedImagePath = imagePaths[randomIndex];
      images[selectedImagePath]().then((module) => {
        setRandomImage(module.default);
      });
    }
  }, [randomIndex]);

  useEffect(() => {
    if (numItem === 10) {
      handleConnect(20000, 20000, 43800);
    }
  }, [handleConnect, numItem]);

  const incrementItem = () => {
    setNumItem((item) => item + 1);
  };

  return (
    <Container fluid className="main-container bg-dark gap-1">
      {/* Usa la imagen aleatoria como fondo */}
      <Image
        src={randomImage}
        alt="Imagen de fondo del hotel"
        className="bg-img"
        loading="eager"
      />
      <Row>
        <Card
          className="container-card bg-transparent text-light text-center gap-1"
          style={{ width: "30rem" }}
        >
          <Card.Img
            variant="top"
            src={logo}
            className="img-logo"
            onClick={incrementItem}
            alt="Logo Maremares"
          />
          <Card.Body>
            <Card.Title>
              <Stack direction="horizontal" className="justify-content-center">
                <span className="palmeras" aria-label="Palmera">
                  🌴
                </span>
                <h1>¡Bienvenido!</h1>
                <span className="palmeras" aria-label="Palmera">
                  🌴
                </span>
              </Stack>
            </Card.Title>
            {macAddress ? (
              <>
                <Card.Text>{message}</Card.Text>
                <Button
                  className="btn-submit"
                  variant="light"
                  aria-label="Ir a Instagram"
                  href={isIOS ? iosUrl : instagramUrl}
                  hidden={loading || !connected || !showInstagramBtn}
                >
                  NAVEGAR
                </Button>
                {loading ? (
                  <Image className="spinner" src={spinner} alt="Cargando..." />
                ) : (
                  !connected && (
                    <Button
                      className="btn-submit"
                      variant="light"
                      onClick={() => handleConnect(10000, 10000, 10080)}
                      disabled={loading}
                      aria-label="Conectar a WiFi"
                    >
                      CONECTAR
                    </Button>
                  )
                )}
              </>
            ) : (
              <Card.Text>{message}</Card.Text>
            )}
          </Card.Body>
        </Card>
      </Row>
      <Row className="container-sponsor">
        <Sponsors />
      </Row>
      <Footer />
    </Container>
  );
};

export default PortalCautive;
