class ProductComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Cargar productos desde el archivo data.js
    import('../../data/data.js').then((module) => {
      this.productos = module.productos;
      this.render();
    });
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/ `
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
      <div class="container mt-4">
        <h2>Añadir Productos Al Carrito</h2>
        <form id="productForm">
          <div class="mb-3">
            <label for="productName" class="form-label">Seleccione un Producto</label>
            <select class="form-select" id="productName" required>
              <option value="" selected disabled>Elija un producto</option>
              ${this.productos
                .map(
                  (producto) => `<option value="${producto.id}">${producto.name}</option>`
                )
                .join('')}
            </select>
          </div>
          <div class="mb-3">
            <label for="productId" class="form-label">ID del Producto</label>
            <input type="text" class="form-control" id="productId" readonly>
          </div>
          <div class="mb-3">
            <label for="productValue" class="form-label">Valor del Producto</label>
            <input type="text" class="form-control" id="productValue" readonly>
          </div>
          <div class="mb-3">
            <label for="productQuantity" class="form-label">Cantidad</label>
            <input type="number" class="form-control" id="productQuantity" min="1" placeholder="Ingrese la cantidad" required>
          </div>
          <button type="submit" class="btn btn-primary">Agregar al Carrito</button>
        </form>
      </div>
    `;

    this.shadowRoot
      .querySelector("#productName")
      .addEventListener("change", this.handleProductChange.bind(this));
    this.shadowRoot
      .querySelector("#productForm")
      .addEventListener("submit", this.handleSubmit.bind(this));
  }

  handleProductChange(event) {
    const selectedId = parseInt(event.target.value, 10);
    const producto = this.productos.find((prod) => prod.id === selectedId);

    if (producto) {
      this.shadowRoot.querySelector("#productId").value = producto.id;
      this.shadowRoot.querySelector("#productValue").value = producto.value.toFixed(2);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  
    const productId = this.shadowRoot.querySelector("#productId").value;
    const productName = this.shadowRoot.querySelector("#productName").options[
      this.shadowRoot.querySelector("#productName").selectedIndex
    ].text;
    const productValue = parseFloat(this.shadowRoot.querySelector("#productValue").value);
    const productQuantity = parseInt(this.shadowRoot.querySelector("#productQuantity").value, 10);
  
    if (!productId || !productName || isNaN(productValue) || isNaN(productQuantity)) {
      alert("Por favor, seleccione un producto y asegúrese de que la cantidad sea válida.");
      return;
    }
  
    const total = productValue * productQuantity;
  
    window.dispatchEvent(
      new CustomEvent("addToCart", {
        detail: { productId, productName, productValue, productQuantity },
      })
    );
  
    alert(`Producto agregado:\n\n${productName}\nCantidad: ${productQuantity}\nTotal: $${total.toFixed(2)}`);
  

    this.shadowRoot.querySelector("#productForm").reset();
    this.shadowRoot.querySelector("#productName").selectedIndex = 0;
  }
  
}

customElements.define('product-component', ProductComponent);
