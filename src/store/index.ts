import { createStore, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';
import reducers from './reducers';
import { persistStore, persistReducer, PersistConfig} from 'redux-persist';
import {AsyncStorage} from 'react-native';


const persistConfig: PersistConfig<any> = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['ui', 'temp', 'auth']
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = applyMiddleware(thunk)(createStore)(persistedReducer);
const persistor = persistStore(store);


export { store, persistor}