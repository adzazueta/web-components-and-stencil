class AdzTooltip extends HTMLElement {
  private _tooltipIcon!: HTMLSpanElement
  private _tooltipContainer!: HTMLDivElement
  private _tooltipVisible: boolean = true
  private _tooltipText?: string

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          position: relative;
        }

        :host(.important) {
          background-color: var(--color-primary, #cccccc);
          padding: 0.15rem;
        }

        :host-context(p) {
          font-weight: bold;
        }

        div {
          font-weight: normal;
          background: black;
          color: white;
          position: absolute;
          top: 1.5rem;
          left: 1rem;
          z-index: 10;
          width: 150px;
          padding: 0.5rem;
          border-radius: 3px;
          box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.26);
        }

        .highlight {
          background-color: red;
        }

        ::slotted(.highlight) {
          border-bottom: 1px dotted red;
        }

        .icon {
          background: black;
          color: white;
          padding: 0.15rem 0.35rem;
          text-align: center;
          border-radius: 50%;
        }
      </style>
      <slot>Some default text</slot>
      <span class="icon">?</span>
    `
  }

  static get observedAttributes(): string[] {
    return ['tooltip-text'];
  }

  connectedCallback() {
    if (this.hasAttribute('tooltip-text')) {
      this._tooltipText = this.getAttribute('tooltip-text')!
    }

    this._tooltipIcon = this.shadowRoot!.querySelector<HTMLSpanElement>('span')!
    this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
    this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
  }

  attributeChangedCallback(attributeName: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return

    if (attributeName === 'tooltip-text') {
      this._tooltipText = newValue
    }
  }

  disconnectedCallback() {
    this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip.bind(this))
    this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip.bind(this))
  }

  _showTooltip() {
    this._tooltipVisible = true;
    this._render();
  }

  _hideTooltip() {
    this._tooltipVisible = false;
    this._render();
  }

  _render() {
    if (this._tooltipVisible) {
      this._tooltipContainer = document.createElement('div')
      this._tooltipContainer.textContent = this._tooltipText ?? 'Lorem ipsum dolor sit amet'
      this.shadowRoot!.appendChild(this._tooltipContainer)
    } else {
      this.shadowRoot!.removeChild(this._tooltipContainer)
    }
  }
}

customElements.define('adz-tooltip', AdzTooltip)
