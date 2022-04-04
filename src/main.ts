import { wrap } from './utils';
import observedAttributesHelloworld from './components/hello-world/hello-world.observed-attributes';
import observedAttributesTInput from './components/t-input/t-input.observed-attributes';
customElements.define('hello-world', wrap(()=>import('./components/hello-world/hello-world.component'), 'HelloWorld', observedAttributesHelloworld));
customElements.define('t-input', wrap(()=>import('./components/t-input/t-input.component'), 'TInput', observedAttributesTInput));
