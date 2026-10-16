import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import styles from "./Footer.module.css";

const footerColumns = [
  [
    "Audio Description",
    "Investor Relations",
    "Legal Notices",
  ],
  [
    "Help Centre",
    "Jobs",
    "Cookie Preferences",
  ],
  [
    "Gift Cards",
    "Terms of Use",
    "Corporate Information",
  ],
  [
    "Media Centre",
    "Privacy",
    "Contact Us",
  ],
];

const socialLinks = [
  {
    label: "Facebook",
    icon: <FaFacebookF />,
    href: "#",
  },
  {
    label: "Instagram",
    icon: <FaInstagram />,
    href: "#",
  },
  {
    label: "Twitter",
    icon: <FaTwitter />,
    href: "#",
  },
  {
    label: "YouTube",
    icon: <FaYoutube />,
    href: "#",
  },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Social Media */}
        <div className={styles.socialLinks}>
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className={styles.socialIcon}
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Footer Links */}
        <div className={styles.linksGrid}>
          {footerColumns.map((column, columnIndex) => (
            <div className={styles.column} key={columnIndex}>
              {column.map((link) => (
                <a href="#" key={link} className={styles.footerLink}>
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Copyright */}
        <p className={styles.copyright}>© 1997-2026 Netflix, Inc.</p>
      </div>
    </footer>
  );
};

export default Footer;
