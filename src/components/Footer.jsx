import "../components/Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>
          &copy; 2025 - Imagined by{" "}
          <a
            href="https://github.com/hesersu"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Krists KRIEVINS
          </a>
          . Designed and developed with{" "}
          <a
            href="https://github.com/CannyRo"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Ronan CANNY
          </a>
          . Original idea conceived as part of{" "}
          <a
            href="https://www.ironhack.com/fr-en/web-development/remote"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Ironhack's Web Developer Bootcamp
          </a>
          .
        </p>
      </div>
    </footer>
  );
};
