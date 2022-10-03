import React from 'react';
import styles from './Rating.module.css';

type RatingIndicatorProps = {
    value: 0 | .5 | 1;
}

const Star = (props: RatingIndicatorProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 48" className={styles.Star}>
        <title>Five Pointed Star</title>
        <path fill="#d2d4d6" stroke="none" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/>
        {props.value > 0 && (
            <>
                <mask id="starPartialMask">
                    <rect width="25" height="48" fill="white" />
                </mask>
                <path
                    fill="#ede809"
                    stroke="none"
                    d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
                    mask={props.value === 0.5 ? 'url(#starPartialMask)' : undefined}
                />
            </>
        )}
    </svg>
)

const Circle = (props: RatingIndicatorProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={styles.Star}>
        <title>Circle</title>
        <circle fill="#d2d4d6" stroke="none" cx="24" cy="24" r="20" />
        {props.value > 0 && (
            <>
                <mask id="circlePartialMask">
                    <rect width="24" height="48" fill="white" />
                </mask>
                <circle fill="#ede809" stroke="none"
                        cx="24" cy="24" r="20"
                        mask={props.value === 0.5 ? 'url(#circlePartialMask)' : undefined}
                />
            </>
        )}
    </svg>
)

type RatingProps = {
    value: number;
    type: 'SELF' | 'USER'
}

export const Rating = (props: RatingProps) => {
    const Indicator = props.type === 'USER' ? Star : Circle
    return (
        <div className={styles.Rating} data-testid={`${props.type.toLowerCase()}_rating:${props.value}`}>
            {Array.from({ length: 5 }).map((_, index) => {
                let value: 0 | 0.5 | 1 = 0;
                if (index + 1 <= props.value) {
                    value = 1
                } else if (index + 1 > props.value && index < props.value) {
                    value = 0.5
                }
                return (
                    <div key={index}>
                        <Indicator value={value} />
                    </div>
                )
            })}
        </div>
    )
}
