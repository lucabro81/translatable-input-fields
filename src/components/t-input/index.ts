import { wrap } from '@/utils';
import observedAttributesTInput from './t-input.observed-attributes';

export const tInputDefine = () => customElements.define('t-input', wrap(()=>import('./t-input.component'), 'TInput', observedAttributesTInput));