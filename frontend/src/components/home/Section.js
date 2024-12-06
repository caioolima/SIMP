import React from 'react';
import styles from './styles/Home.module.css';

const Section = ({ title, description, imageSrc, imageAlt }) => (
  <section className={styles.section}>
    <div className={styles.sectionContent}>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>{title}</h2>
        <p className={styles.text}>{description}</p>
      </div>
      <div className={styles.imageContainer}>
        <img src={imageSrc} alt={imageAlt} className={styles.productImage} />
      </div>
    </div>
  </section>
);

export default Section;
