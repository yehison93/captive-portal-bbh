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
  macAddress,
  handleConnect,
  message,
  loading,
  connected,
  instagramUrl,
}) => {
  const [numItem, setNumItem] = useState(0);

  // Estado para almacenar la imagen aleatoria
  const [randomImage, setRandomImage] = useState("");

  useEffect(() => {
    // Convierte las claves del objeto `images` en un array
    const imagePaths = Object.keys(images);

    if (imagePaths.length > 0) {
      // Selecciona una imagen aleatoria
      const randomIndex = Math.floor(Math.random() * imagePaths.length);

      // Carga la imagen seleccionada
      const selectedImagePath = imagePaths[randomIndex];
      images[selectedImagePath]().then((module) => {
        setRandomImage(module.default); // Establece la ruta de la imagen
      });
    }
  }, []);

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
        alt="Imagen de fondo, puede contener imágenes del hotel"
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
          />
          <Card.Body>
            <Card.Title>
              <Stack direction="horizontal" className="justify-content-center">
                <span className="palmeras">🌴</span>
                <h1>¡Bienvenido!</h1>
                <span className="palmeras">🌴</span>
              </Stack>
            </Card.Title>
            {macAddress ? (
              <>
                <Card.Text>
                  <h5>{message}</h5>
                </Card.Text>
                <Button
                  className="btn-submit"
                  variant="light"
                  href={instagramUrl}
                  hidden={!connected}
                  rel="noopener noreferrer"
                >
                  NAVEGAR
                </Button>
                {loading ? (
                  <Image className="spinner" src={spinner} />
                ) : (
                  !connected && (
                    <Button
                      className="btn-submit"
                      variant="light"
                      onClick={() => handleConnect(8000, 8000, 10080)}
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
