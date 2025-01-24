class SummaryComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.productsInCart = []; // Lista para almacenar los productos añadidos
    this.render();
  }

  connectedCallback() {
    // Escucha eventos globales para agregar productos
    window.addEventListener("addToCart", this.addProductToCart.bind(this));
  }

  disconnectedCallback() {
    // Limpia el evento global al desconectar el componente
    window.removeEventListener("addToCart", this.addProductToCart.bind(this));
  }

  // Método para agregar productos al carrito
  addProductToCart(event) {
    const { productId, productName, productValue, productQuantity } = event.detail;

    // Convertir valores a números y validar
    const productValueNum = parseFloat(productValue);
    const productQuantityNum = parseInt(productQuantity, 10);

    if (isNaN(productValueNum) || isNaN(productQuantityNum)) {
      console.error("Error: Los valores de producto o cantidad no son válidos.");
      return;
    }

    const existingProduct = this.productsInCart.find((p) => p.productId === productId);
    if (existingProduct) {
      // Si el producto ya existe en el carrito, actualizar cantidad y subtotal
      existingProduct.productQuantity += productQuantityNum;
      existingProduct.subtotal = existingProduct.productQuantity * existingProduct.productValue;
    } else {
      // Agregar un nuevo producto al carrito
      this.productsInCart.push({
        productId,
        productName,
        productValue: productValueNum,
        productQuantity: productQuantityNum,
        subtotal: productValueNum * productQuantityNum,
      });
    }

    console.log("Carrito actualizado:", this.productsInCart);
    this.render(); // Actualiza la interfaz
  }

  // Método para eliminar un producto del carrito
  removeProduct(productId) {
    this.productsInCart = this.productsInCart.filter((product) => product.productId !== productId);
    console.log("Producto eliminado. Carrito:", this.productsInCart);
    this.render(); // Actualiza la interfaz
  }

  // Renderizar el HTML dinámico
  render() {
    let tableContent = '';
    if (this.productsInCart.length > 0) {
      // Generar el contenido de la tabla si hay productos en el carrito
      tableContent = `
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Valor</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            ${this.productsInCart
              .map(
                (product) => `
                <tr>
                  <td>${product.productId}</td>
                  <td>${product.productName}</td>
                  <td>${product.productValue.toFixed(2)}</td>
                  <td>${product.productQuantity}</td>
                  <td>${product.subtotal.toFixed(2)}</td>
                  <td>
                    <button class="btn btn-danger btn-sm remove-btn" data-id="${product.productId}">X</button>
                  </td>
                </tr>
              `
              )
              .join('')}
          </tbody>
        </table>
      `;
    } else {
      // Mostrar mensaje cuando el carrito está vacío
      tableContent = `<p>No hay productos en el carrito.</p>`;
    }

    // Asignar el HTML al Shadow DOM
    this.shadowRoot.innerHTML = /*html*/ `
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
      <div class="container mt-4">
        <h2>Resumen del Carrito</h2>
        ${tableContent}
      </div>
    `;

    // Agregar eventos a los botones de eliminar, si existen
    const removeButtons = this.shadowRoot.querySelectorAll(".remove-btn");
    if (removeButtons) {
      removeButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          const productId = e.target.getAttribute("data-id");
          this.removeProduct(productId);
        });
      });
    }
  }
}

// Registrar el componente personalizado
customElements.define('summary-component', SummaryComponent);
