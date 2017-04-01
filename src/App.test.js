import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';

it('renders without crashing', () => {
    const mockStore = configureStore([]);
    const store = mockStore({});
    const div = document.createElement('div');

    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>, 
        div
    );
});