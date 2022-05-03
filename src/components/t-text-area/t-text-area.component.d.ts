export interface TTextArea {
	defaultLang: string;
	model: any;
	connectedCallback(): void;
	disconnectedCallback(): void;
	adoptedCallback(): void;
	attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
}

//@ts-ignore
declare global {
	interface HTMLElementTagNameMap {
		"t-text-area": TTextArea;
	}
}