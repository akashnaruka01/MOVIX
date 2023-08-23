import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
    FaGithub,
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <ContentWrapper>
                <ul className="menuItems">
                    <li className="menuItem">Terms Of Use</li>
                    <li className="menuItem">Privacy-Policy</li>
                    <li className="menuItem">About</li>
                    <li className="menuItem">Blog</li>
                    <li className="menuItem">FAQ</li>
                </ul>
                <div className="infoText">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                </div>
                <div className="socialIcons">
                    <a href="https://www.facebook.com/akash.naruka.71" className="icon">
                        <FaFacebookF color="white"/>
                    </a>
                    <a href="https://www.instagram.com/prabhuu_000001/" className="icon">
                        <FaInstagram color="white"/>
                    </a>
                    <a href="https://twitter.com/akashnaruka01" className="icon">
                        <FaTwitter color="white"/>
                    </a>
                    <a href="https://www.linkedin.com/in/akash-singh-78897620b/" className="icon">
                        <FaLinkedin color="white"/>
                    </a>
                    <a href="https://github.com/akashnaruka01" className="icon">
                        <FaGithub color="white"/>
                    </a>
                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer;