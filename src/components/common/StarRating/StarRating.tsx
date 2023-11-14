import React, { useCallback } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

type StarRatingProps = {
  initialRating?: number;
  staticRating?: boolean;
  onChange?: (rating: number) => void;
};

const StarRating = ({
  initialRating = 0,
  onChange,
  staticRating,
}: StarRatingProps) => {
  const [rating, setRating] = React.useState(initialRating);
  const [hover, setHover] = React.useState(0);

  React.useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleRatingChange = useCallback(
    (rating: number) => {
      if (staticRating) return;
      setRating(rating);
      onChange?.(rating);
    },
    [onChange, staticRating]
  );

  return (
    <>
      {[...Array(5)].map((_, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={clsx(styles["start-button"], {
              [styles.on]: index <= (hover || rating),
            })}
            onClick={() => handleRatingChange(index)}
            onMouseEnter={() => !staticRating && setHover(index)}
            onMouseLeave={() => !staticRating && setHover(rating)}
          >
            <span className={styles.star}>&#9733;</span>
          </button>
        );
      })}
    </>
  );
};

export default StarRating;
