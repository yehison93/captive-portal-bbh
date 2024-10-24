import "bootstrap/dist/css/bootstrap.min.css";
import Sponsors from "./Sponsors";
import {
  Card,
  Container,
  Row,
  Button,
  Image,
  Stack,
  Spinner,
} from "react-bootstrap";
import logo from "../assets/logo.png";
import background from "../assets/background.jpg";
import Footer from "./Footer";

/* eslint-disable react/prop-types */
const PortalCautive = ({
  macAddress,
  handleConnect,
  message,
  loading,
  connected,
}) => {
  return (
    <Container fluid className="main-container bg-dark gap-1">
      <Image src={background} className="bg-img" />
      <Row>
        <Card
          className="container-card bg-transparent text-light text-center  gap-1"
          style={{ width: "30rem" }}
        >
          <Card.Img variant="top" src={logo} className="img-logo" />
          <Card.Body>
            <Card.Title>
              <Stack direction="horizontal" className="justify-content-center">
                <span className="palmeras ">🌴</span>
                <h1 className="">¡Bienvenido!</h1>
                <span className="palmeras  ">🌴</span>
              </Stack>
            </Card.Title>
            {macAddress ? (
              <>
                <Card.Text>
                  <h5>{message}</h5>
                </Card.Text>
                {loading ? (
                  <>
                    <Spinner animation="grow" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </>
                ) : (
                  connected || (
                    <Button
                      className="btn-submit"
                      variant="light"
                      onClick={handleConnect}
                    >
                      CONECTAR
                    </Button>
                  )
                )}
              </>
            ) : (
              macAddress && <Card.Text>{message}</Card.Text>
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
