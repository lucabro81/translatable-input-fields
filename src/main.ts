import { wrap } from './utils';
import observedAttributesTInput from './components/t-input/t-input.observed-attributes';
import observedAttributesTestDev from './components/test-dev/test-dev.observed-attributes';
customElements.define('t-input', wrap(()=>import('./components/t-input/t-input.component'), 'TInput', observedAttributesTInput));
customElements.define('test-dev', wrap(()=>import('./components/test-dev/test-dev.component'), 'TestDev', observedAttributesTestDev));
