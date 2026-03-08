import { footer } from "../data/content";

export default function Footer() {
  return (
    <footer
      className="footer-piratesse"
      role="contentinfo"
    >
      <div className="footer-piratesse-inner">
        <div className="footer-credit">
          Créé avec passion pour&nbsp;&nbsp;&nbsp;<span className="footer-credit-name">Chahm</span>
        </div>
        <p className="footer-publisher">
          <a
            href={footer.publisherUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-publisher-link"
          >
            {footer.publisherName}
          </a>
        </p>
      </div>
    </footer>
  );
}
