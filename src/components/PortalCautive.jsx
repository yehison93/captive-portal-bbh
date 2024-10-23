import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Button, Image } from "react-bootstrap";
import logo from "../assets/logo.png";
import background from "../assets/background.jpg";

/* eslint-disable react/prop-types */
const PortalCautive = ({ macAddress, handleConnect, message }) => {
  return (
    <Container fluid className="main-container bg-dark">
      <Image src={background} className="bg-img" />
      <Card
        className="bg-transparent text-light text-center"
        style={{ width: "18rem" }}
      >
        <Card.Img variant="top" src={logo} />
        <Card.Body>
          <Card.Title>Bienvenidos</Card.Title>
          {macAddress ? (
            <>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the cards content.
              </Card.Text>
              <Button variant="light" onClick={handleConnect}>
                Conectar
              </Button>
            </>
          ) : (
            <Card.Footer>{message}</Card.Footer>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PortalCautive;
