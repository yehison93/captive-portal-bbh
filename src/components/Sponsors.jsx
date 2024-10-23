import { Carousel, Figure } from "react-bootstrap";
// import Sponsor from "./Sponsor";
import logoTecnonet from "../assets/sponsors/tecnonet.webp";
import logoBBH from "../assets/sponsors/bbh.png";
import logoBrisas from "../assets/sponsors/brisas.png";

const sponsorItem = [
  {
    name: "Tecnonet",
    img: logoTecnonet,
    slogan: "Te mantiene conectado",
  },
  {
    name: "BBH",
    img: logoBBH,
    slogan: "¡Gana a lo grande con bbh!",
  },
  {
    name: "Brisas",
    img: logoBrisas,
    slogan: "Tradición que puedes saborear",
  },
];

const Sponsors = () => {
  return (
    <Carousel slide controls={false} indicators={false}>
      {sponsorItem.map((item, index) => {
        return (
          <Carousel.Item
            className="text-center"
            key={index}
            activeIndex={index}
          >
            <Figure className="container-figure">
              <Figure.Image
                className="figure-img"
                alt={"Imagen de " + item.name}
                src={item.img}
              />
              <Figure.Caption className="text-light fs-3">
                {item.slogan}
              </Figure.Caption>
            </Figure>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default Sponsors;
