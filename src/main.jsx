import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/bodoni-moda/opsz.css';
import '@fontsource-variable/bodoni-moda/opsz-italic.css';
import '@fontsource-variable/archivo/index.css';
import './styles.css';
import { App, NotFound } from './App.jsx';

const root = document.getElementById('root');
const page = document.body.dataset.page === '404' ? <NotFound /> : <App />;
hydrateRoot(root, <StrictMode>{page}</StrictMode>);
