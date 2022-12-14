import React, {ComponentProps} from 'react';
import styles from './PropertyListItem.module.css';
import {Rating} from "./Rating";

type PropertyListItemProps = {
    address: string;
    badge: string;
    cancellationOption?: string;
    currency: string;
    image: {
        src: string;
        alt: string;
    };
    title: string;
    offerPrice: number;
    offerSavings?: number;
    offerTitle: string;
    ratingValue: number;
    ratingType: ComponentProps<typeof Rating>['type'];
    testId: string;
}

export const PropertyListItem = (props: PropertyListItemProps) => {
    return (
        <div className={styles.PropertyListItem} data-testid={props.testId}>
            <img
                src={props.image.src}
                alt={props.image.alt}
                className={styles.image}
            />

            <div className={styles.content}>
                <div className={styles.offerHeader}>
                    <h2 className={styles.title}>{props.title}</h2>
                    <Rating value={props.ratingValue} type={props.ratingType} />
                </div>
                <div className={styles.address}>{props.address}</div>

                <div className={styles.offerDetails}>
                    <div className={styles.offerLabels}>
                        <div className={styles.offerTitle}>{props.offerTitle}</div>
                        {props.cancellationOption && (
                            <div className={styles.cancellationOption}>
                                {props.cancellationOption}
                            </div>
                        )}
                    </div>
                    <div className={styles.offerPricing}>
                        <div className={styles.offerPrefix}>1 night total ({props.currency})</div>
                        <div className={styles.offerPrice}>
                            <sup className={styles.currencySymbol}>$</sup>
                            {props.offerPrice}
                        </div>
                        <div className={styles.offerSavings}>
                            {props.offerSavings && <>Save ${props.offerSavings}~</>}
                            {!props.offerSavings && <>&nbsp;</>}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.badge}>
                {props.badge}
            </div>
        </div>
    )
}
