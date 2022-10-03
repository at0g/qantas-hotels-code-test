import React from 'react'
import styles from './OneCol.module.css'

type OneColProps = {
    children: React.ReactNode;
    header?: React.ReactNode;
}

export const OneCol = (props: OneColProps) => {
    return (
        <div className={styles.container}>
            <header>
                <img
                    alt="Qantas"
                    src="/qantas-logo.png"
                    className={styles.logo}
                />
                {props.header}
            </header>
            <main>
            {props.children}
            </main>
        </div>
    )
}
