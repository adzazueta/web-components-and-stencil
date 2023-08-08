class AdzConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener('click', (event) => {
      if (!confirm('Do you really want to leave?')) {
        event.preventDefault()
      }
    })
  }
}

customElements.define('adz-confirm-link', AdzConfirmLink, { extends: 'a' })
