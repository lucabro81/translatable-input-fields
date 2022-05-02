import { wrap } from '../../utils';
import observedAttributesTInputSlot from './t-input-slot.observed-attributes';

export const tInputSlotDefine = () => customElements.define('t-input-slot', wrap(()=>import('./t-input-slot.component'), 'TInputSlot', observedAttributesTInputSlot));