import { combineReducers } from "redux";
import Gallery from './gallery/reducer';

const rootReducer = combineReducers({
    gallery: Gallery,
});

export default rootReducer;
