import React from 'react';
import styles from './PropertyListItem.module.css';

type PropertyListItemProps = {
    address: string;
    badge: string;
    image: {
        src: string;
        alt: string;
    };
    title: string;
    offerTitle: string;
}

export const PropertyListItem = (props: PropertyListItemProps) => {
    return (
        <div className={styles.PropertyListItem}>
            <img
                src={props.image.src}
                alt={props.image.alt}
                className={styles.image}
            />

            <div className={styles.content}>
                <h2 className={styles.title}>{props.title}</h2>
                <div className={styles.address}>{props.address}</div>

                <div className={styles.offerDetails}>
                    <div className={styles.offerTitle}>{props.offerTitle}</div>
                </div>
            </div>

            <div className={styles.badge}>
                {props.badge}
            </div>
        </div>
    )
}
