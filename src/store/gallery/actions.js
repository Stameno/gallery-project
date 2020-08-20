export function addItem(item) {
    return {
        type: "ADD_NEW_ITEM",
        payload: item
    };
}

export function removeItem(book) {
    // selectBook is an ActionCreator, it needs to return an action,
    // an object with a type property.
    return {
        type: "BOOK_SELECTED",
        payload: book
    };
}
