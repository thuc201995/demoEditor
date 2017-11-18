import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Test from "./components/test";
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './index.css';

ReactDOM.render(<Test />, document.getElementById('root'));
registerServiceWorker();
