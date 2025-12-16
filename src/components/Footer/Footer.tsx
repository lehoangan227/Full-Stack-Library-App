import "./Footer.scss";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footer">
          <div className="certified-logo">
            <img src="/assets/certified-logo.jpeg" />
          </div>
          <div className="footer-link">
            <div className="footer-link-item">
              <a href="">About</a>
            </div>
            <div className="footer-link-item">
              <a href="">Support / Help</a>
            </div>
            <div className="footer-link-item">
              <a href="">Ebook FAQ</a>
            </div>
            <div className="footer-link-item">
              <a href="">Become an Affiliate</a>
            </div>
            <div className="footer-link-item">
              <a href="">Gift Cards</a>
            </div>
            <div className="footer-link-item">
              <a href="">Bookshop.org for Authors</a>
            </div>
            <div className="footer-link-item">
              <a href="">Bookshop.org for Bookstores</a>
            </div>
            <div className="footer-link-item">
              <a href="">Careers</a>
            </div>
            <div className="footer-link-item">
              <a href="">Indiebound - Bookshop.org Changeover FAQ</a>
            </div>
            <div className="footer-link-item">
              <a href="">Contact</a>
            </div>
            <div className="footer-link-item">
              <a href="">Returns and Refund Policy</a>
            </div>
          </div>
          <div className="social-link-container">
            <div className="title">Follow us</div>
            <div className="social-link">
              <div className="social-link-item">
                <a href="">
                  <FaFacebookF className="social-icon" />
                </a>
              </div>
              <div className="social-link-item">
                <a href="">
                  <FaInstagram className="social-icon" />
                </a>
              </div>
              <div className="social-link-item">
                <a href="">
                  <FaThreads className="social-icon" />
                </a>
              </div>
              <div className="social-link-item">
                <a href="">
                  <FaTiktok className="social-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <div className="copyright-item">
            <span>&copy; 2025 AnBook. All Rights Reserved</span>
          </div>
          <div className="copyright-item">
            <a href="">Terms of Use</a>
          </div>
          <div className="copyright-item">
            <a href="">Digital Books Terms of Use</a>
          </div>
          <div className="copyright-item">
            <a href="">Privacy Notice</a>
          </div>
          <div className="copyright-item">
            <a href="">Accessibility Notice</a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
