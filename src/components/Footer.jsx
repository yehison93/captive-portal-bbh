const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container-footer text-light">
      <p>
        &copy; {currentYear}{" "}
        <strong className="text-warning">Maremares Hotel</strong>. Todos los
        derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;
