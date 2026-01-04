import React from 'react';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* Background Decorations */}
        <div className={styles.background}>
          {/* Animated Gradient Background */}
          <div className={styles.gradientBg}></div>

          {/* Grid lines */}
          <div className={styles.gridLines}></div>

          {/* Glowing orb */}
          <div className={styles.glowingOrb}></div>
        </div>

        <div className="container">
          <div className={styles.contentGrid}>
            {/* Text Content */}
            <div className={styles.textContent}>
              <div className={styles.badge}>
                <span className={styles.badgeDot}></span>
                <span className={styles.badgeText}>System Online v2.4</span>
              </div>

              <h1 className={styles.title}>
                MORPHED: <br />
                <span className={styles.titleGradient}>
                  SHAPING THE FUTURE
                </span>
              </h1>

              <p className={styles.description}>
                Experience unparalleled innovation. Our AI-driven platform redefines possibilities, giving your business the ultimate competitive edge.
              </p>

              <div className={styles.buttonGroup}>
                <button className={`${styles.buttonPrimary} clip-corner-sm`}>
                  <span style={{ position: 'relative', zIndex: 10 }}>Explore Platform</span>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0, 243, 255, 0.2)',
                    transform: 'translateY(100%)',
                    transition: 'transform 300ms'
                  }}></div>
                </button>

                <button className={`${styles.buttonSecondary} clip-corner-sm`}>
                  View Demo
                </button>
              </div>
            </div>

            {/* Graphic Content */}
            <div className={styles.graphic}>
              <div className={styles.graphicContainer}>
                {/* Decorative Circles */}
                <div className={styles.circle}></div>
                <div className={styles.circleDashed}></div>
                <div className={styles.circleGlow}></div>

                {/* Image Placeholder - Futuristic Brain/Globe */}
                <div className={styles.imageContainer}>
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtwh6moGuz7QxiVldpVdjrnOz2XZF00JsKmw7V0SpCI13nGPJ8ZuAAB_E27DNfCNP89tUVq9Q6P8j5GVezb2KBlWSLeDkduOASDL3t-WPrcg4WVVEoJ1MXt5OqnvqmMs1RHgh56DJHxs_znvs3Gc1_LPSqnkZO7EXfL6KxW2G9yPk7VLHe0fW2mve_0glG3oBeOfPnd2_SKWssHz7uhxddF8BtooVDPQ6lTzgx3e3FDYxbXghsd4eKMQFlfu5VZYqEj7kA8J2gILfz"
                    alt="Digital Brain"
                    className={styles.image}
                  />
                </div>

                {/* Floating Data Points */}
                <div className={`${styles.dataPoint} ${styles.dataPointTop}`}>
                  <div className={styles.dataLabel}>Processing</div>
                  <div className={styles.dataValue}>98.4%</div>
                </div>

                <div className={`${styles.dataPoint} ${styles.dataPointBottom}`}>
                  <div className={styles.dataLabel}>Security</div>
                  <div className={styles.dataValue}>Optimized</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Circuit Lines Decor */}
      <div className={styles.bottomDecor}></div>
      <div className={`${styles.bottomLine} ${styles.bottomLineLeft}`}></div>
      <div className={`${styles.bottomLine} ${styles.bottomLineRight}`}></div>
    </section>
  );
};

export default Hero;