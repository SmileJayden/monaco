import React from 'react';
import { render } from 'react-dom';
import App from '~/app';

const rootEl: HTMLElement = document.getElementById('app')!; // don't worry ts ^^@

render(<App />, rootEl);
