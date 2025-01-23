class ProductComponent extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = /*html*/ `
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">
      <div class="container">

      </div>
    `;
    }
    connectedCallback() {

    }
  }
  
  customElements.define('product-component', ProductComponent);