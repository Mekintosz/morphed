import React from 'react';
import { Check, X } from 'lucide-react';
import styles from './Pricing.module.css';

interface PricingCardProps {
  name: string;
  subtitle: string;
  price: string;
  features: string[];
  highlight?: boolean;
  ctaText: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ name, subtitle, price, features, highlight, ctaText }) => {
  return (
    <div className={`${styles.card} ${highlight ? styles.cardHighlight : styles.cardNormal} clip-corner-sm`}>
      <div className={`${styles.cardInner} clip-corner-sm`}>
        {highlight && (
          <div className={`${styles.badge} clip-corner-sm`}>
            MOST POPULAR
          </div>
        )}

        <div className={styles.planHeader}>
          <div className={`${styles.icon} ${highlight ? styles.iconHighlight : styles.iconNormal}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <h3 className={styles.planName}>{name}</h3>
          <p className={styles.planSubtitle}>{subtitle}</p>
        </div>

        <div className={styles.pricing}>
          <span className={styles.price}>{price}</span>
          {price !== 'Custom Pricing' && <span className={styles.priceUnit}>/month</span>}
        </div>

        <ul className={styles.featuresList}>
          {features.map((feature, idx) => (
            <li key={idx} className={styles.feature}>
              <div className={`${styles.featureDot} ${highlight ? styles.featureDotHighlight : styles.featureDotNormal}`}></div>
              {feature}
            </li>
          ))}
        </ul>

        <button className={`${styles.ctaButton} ${highlight ? styles.ctaHighlight : styles.ctaNormal} clip-corner-sm`}>
          {ctaText}
        </button>
      </div>
    </div>
  );
};

const Pricing: React.FC = () => {
  const plans: PricingCardProps[] = [
    {
      name: "BASIC",
      subtitle: "Ideal for Individuals",
      price: "$49",
      features: ["AI Fundamentals", "Limited API Access", "Community Support"],
      ctaText: "Get Started"
    },
    {
      name: "PRO",
      subtitle: "Perfect for Teams",
      price: "$149",
      features: ["Advanced AI Suite", "Full API & Integrations", "Priority Support", "Dedicated Sandbox"],
      highlight: true,
      ctaText: "Go Pro"
    },
    {
      name: "ENTERPRISE",
      subtitle: "Tailored for Organizations",
      price: "Custom Pricing",
      features: ["Quantum-Ready Platform", "Dedicated Infrastructure", "24/7 Premium Support", "Custom Training"],
      ctaText: "Contact Sales"
    }
  ];

  const comparisonFeatures = [
    { name: "Ideal for Individuals", basic: true, pro: true, ent: true },
    { name: "AI Fundamentals", basic: false, pro: true, ent: true },
    { name: "Limited API Access", basic: false, pro: true, ent: true },
    { name: "Community Support", basic: false, pro: true, ent: true },
    { name: "Dedicated Sandbox", basic: false, pro: true, ent: true },
  ];

  return (
    <section id="pricing" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>
            Flexible Plans for Future-Ready Growth.
          </h2>
          <p className={styles.subtitle}>
            Choose the plan that best fits your scale. Upgrade anytime as your needs evolve.
          </p>
        </div>

        <div className={styles.grid}>
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>

        {/* Comparison Table */}
        <div className={styles.comparisonSection}>
          <h3 className={styles.comparisonTitle}>Compare Features</h3>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={`${styles.th} ${styles.thFeature}`}>Feature</th>
                <th className={`${styles.th} ${styles.thPlan}`}>BASIC</th>
                <th className={`${styles.th} ${styles.thPlan} ${styles.thPlanPro}`}>PRO</th>
                <th className={`${styles.th} ${styles.thPlan}`}>ENTERPRISE</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((row, idx) => (
                <tr key={idx} className={styles.tr}>
                  <td className={styles.td}>{row.name}</td>
                  <td className={`${styles.td} ${styles.tdIcon}`}>
                    {row.basic ? <Check className={styles.checkIcon} /> : <X className={styles.xIcon} />}
                  </td>
                  <td className={`${styles.td} ${styles.tdIcon}`}>
                    {row.pro ? <Check className={`${styles.checkIcon} ${styles.checkIconBlue}`} /> : <X className={styles.xIcon} />}
                  </td>
                  <td className={`${styles.td} ${styles.tdIcon}`}>
                    {row.ent ? <Check className={styles.checkIcon} /> : <X className={styles.xIcon} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Pricing;