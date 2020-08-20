import React, {useEffect, useRef} from "react";
import styles from './style.module.css'
import useClickOutsideAction from '../../utils/useClickOutsideAction';

export default function RightClickMenu({toggleMenuVisibility, toggleAddNewDirectory, toggleAddImage}) {

    const wrapperRef = useRef(null);

    function handleClick(e, data) {
        alert(`Clicked on menu ${data.item}`);
    }

    useClickOutsideAction(wrapperRef, toggleMenuVisibility);

    return (
        <div ref={wrapperRef} className={styles.container}>
            <div className={styles.menu}>
                <div
                    onClick={toggleAddNewDirectory}
                    className={styles.menuItem}
                >
                    Create directory
                </div>
                <div
                    onClick={toggleAddImage}
                    className={styles.menuItem}
                >
                    Add image
                </div>
            </div>
        </div>
    );
}
