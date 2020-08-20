import React, {useState} from 'react'
import folderIcon from '../../../assets/folderIcon.png';
import styles from './style.module.css';
import confirmIcon from '../../../assets/confirm.png';
import declineIcon from '../../../assets/decline.png';
import shortid from 'shortid';

export default function CreateFolderItem({toggleAddNewDirectory, createNewDirectory, parentId}) {

    const [inputValue, setInputValue] = useState('')

    function cancel() {
        setInputValue('');
        toggleAddNewDirectory();
    }

    function confirm() {
        createNewDirectory({
            title: inputValue,
            id: shortid.generate(),
            type: "folder",
            children: [],
            parentId
        })
    }

    return(
        <div>
            <div className={styles.container}>
                <img src={folderIcon}/>
                <input value={inputValue} onChange={(event) => setInputValue(event.target.value)}/>
                <div>
                    <img onClick={confirm} src={confirmIcon}/>
                    <img onClick={cancel} src={declineIcon}/>
                </div>
            </div>
        </div>
    )
}
