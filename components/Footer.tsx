import React from 'react';
import { Twitter, Facebook, Instagram, Cpu } from 'lucide-react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.container}>
          {/* Logo & Copyright */}
          <div className={styles.brandSection}>
            <div className={styles.logo}>
              <Cpu className={styles.logoIcon} />
              <span className={styles.logoText}>MORPHED</span>
            </div>
            <p className={styles.copyright}>
              © 2024 MORPHED. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className={styles.links}>
            {['Product', 'Solutions', 'Resources', 'Company'].map((item) => (
              <a key={item} href="#" className={styles.link}>
                {item}
              </a>
            ))}
          </div>

          {/* Socials */}
          <div className={styles.socials}>
            <a href="#" className={styles.socialLink}>
              <Twitter size={20} />
            </a>
            <a href="#" className={styles.socialLink}>
              <Facebook size={20} />
            </a>
            <a href="#" className={styles.socialLink}>
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;