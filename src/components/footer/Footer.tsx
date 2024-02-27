import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer-container">
      <p>Sai Han Htet &copy; {currentYear}</p>
    </footer>
  );
};

export default Footer;
