import { wrap } from './utils';
import observedAttributesTInput from './components/t-input/t-input.observed-attributes';
import observedAttributesTTextArea from './components/t-text-area/t-text-area.observed-attributes';
customElements.define('t-input', wrap(()=>import('./components/t-input/t-input.component'), 'TInput', observedAttributesTInput));
customElements.define('t-text-area', wrap(()=>import('./components/t-text-area/t-text-area.component'), 'TTextArea', observedAttributesTTextArea));
