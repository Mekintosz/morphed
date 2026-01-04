import React from 'react';
import { Brain, Link as LinkIcon, Cpu, ShieldCheck, Cloud, BarChart3 } from 'lucide-react';
import styles from './Features.module.css';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'blue' | 'green';
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, color }) => {
  return (
    <div className={`${styles.card} clip-corner-sm`}>
      <div className={`${styles.cardInner} clip-corner-sm`}>
        <div className={styles.iconWrapper}>
          {icon}
        </div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>

        <div className={`${styles.cornerAccent} ${styles.cornerTopLeft}`}></div>
        <div className={`${styles.cornerAccent} ${styles.cornerBottomRight}`}></div>
      </div>
    </div>
  );
};

const Features: React.FC = () => {
  const features: FeatureCardProps[] = [
    {
      icon: <Brain size={40} strokeWidth={1.5} />,
      title: "AI & Machine Learning",
      description: "Intelligent automation & predictive insights designed to learn and adapt to your workflow.",
      color: 'blue'
    },
    {
      icon: <LinkIcon size={40} strokeWidth={1.5} />,
      title: "Blockchain Integration",
      description: "Secure, decentralized ledger systems ensuring transparency and immutability.",
      color: 'blue'
    },
    {
      icon: <Cpu size={40} strokeWidth={1.5} />,
      title: "Quantum Computing Ready",
      description: "Future-proof architecture built to harness the power of quantum processing.",
      color: 'blue'
    },
    {
      icon: <ShieldCheck size={40} strokeWidth={1.5} />,
      title: "Cybersecurity Shield",
      description: "Advanced threat detection & defense mechanisms protecting your assets 24/7.",
      color: 'blue'
    },
    {
      icon: <Cloud size={40} strokeWidth={1.5} />,
      title: "Scalable Infrastructure",
      description: "Elastic cloud solutions that grow seamlessly with your business demands.",
      color: 'blue'
    },
    {
      icon: <BarChart3 size={40} strokeWidth={1.5} />,
      title: "Real-Time Analytics",
      description: "Instant data-driven decisions visualized through our intuitive dashboard.",
      color: 'blue'
    }
  ];

  return (
    <section id="features" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>
            Core Technologies
          </h2>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;