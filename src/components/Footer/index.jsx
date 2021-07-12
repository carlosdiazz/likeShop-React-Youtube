import "./style.css";

const Footer = () => {
  const date = new Date();
  const fullYear = date.getFullYear();
  return (
    <footer className="footer">
      <p>
        Todos los derechos de autor Reservados:  &copy; LikeShop {fullYear}
      </p>
    </footer>
  );
};

export default Footer;
