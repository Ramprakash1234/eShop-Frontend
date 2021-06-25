import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css'
import {createStore} from 'redux'
import reportWebVitals from './reportWebVitals';
import rootReducer from './reducers/rootReducer';

const store=createStore(rootReducer)
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
/**/
