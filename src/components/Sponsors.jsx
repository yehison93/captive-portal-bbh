import { Carousel, Figure } from "react-bootstrap";
// import Sponsor from "./Sponsor";
import logoTecnonet from "../assets/sponsors/tecnonet.webp";

const sponsorItem = [
  {
    name: "Tecnonet",
    img: logoTecnonet,
    slogan: "Te mantiene conectado",
  },
  {
    name: "Tecnonet",
    img: logoTecnonet,
    slogan: "Te mantiene conectado",
  },
  {
    name: "Tecnonet",
    img: logoTecnonet,
    slogan: "Te mantiene conectado",
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
            <Figure>
              <Figure.Image
                width={171}
                height={180}
                alt={"Imagen de " + item.name}
                src={item.img}
              />
              <Figure.Caption className="text-light">
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
