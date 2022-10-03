import React from 'react';
import styles from './Rating.module.css';

type RatingIndicatorProps = {
    value: 0 | .5 | 1;
}

const Star = (props: RatingIndicatorProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 48" className={styles.Star}>
        <title>Five Pointed Star</title>
        <path fill="#d2d4d6" stroke="none" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/>
        <mask id="partialMask">
            <rect width="25" height="48" fill="white" />
        </mask>
        {props.value > 0 && (
            <path
                fill="#ede809"
                stroke="none"
                d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
                mask={props.value === 0.5 ? 'url(#partialMask)' : undefined}
            />
        )}
    </svg>
)

type RatingProps = {
    value: number;
    type: 'SELF' | 'USER'
}

export const Rating = (props: RatingProps) => {
    return (
        <div className={styles.Rating}>
            {Array.from({ length: 5 }).map((_, index) => {
                let value: 0 | 0.5 | 1 = 0;
                if (index + 1 <= props.value) {
                    value = 1
                } else if (index + 1 > props.value && index < props.value) {
                    value = 0.5
                }
                return (
                    <div key={index}>
                        <Star value={value} />
                    </div>
                )
            })}
        </div>
    )
}
