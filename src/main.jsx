import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/inter-tight/index.css';
import '@fontsource-variable/caveat/index.css';
import './styles.css';
import { App, NotFound } from './App.jsx';

const root = document.getElementById('root');
const page = document.body.dataset.page === '404' ? <NotFound /> : <App />;
hydrateRoot(root, <StrictMode>{page}</StrictMode>);
