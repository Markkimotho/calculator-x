import {home} from './ui/home.js';
import {calculatorPage} from './ui/calculator.js';
if(document.body.dataset.slug)calculatorPage(document.body.dataset.slug);
else home();
