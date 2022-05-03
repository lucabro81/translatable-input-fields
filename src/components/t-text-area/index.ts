import { wrap } from '../../utils';
import observedAttributesTTextArea from './t-text-area.observed-attributes';

export const tTextAreaDefine = () => customElements.define('t-text-area', wrap(()=>import('./t-text-area.component'), 'TTextArea', observedAttributesTTextArea));