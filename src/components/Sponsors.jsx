import { Carousel, Figure } from "react-bootstrap";
import logoTecnonet from "../assets/sponsors/tecnonet.webp";
import logoBBH from "../assets/sponsors/bbh.png";
import logoBrisas from "../assets/sponsors/brisas.png";
import logoInvitado01 from "../assets/sponsors/logoInvitado04.png";
// import logoInvitado02 from "../assets/sponsors/Oriente-2024-H.png";
// import logoInvitado04 from "../assets/sponsors/logoInvitado01.svg";

const sponsorItem = [
  {
    name: "Magallanes",
    img: logoInvitado01,
    slogan: "¡Bienvenidos!",
  },
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
            interval={1000}
            className="text-center"
            key={index}
            // activeIndex={index}
          >
            <Figure className="container-figure">
              <Figure.Image
                className="figure-img"
                alt={"Imagen de " + item.name}
                src={item.img}
              />
              <Figure.Caption className="text-light text-slogan">
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
