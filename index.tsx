import registerRootComponent from 'expo/build/launch/registerRootComponent';
import axios from 'axios';
axios.defaults.baseURL = 'https://us-central1-alocacao-wise.cloudfunctions.net/';

import App from './App';

registerRootComponent(App);
