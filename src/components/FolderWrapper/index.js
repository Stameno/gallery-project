import React from 'react';
import ImageItem from '../ImageItem';
import FolderItem from '../FolderItem';

export default function FolderWrapper({ data, addItem, removeItem, addImage, setActiveImage }) {
    // loop through the data
    return <div style={{paddingLeft: 20}}>{data.map(item => {
        // if its a file render <File />
        if (item.type === 'file') {
            return<ImageItem
                setActiveImage={setActiveImage}
                landscape={item.landscape}
                image={item.tiny}
                title={item.title}
            />;
        }
        // if its a folder render <Folder />
        if (item.type === 'folder') {
            return (
                <FolderItem
                    addImage={addImage}
                    addItem={addItem}
                    id={item.id}
                    title={item.title}
                >
                    {/* Call the <TreeRecursive /> component with the current item.children */}
                    <FolderWrapper
                        data={item.children}
                        addImage={addImage}
                        addItem={addItem}
                        removeItem={removeItem}
                        setActiveImage={setActiveImage}
                    />
                </FolderItem>
            );
        }
    })}
    </div>
};
