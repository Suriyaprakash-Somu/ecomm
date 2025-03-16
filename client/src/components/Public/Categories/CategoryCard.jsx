import React from "react";
import styles from "./CategoryCard.module.css";

const CategoryCard = ({ category }) => {
  const getCategoryIcon = (categoryName) => {
    const iconMap = {};

    return (
      iconMap[categoryName] || (
        <div className={styles.categoryInitial}>{categoryName.charAt(0)}</div>
      )
    );
  };

  return (
    <div className={styles.categoryCard}>
      <div className={styles.iconWrapper}>
        {getCategoryIcon(category.category_name)}
      </div>
      <h3 className={styles.categoryName}>{category.category_name}</h3>
      <div className={styles.hoverOverlay}>
        <button className={styles.exploreButton}>Explore</button>
      </div>
    </div>
  );
};

export default CategoryCard;
