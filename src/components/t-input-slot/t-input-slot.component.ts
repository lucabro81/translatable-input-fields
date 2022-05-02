import html from './t-input-slot.html';
import style from './styles/main.css';
import { Component } from "@/utils";

@Component({
    html: html,
    style: style,
	  properties: []
})
export class TInputSlot implements IWebComponent {

	static observedAttributes() {
    // return an array containing the names of the attributes you want to observe
	}

  constructor(private $el: HTMLElement, private $host: Element) {}

  /**
   * Invoked each time the custom element is appended into a document-connected element.
   * This will happen each time the node is moved, and may happen before the element's contents have been fully parsed.
   */
  connectedCallback() {
    console.log('t-input-slot connected');
  }

  /**
   * Invoked each time the custom element is disconnected from the document's DOM.
   */
  disconnectedCallback() {
    console.log('t-input-slot disconnected');
  }

  /**
   * Invoked each time the custom element is moved to a new document.
   */
  adoptedCallback() {
    console.log('t-input-slot moved');
  }

  /**
   * Invoked each time one of the custom element's attributes is added, removed, or changed.
   * Which attributes to notice change for is specified in a static get observedAttributes method
   *
   * @param name
   * @param oldValue
   * @param newValue
   */
  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
     const nameProp = name.replace(/-[a-zA-Z]/g, (found: string) => found.slice(1).toUpperCase());
     (this as any)[nameProp] = newValue;
  }

}

// Ref.: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements