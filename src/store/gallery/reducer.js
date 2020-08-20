
const initialState = {
    items: [
            {
               type: "folder",
               title: "root",
               id: 'rootFolder',
               children: [],
                parentId: null
           },
        ]
};

const Gallery = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_NEW_ITEM':
            return {
                ...state,
                items: [...state.items, action.payload]
            };
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: action.payload,
            };
        default:
            return state;
    }
};

export default Gallery;
