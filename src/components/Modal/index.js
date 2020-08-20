import React from 'react'
import styles from './style.module.css';

export default function Modal(props) {
    return(
        <div className={styles.container}>
            {props.children}
        </div>
    )
}
