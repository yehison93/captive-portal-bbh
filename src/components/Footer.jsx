const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container-footer text-light">
      <p>
        &copy; {currentYear} Maremares Hotel. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;
