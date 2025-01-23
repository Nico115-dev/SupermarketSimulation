class UserComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = /*html*/ `
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <div class="container mt-4">
      <h2>Formulario de Información del Usuario</h2>
      <form id="userForm">
        <div class="mb-3">
          <label for="userId" class="form-label">ID</label>
          <input type="text" class="form-control" id="userId" placeholder="Ingrese su ID" required>
        </div>
        <div class="mb-3">
          <label for="userName" class="form-label">Nombre</label>
          <input type="text" class="form-control" id="userName" placeholder="Ingrese su nombre" required>
        </div>
        <div class="mb-3">
          <label for="userSurname" class="form-label">Apellidos</label>
          <input type="text" class="form-control" id="userSurname" placeholder="Ingrese sus apellidos" required>
        </div>
        <div class="mb-3">
          <label for="userAddress" class="form-label">Dirección</label>
          <input type="text" class="form-control" id="userAddress" placeholder="Ingrese su dirección" required>
        </div>
        <div class="mb-3">
          <label for="userEmail" class="form-label">Correo Electrónico</label>
          <input type="email" class="form-control" id="userEmail" placeholder="Ingrese su correo electrónico" required>
        </div>
        <div class="mb-3">
          <label for="invoiceNumber" class="form-label">Número de Factura</label>
          <input type="text" class="form-control" id="invoiceNumber" value="${this.generateInvoiceNumber()}" readonly>
        </div>
        <button type="submit" class="btn btn-primary">Enviar</button>
      </form>
    </div>
    `;
  }

  connectedCallback() {
    // Añadir un evento al formulario para capturar los datos al enviarlo
    this.shadowRoot.querySelector("#userForm").addEventListener("submit", this.handleSubmit.bind(this));
  }

  // Método para generar un número de factura único
  generateInvoiceNumber() {
    return `FAC-${Math.floor(Math.random() * 1000000)}`;
  }

  // Función para manejar el envío del formulario
  handleSubmit(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const userId = this.shadowRoot.querySelector("#userId").value;
    const userName = this.shadowRoot.querySelector("#userName").value;
    const userSurname = this.shadowRoot.querySelector("#userSurname").value;
    const userAddress = this.shadowRoot.querySelector("#userAddress").value;
    const userEmail = this.shadowRoot.querySelector("#userEmail").value;
    const invoiceNumber = this.shadowRoot.querySelector("#invoiceNumber").value;

    // Crear un objeto con los datos del usuario
    const userInfo = {
      userId,
      userName,
      userSurname,
      userAddress,
      userEmail,
      invoiceNumber
    };

    // Convertir el objeto a una cadena para mostrarlo en la alerta
    let userInfoString = "";
    for (let key in userInfo) {
      userInfoString += `${key}: ${userInfo[key]}\n`;
    }

    // Mostrar los datos en una alerta
    alert(`Información del Usuario:\n\n${userInfoString}`);
  }
}

customElements.define('user-component', UserComponent);
