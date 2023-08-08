class AdzTooltip extends HTMLElement {
  private _tooltipIcon!: HTMLSpanElement
  private _tooltipContainer!: HTMLDivElement
  private _tooltipText: string

  constructor() {
    super()
    this._tooltipText = 'Lorem ipsum dolor sit amet'
    this.attachShadow({ mode: 'open' })
    this.shadowRoot!.innerHTML = `
      <style>
        div {
          background: black;
          color: white;
          position: absolute;
          z-index: 10;
          width: 150px;
        }
      </style>
      <slot>Some default text</slot>
      <span> (?)</span>
    `
  }

  connectedCallback() {
    if (this.hasAttribute('tooltip-text')) {
      this._tooltipText = this.getAttribute('tooltip-text')!
    }

    this.style.position = 'relative'
    this._tooltipIcon = this.shadowRoot!.querySelector<HTMLSpanElement>('span')!
    this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
    this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
    this.shadowRoot!.appendChild(this._tooltipIcon)
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div')
    this._tooltipContainer.textContent = this._tooltipText
    this.shadowRoot!.appendChild(this._tooltipContainer)
  }

  _hideTooltip() {
    this.shadowRoot!.removeChild(this._tooltipContainer)
  }
}

customElements.define('adz-tooltip', AdzTooltip)
