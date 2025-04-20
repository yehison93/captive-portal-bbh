import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Row, Button, Image, Stack } from "react-bootstrap";
import { useState, useEffect } from "react";
import Sponsors from "./Sponsors";
import Footer from "./Footer";
import logo from "../assets/logo.png";
import background from "../assets/background.jpg";
import spinner from "../assets/logoSpinner.png";

/* eslint-disable react/prop-types */
const PortalCautive = ({
  macAddress,
  handleConnect,
  message,
  loading,
  connected,
  instagramUrl,
}) => {
  const [numItem, setNumItem] = useState(0);

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
      <Image src={background} className="bg-img" />
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
                  target="_blank"
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
