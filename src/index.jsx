/* eslint-disable */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import {App} from './App.jsx';

//Enable React devtools
window.React = React;

ReactDOM.render(
<App />,
document.getElementById('cardsContent')
);
