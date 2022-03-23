import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

window.apibase = 'http://localhost:8080/';
window.UnixToTimestamp = (unix) => {
    let date = new Date(unix);
    return date.getTime();
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);