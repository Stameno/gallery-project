import React, {useState} from 'react'
import RightClickMenu from '../RightClickMenu';
import folderIcon from '../../../assets/folderIcon.png';
import styles from './style.module.css';
import CreateFolderItem from '../CreateFolderItem';

export default function FolderItem({title, children, addItem, id, addImage}) {

    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [createNewVisible, setCreateNewVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);



    function toggleContextMenu(event) {
        event ? event.preventDefault() : null;
        setContextMenuVisible(!contextMenuVisible)
    }

    function toggleAddNewDirectory() {
        setContextMenuVisible(false);
        setCreateNewVisible(!createNewVisible)
    }

    function createNewDirectory(item) {
        setCreateNewVisible(false)
        addItem(item)
    }

    function toggleAddImage() {
        setContextMenuVisible(false);
        addImage(id)
    }

    function toggleIsOpen() {
        setIsOpen(!isOpen)
    }

    return(
        <div>
            <div
                className={styles.container}
                onClick={toggleIsOpen}
                onContextMenu={(event) => toggleContextMenu(event)}
            >
                <img src={folderIcon}/>
                <div>{title}</div>
            </div>
            {contextMenuVisible ?
                <RightClickMenu
                    toggleMenuVisibility={() => toggleContextMenu()}
                    toggleAddNewDirectory={() => toggleAddNewDirectory()}
                    toggleAddImage={toggleAddImage}
                />
                : null}
                <div className={styles.createNewContainer}>
                    {createNewVisible ?
                        <CreateFolderItem
                            parentId={id}
                            toggleAddNewDirectory={toggleAddNewDirectory}
                            createNewDirectory={(item) => createNewDirectory(item)}
                        />
                        : null
                    }
                </div>
            <div style={{height: isOpen ? 'auto' : 0, overflow: 'hidden'}}>{children}</div>
        </div>
    )
}
