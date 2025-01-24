class SummaryComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.productsInCart = []; // Lista para almacenar los productos añadidos
    this.invoiceNumber = this.generateInvoiceNumber(); // Generar un número de factura único
    this.render();
  }

  connectedCallback() {
    window.addEventListener("addToCart", this.addProductToCart.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener("addToCart", this.addProductToCart.bind(this));
  }

  generateInvoiceNumber() {
    return `FAC-${Math.floor(Math.random() * 1000000)}`;
  }

  addProductToCart(event) {
    const { productId, productName, productValue, productQuantity } = event.detail;

    // Validaciones
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
      this.productsInCart.push({
        productId,
        productName,
        productValue: productValueNum,
        productQuantity: productQuantityNum,
        subtotal: productValueNum * productQuantityNum,
      });
    }

    console.log("Carrito actualizado:", this.productsInCart);
    this.render();
  }

  removeProduct(productId) {
    this.productsInCart = this.productsInCart.filter((product) => product.productId !== productId);
    console.log("Producto eliminado. Carrito:", this.productsInCart);
    this.render();
  }

  render() {
    let tableContent = '';
    let subtotal = 0;
    if (this.productsInCart.length > 0) {
      // Calcular subtotal
      subtotal = this.productsInCart.reduce((acc, product) => acc + product.subtotal, 0);

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
                  <td>${product.productValue}</td>
                  <td>${product.productQuantity}</td>
                  <td>${product.subtotal}</td>
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
      tableContent = `<p>No hay productos en el carrito.</p>`;
    }

    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    this.shadowRoot.innerHTML = /*html*/ `
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
      <div class="container mt-4">
        <h2>Resumen del Carrito</h2>
        ${tableContent}
        <div class="mt-3 text-center">
          <table class="table w-50 mx-auto">
            <tbody>
              <tr>
                <td><strong>Subtotal:</strong></td>
                <td>$${subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td><strong>IVA (19%):</strong></td>
                <td>$${iva.toFixed(2)}</td>
              </tr>
              <tr>
                <td><strong>Total:</strong></td>
                <td>$${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <button class="btn btn-success" id="payButton">Pagar</button>
        </div>
      </div>
    `;

    const removeButtons = this.shadowRoot.querySelectorAll(".remove-btn");
    if (removeButtons) {
      removeButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          const productId = e.target.getAttribute("data-id");
          this.removeProduct(productId);
        });
      });
    }
    const payButton = this.shadowRoot.querySelector("#payButton");
    if (payButton) {
      payButton.addEventListener("click", this.handlePay.bind(this));
    }
  }

  handlePay() {
    if (this.productsInCart.length === 0) {
      alert("No hay productos en el carrito para pagar.");
      return;
    }

    const subtotal = this.productsInCart.reduce((acc, product) => acc + product.subtotal, 0);
    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    const productsDetails = this.productsInCart
      .map(
        (product) => `Producto: ${product.productName}, Cantidad: ${product.productQuantity}, Subtotal: $${product.subtotal.toFixed(2)}`
      )
      .join('\n');

    const message = `Factura: ${this.invoiceNumber}\n\n` +
      `Productos Comprados:\n${productsDetails}\n\n` +
      `Subtotal: $${subtotal.toFixed(2)}\n` +
      `IVA (19%): $${iva.toFixed(2)}\n` +
      `Total: $${total.toFixed(2)}\n\n¡Gracias por su compra!`;

    alert(message);
    this.productsInCart = []; // Vaciar el carrito después de pagar
    this.render();
  }
}
customElements.define('summary-component', SummaryComponent);
