import { combineReducers} from 'redux';
import userReducer from './user/reducers/userReducer';
import uiReducer from './ui/reducers/uiReducer';
import tempReducer from './temp/reducers/tempReducer';
import authReducer from './auth/reducers/authReducer';
import organizacaoReducer from './organizacao/reducers/organizacaoReducer';
// import tempReducer from './tempReducer';
// import organizacaoReducer from './temp/organizacaoReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    ui: uiReducer,
    organizacao: organizacaoReducer,
    temp: tempReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>