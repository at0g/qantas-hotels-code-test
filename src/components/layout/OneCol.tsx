import React from 'react'
import styles from './OneCol.module.css'

type OneColProps = {
    children: React.ReactNode
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
            </header>
            <main>
            {props.children}
            </main>
        </div>
    )
}
