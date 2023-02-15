import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>MANeFEST</h1>
        <p>We Promise Your Comfort</p>

        <p>Copyrights 2021 &copy; </p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instagram.com/Manefest.co">Instagram</a>
        <a href="http://youtube.com/Manefest">Youtube</a>
        <a href="http://instagram.com/Manefest">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;