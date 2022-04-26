import { wrap } from './utils';
import observedAttributesTInput from './components/t-input/t-input.observed-attributes';
customElements.define('t-input', wrap(()=>import('./components/t-input/t-input.component'), 'TInput', observedAttributesTInput));
