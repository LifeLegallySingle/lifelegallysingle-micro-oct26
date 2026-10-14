import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App, NotFound } from './App.jsx';
export { llmsTxt } from './seo.js';
export { SITE } from './site.config.js';

export const render = () => renderToString(<StrictMode><App /></StrictMode>);
export const renderNotFound = () => renderToString(<StrictMode><NotFound /></StrictMode>);
