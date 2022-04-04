import html from "./t-input.html";
import style from "./styles/main.css";
import { Component } from '@/utils';
import {
  BTN_LANG,
  BTN_LANG_POSITION_ALIGN_LEFT,
  BTN_LANG_POSITION_ALIGN_RIGHT,
  BTN_LANG_POSITION_BOTTOM,
  BTN_LANG_POSITION_LEFT, BTN_LANG_POSITION_LEFT_INSET,
  BTN_LANG_POSITION_RIGHT, BTN_LANG_POSITION_RIGHT_INSET,
  BTN_LANG_POSITION_TOP,
  BTN_LANG_SELECTED, BTN_LANG_SPACER_LEFT, BTN_LANG_SPACER_RIGHT,
} from '@/components/t-input/keys';

interface IModel {[key: string]: string}

@Component({
  html: html,
  style: style,
  properties: ["model", "defaultLang", "listedLang"]
})
export class TInput implements IWebComponent {

  private container!: HTMLElement | null;
  private inputLabel!: HTMLElement | null;
  private inputPart!: HTMLElement | null;
  private actionPart!: HTMLElement | null;
  private inputField!: HTMLInputElement | null;
  private langList!: HTMLElement | null;

  private isValueChangedInternally: boolean = false;
  private currLang: string = "";
  private langArr: Array<string> = [];

  private _defaultLang: string = "";
  private _model: IModel = {} as IModel;
  private _positionClasses: Array<string> = [BTN_LANG_POSITION_BOTTOM, BTN_LANG_POSITION_ALIGN_RIGHT];
  private _isInset = false;
  private _langBtnPositionString = "";

  /*********** defaultLang ***********/

  set defaultLang(value: string) {
    this._defaultLang = value;
    this.currLang = value;
  }

  get defaultLang() {
    return this._defaultLang;
  }

  /*********** /defaultLang ***********/

  /*********** btn-position ***********/

  set btnPosition(value: string) {
    this._langBtnPositionString = value;
    switch(value) {
      case "top|left":
        this._positionClasses = [BTN_LANG_POSITION_TOP, BTN_LANG_POSITION_ALIGN_LEFT];
        break;
      case "top":
      case "top|right":
        this._positionClasses = [BTN_LANG_POSITION_TOP, BTN_LANG_POSITION_ALIGN_RIGHT]
        break;
      case "bottom|left":
        this._positionClasses = [BTN_LANG_POSITION_BOTTOM, BTN_LANG_POSITION_ALIGN_LEFT];
        break;
      case "bottom":
      case "bottom|right":
        this._positionClasses = [BTN_LANG_POSITION_BOTTOM, BTN_LANG_POSITION_ALIGN_RIGHT];
        break;
      case "left|inset":
        this._isInset = true;
        this._positionClasses = [BTN_LANG_POSITION_LEFT_INSET];
        break;
      case "left":
      case "left|outset":
        this._isInset = false;
        this._positionClasses = [BTN_LANG_POSITION_LEFT];
        break;
      case "right|inset":
        this._isInset = true;
        this._positionClasses = [BTN_LANG_POSITION_RIGHT_INSET];
        break;
      case "right":
      case "right|outset":
        this._isInset = false;
        this._positionClasses = [BTN_LANG_POSITION_RIGHT];
        break;
    }

  }

  /*********** /btn-position ***********/

  /*********** model ***********/

  get model(): IModel {
    return this._model;
  }

  set model(value: IModel) {
    this._model = value;
    if (this.inputField) {
      this.inputField.value = value[this.currLang];
      this.$host.dispatchEvent(new CustomEvent("input", {detail: this.inputField.value}));
    }
  }

  /*********** /model ***********/

  constructor(private $el: HTMLElement, private $host: Element) {}

  connectedCallback() {

    setTimeout(() => {
      if (!(this as any).defaultLang) {
        throw new Error("Default language needed");
      }

      this.container = this.$el?.querySelector('#container');
      this.inputLabel = this.$el?.querySelector("#input-label");
      this.inputPart = this.$el?.querySelector("#input-part");
      this.inputField = this.inputLabel?.getElementsByTagName('INPUT')[0] as HTMLInputElement;

      this.inputField?.addEventListener("input", this.onInput as EventListener);

      const isInset = this._langBtnPositionString.split("|")?.[1] === "inset";
      if (isInset) {
        this.inputPart?.classList.add(...this._positionClasses);
      }
      this.actionPart = this.$el?.querySelector(isInset ? "#action-part-row" : "#action-part");
      this.langList = this.$el?.querySelector(isInset ? "#lang-list-row" : "#lang-list");

      this.langArr = Object.keys(this.model);
      this.langArr.forEach((lang: string) => {
        const langBtn = document.createElement("button");
        langBtn.dataset.lang = lang;
        langBtn.innerText = lang;
        langBtn.classList.add(BTN_LANG);
        (lang === this.currLang) && langBtn.classList.add(BTN_LANG_SELECTED);
        langBtn.addEventListener("click", this.onBtnLang);
        this.langList?.appendChild(langBtn);
      });

      this.container?.classList.add(...this._positionClasses);

      if (this._langBtnPositionString === "right|outset" || this._langBtnPositionString === "right|inset") {
        this.actionPart?.classList.add(BTN_LANG_SPACER_LEFT);
      }

      if (this._langBtnPositionString === "left|outset" || this._langBtnPositionString === "left|inset") {
        this.actionPart?.classList.add(BTN_LANG_SPACER_RIGHT);
      }

    })
  }

  /**
   * Invoked each time the custom element is disconnected from the document"s DOM.
   */
  disconnectedCallback() {
    this.inputField?.removeEventListener("input", this.onInput as EventListener);
  }

  /**
   * Invoked each time the custom element is moved to a new document.
   */
  adoptedCallback() {
    console.log("moved");
  }

  /**
   * Invoked each time one of the custom element"s attributes is added, removed, or changed.
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

  // ########## PRIVATE ##########

  private onInput = (evt: InputEvent) => {
    evt.stopPropagation();
    this.isValueChangedInternally = true;
    this.model = Object.assign({}, this._model, {[this.currLang]: (evt?.target as HTMLInputElement).value});
  }

  private onBtnLang = (evt: MouseEvent) => {
    this.currLang = (evt.target as HTMLElement)?.dataset.lang || "";
    Array.from(this.langList?.getElementsByTagName('BUTTON') || [])
      .forEach((btn: Element) => {
        const btnHtmlElement = btn as HTMLElement;
        if (btnHtmlElement?.dataset.lang === this.currLang) {
          btnHtmlElement.classList.add(BTN_LANG_SELECTED)
        }
        else {
          btnHtmlElement.classList.remove(BTN_LANG_SELECTED);
        }
      });
    if (this.inputField) {
      this.inputField.value = this.model[this.currLang];
    }
  }

}

// Ref.: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
