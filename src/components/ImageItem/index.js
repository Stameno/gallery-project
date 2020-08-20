import React from 'react'
import styles from './style.module.css'

export default function ImageItem({ title, image, landscape, setActiveImage }) {
    return (
        <div onClick={() => setActiveImage(title, landscape)} className={styles.container}>
            <img src={image}/>
            <span>{title}</span>
        </div>
    );
};
