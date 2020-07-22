import React from 'react';
import { render } from 'react-dom';
import '~/assets/css/main.css';
import {} from 'styled-components/cssprop';
import 'react-toastify/dist/ReactToastify.css';
import App from '~/app';

const rootEl: HTMLElement = document.getElementById('app')!; // don't worry ts ^^@

render(<App />, rootEl);
