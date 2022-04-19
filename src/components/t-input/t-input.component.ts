import html from "./t-input.html";
import style from "./styles/main.css";
import { Component } from '@/utils';
import { CSSClasses, Tags } from '@/components/t-input/keys';

interface IModel {[key: string]: string}

@Component({
  html: html,
  style: style,
  properties: ["model", "defaultLang", "listedLang", "placeholder"]
})
export class TInput implements IWebComponent {

  private container!: HTMLElement | null;
  private inputLabel!: HTMLElement | null;
  private inputPart!: HTMLElement | null;
  private actionPart!: HTMLElement | null;
  private inputField!: HTMLInputElement | null;
  private langList!: HTMLElement | null;
  private selectHiddenBtn!: HTMLElement | null;
  private hiddenLangListCont!: HTMLElement | null;

  private isValueChangedInternally: boolean = false;
  private currLang: string = "";

  private _defaultLang: string = "";
  private _placeholder: string = "";
  private _model: IModel = {} as IModel;
  private _positionClasses: Array<string> =
    [CSSClasses.BTN_LANG_POSITION_BOTTOM, CSSClasses.BTN_LANG_POSITION_ALIGN_RIGHT];
  private _isInset = false;
  private _langBtnPositionString = "";
  private _listedLang: Array<Record<string, boolean>> = [];

  set placeholder(value: string) {
    this._placeholder = value;
  }

  get placeholder(): string {
    return this._placeholder;
  }

  /*********** defaultLang ***********/

  set defaultLang(value: string) {
    this._defaultLang = value;
    this.currLang = value;
  }

  get defaultLang(): string {
    return this._defaultLang;
  }

  /*********** /defaultLang ***********/

  /*********** btn-position ***********/

  set btnPosition(value: string) {
    this._langBtnPositionString = value;
    switch(value) {
      case "top|left":
        this._positionClasses = [CSSClasses.BTN_LANG_POSITION_TOP, CSSClasses.BTN_LANG_POSITION_ALIGN_LEFT];
        break;
      case "top":
      case "top|right":
        this._positionClasses = [CSSClasses.BTN_LANG_POSITION_TOP, CSSClasses.BTN_LANG_POSITION_ALIGN_RIGHT]
        break;
      case "bottom|left":
        this._positionClasses = [CSSClasses.BTN_LANG_POSITION_BOTTOM, CSSClasses.BTN_LANG_POSITION_ALIGN_LEFT];
        break;
      case "bottom":
      case "bottom|right":
        this._positionClasses = [CSSClasses.BTN_LANG_POSITION_BOTTOM, CSSClasses.BTN_LANG_POSITION_ALIGN_RIGHT];
        break;
      case "left|inset":
        this._isInset = true;
        this._positionClasses = [CSSClasses.BTN_LANG_POSITION_LEFT_INSET];
        break;
      case "left":
      case "left|outset":
        this._isInset = false;
        this._positionClasses = [CSSClasses.BTN_LANG_POSITION_LEFT];
        break;
      case "right|inset":
        this._isInset = true;
        this._positionClasses = [CSSClasses.BTN_LANG_POSITION_RIGHT_INSET];
        break;
      case "right":
      case "right|outset":
        this._isInset = false;
        this._positionClasses = [CSSClasses.BTN_LANG_POSITION_RIGHT];
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

  /*********** listedLang ***********/

  get listedLang(): Array<Record<string, boolean>> {
    return this._listedLang;
  }

  set listedLang(value: Array<Record<string, boolean>>) {
    this._listedLang = value;
  }

  /*********** /listedLang ***********/

  constructor(private $el: HTMLElement, private $host: Element) {}

  connectedCallback() {

    setTimeout(() => {
      if (!(this as any).defaultLang) {
        throw new Error("Default language needed");
      }

      this.container = this.$el?.querySelector('#container');
      this.inputLabel = this.$el?.querySelector("#input-label");
      this.inputPart = this.$el?.querySelector("#input-part");
      this.inputField = this.inputLabel?.getElementsByTagName(Tags.INPUT_TAG)[0] as HTMLInputElement;

      this.inputField?.addEventListener("input", this.onInput as EventListener);

      const isInset = this._langBtnPositionString.split("|")?.[1] === "inset";

      if (isInset) {
        this.inputPart?.classList.add(...this._positionClasses);
      }
      this.actionPart = this.$el?.querySelector(isInset ? "#action-part-row" : "#action-part");
      this.langList = this.$el?.querySelector(isInset ? "#lang-list-row" : "#lang-list");
      this.$el?.querySelector(!isInset ? "#action-part-row" : "#action-part")?.remove();
      this.$el?.querySelector(!isInset ? "#lang-list-row" : "#lang-list")?.remove();

      // if (this.listedLang.some((lang: Record<string, boolean>) => lang[Object.keys(lang)[0]])) {
        this.selectHiddenBtn = this.$el?.querySelector(isInset ? "#btn-select-hidden-lang-row" : "#btn-select-hidden-lang");
        this.hiddenLangListCont = this.$el?.querySelector(isInset ? "#hidden-lang-list-row" : "#hidden-lang-list");
        this.selectHiddenBtn?.addEventListener("click", this.onShowHiddenLang as EventListener);
      // }

      const selectHiddenBtnHHeight = (this.selectHiddenBtn?.offsetParent as HTMLElement)?.offsetHeight || 0;
      let heightMultiplier = 0;
      this.listedLang.forEach((lang: Record<string, boolean>) => {
        const langBtn = document.createElement("button");
        const key = Object.keys(lang)[0];
        langBtn.dataset.lang = key;
        langBtn.innerText = key;
        if (lang[key]) {
          langBtn.classList.add(CSSClasses.BTN_LANG);
          langBtn.addEventListener("click", this.onBtnLang);
          this.langList?.appendChild(langBtn);
        }
        else {
          if (this.hiddenLangListCont) {
            langBtn.dataset.hidden = "1";
            langBtn.classList.add(CSSClasses.BTN_LANG_HDN);
            langBtn.addEventListener("click", this.onBtnLang);
            const listElem = document.createElement("li");
            listElem.appendChild(langBtn)
            this.hiddenLangListCont.appendChild(listElem);
            if (this.selectHiddenBtn) {
              this.selectHiddenBtn.classList.add(CSSClasses.BTN_LANG_SELECTED);
              this.selectHiddenBtn.innerText = this.currLang;
            }
            heightMultiplier++;
          }
        }
        (key === this.currLang) && langBtn.classList.add(CSSClasses.BTN_LANG_SELECTED);
      });

      if (this.hiddenLangListCont) {
        this.hiddenLangListCont.style.height = (selectHiddenBtnHHeight*heightMultiplier)+'px';
      }

      this.container?.classList.add(...this._positionClasses);

      if (this._langBtnPositionString === "right|outset" || this._langBtnPositionString === "right|inset") {
        this.actionPart?.classList.add(CSSClasses.BTN_LANG_SPACER_LEFT);
      }

      if (this._langBtnPositionString === "left|outset" || this._langBtnPositionString === "left|inset") {
        this.actionPart?.classList.add(CSSClasses.BTN_LANG_SPACER_RIGHT);
      }

      this.inputField.value = this.model[this.currLang];
      this.inputField.placeholder = this._placeholder;

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

  private onShowHiddenLang = (evt: InputEvent) => {
    this.hiddenLangListCont && this.hiddenLangListCont.classList.toggle(CSSClasses.HIDDEN_BTN_HIDE);
  }

  private onBtnLang = (evt: MouseEvent) => {
    const isHidden = (evt.target as HTMLElement)?.dataset.hidden === "1";
    this.currLang = (evt.target as HTMLElement)?.dataset.lang || "";
    Array.from(this.langList?.getElementsByTagName(Tags.BUTTON_TAG) || [])
      .forEach((btn: ChildNode) => {
        const btnHtmlElement = btn as HTMLElement;
        if (btnHtmlElement?.dataset.lang === this.currLang) {
          btnHtmlElement.classList.add(CSSClasses.BTN_LANG_SELECTED)
        }
        else {
          btnHtmlElement.classList.remove(CSSClasses.BTN_LANG_SELECTED);
        }
      });
    if (this.selectHiddenBtn) {
      if (isHidden) {
        this.selectHiddenBtn.classList.add(CSSClasses.BTN_LANG_SELECTED);
        this.selectHiddenBtn.innerText = this.currLang;
      } else {
        this.selectHiddenBtn.classList.remove(CSSClasses.BTN_LANG_SELECTED);
        this.selectHiddenBtn.innerText = '...';
      }
      this.hiddenLangListCont && this.hiddenLangListCont.classList.add(CSSClasses.HIDDEN_BTN_HIDE);
    }
    if (this.inputField) {
      this.inputField.value = this.model[this.currLang];
    }
  }

}

// Ref.: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
