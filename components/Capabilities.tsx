import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import styles from './Capabilities.module.css';

const Capabilities: React.FC = () => {
  const capabilities = [
    {
      title: "Accelerate Development",
      desc: "Accelerate development and predictive insights with our rapid deployment engines."
    },
    {
      title: "Optimize Operations",
      desc: "Optimize operations and enhance workflow efficiency through autonomous agents."
    },
    {
      title: "Secure Your Future",
      desc: "Prepare your future, insure your future with quantum-resistant encryption."
    }
  ];

  return (
    <section id="capabilities" className={styles.section}>
      <div className={styles.backgroundGlow}></div>

      <div className="container">
        <div className={styles.contentGrid}>
          {/* Image Side */}
          <div className={styles.imageWrapper}>
            <div className={styles.imageGlow}></div>
            <div className={`${styles.imageContainer} clip-corner`}>
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
                alt="Advanced Dashboard"
                className={styles.image}
              />

              {/* Overlay HUD Elements */}
              <div className={styles.imageOverlay}>
                <div className={styles.overlayContent}>
                  <div>
                    <div className={styles.statusLabel}>SYSTEM STATUS</div>
                    <div className={styles.statusValue}>OPTIMAL</div>
                  </div>
                  <div className={styles.bars}>
                    {[1, 2, 3, 4, 5].map(i => (
                      <div
                        key={i}
                        className={`${styles.bar} ${i < 5 ? styles.barActive : styles.barInactive}`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className={styles.textContent}>
            <h2 className={styles.title}>
              Advanced Capabilities
            </h2>
            <h3 className={styles.subtitle}>REDEFINE YOUR EDGE</h3>

            <div className={styles.capabilitiesList}>
              {capabilities.map((cap, index) => (
                <div key={index} className={styles.capabilityItem}>
                  <div className={styles.iconWrapper}>
                    <CheckCircle2 size={24} />
                  </div>
                  <div className={styles.capabilityContent}>
                    <h4 className={styles.capabilityTitle}>
                      {cap.title}
                    </h4>
                    <p className={styles.capabilityDescription}>
                      {cap.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;