class UserComponent extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = /*html*/ `
      <style>
        @import url('components/ciudad/style.css');
      </style>
      <div class="container">

      </div>
    `;
    }
    connectedCallback() {

    }
  }
  
  customElements.define('detail-component', UserComponent);