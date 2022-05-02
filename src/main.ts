import { wrap } from './utils';
import observedAttributesTInput from './components/t-input/t-input.observed-attributes';
import observedAttributesTInputSlot from './components/t-input-slot/t-input-slot.observed-attributes';
customElements.define('t-input', wrap(()=>import('./components/t-input/t-input.component'), 'TInput', observedAttributesTInput));
customElements.define('t-input-slot', wrap(()=>import('./components/t-input-slot/t-input-slot.component'), 'TInputSlot', observedAttributesTInputSlot));
