import toastReducer from './toastReducer';
import sidebarReducer from './sidebarReducer';
import { combineReducers} from 'redux';

const uiReducer = combineReducers({
    toast: toastReducer,
    sidebar: sidebarReducer
});

export default uiReducer;