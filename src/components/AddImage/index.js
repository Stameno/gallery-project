import React, {useState, useEffect} from 'react'
import useDebounce from '../../utils/useDebounce';
import styles from './style.module.css';
import confirmIcon from '../../../assets/confirm.png';
import declineIcon from '../../../assets/decline.png';

export default function AddImage({hideModal, addItem, parentId}) {

    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageTitle, setImageTitle] = useState('');


    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // API search function
    function searchCharacters(search) {
        return fetch(
            `https://api.pexels.com/v1/search?query=${search}`,
            {
                method: 'GET',
                headers: new Headers({
                    'Authorization': '563492ad6f9170000100000162bede319709427bae4caa4c060dbd04',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }),
            }
        )
            .then(r => r.json())
            .then(r => r.photos)
            .catch(error => {
                console.error(error);
                return [];
            });
    }

    useEffect(
        () => {
            if (debouncedSearchTerm) {
                setIsSearching(true);
                searchCharacters(debouncedSearchTerm).then(results => {
                    setIsSearching(false);
                    setResults(results);
                });
            } else {
                setResults([]);
            }
        },
        [debouncedSearchTerm]
    );

    function addImage(imageId, title) {
        const imageData = results.find(item => item.id === imageId);
        addItem({
            type: 'file',
            title: title,
            landscape: imageData.src.landscape,
            tiny: imageData.src.tiny,
            url: imageData.url,
            parentId: parentId
        });
        hideModal()
    }

    return(
        <div className={styles.container}>
            <h2>Search and select an image</h2>
            <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
            <div className={styles.imagesContainer}>
                {results.length > 0 ?
                    results.map(res =>
                        <div className={styles.imageContainer} onClick={() => setSelectedImage(res.id)} key={res.id}>
                            <img src={res.src.small}/>
                            {selectedImage === res.id ? <div className={styles.selectedOverlay}>selected</div> : null}
                        </div>)
                : <div style={{width: '100%'}}>No results</div> }
            </div>
            <div>Set image title</div>
            <input value={imageTitle} onChange={(event) => setImageTitle(event.target.value)}/>
            <div>
                <img onClick={() => addImage(selectedImage, imageTitle)} src={confirmIcon}/>
                <img onClick={hideModal} src={declineIcon}/>
            </div>
        </div>
    )
}
