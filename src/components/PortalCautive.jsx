import "bootstrap/dist/css/bootstrap.min.css";
import Sponsors from "./Sponsors";
import { Card, Container, Row, Button, Image, Stack } from "react-bootstrap";
import logo from "../assets/logo.png";
import background from "../assets/background.jpg";
import Footer from "./Footer";

/* eslint-disable react/prop-types */
const PortalCautive = ({ macAddress, handleConnect, message }) => {
  return (
    <Container fluid className="main-container bg-dark gap-1">
      <Image src={background} className="bg-img" />
      <Row>
        <Card
          className="bg-transparent text-light text-center  border-none gap-1"
          style={{ width: "20rem" }}
        >
          <Card.Img variant="top" src={logo} />
          <Card.Body>
            <Card.Title className="text-center">
              <Stack direction="horizontal">
                <span className="palmeras ">🌴</span>
                <h1>¡Bienvenidos!</h1>
                <span className="palmeras ">🌴</span>
              </Stack>
            </Card.Title>
            {macAddress ? (
              <>
                <Card.Text>
                  <h5>
                    Disfrute de nuestro WiFi mientras se relajan en nuestro
                    paraíso.
                  </h5>
                </Card.Text>
                <Button
                  className="btn-submit"
                  variant="light"
                  onClick={handleConnect}
                >
                  Conectar
                </Button>
              </>
            ) : (
              <Card.Footer>{message}</Card.Footer>
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
