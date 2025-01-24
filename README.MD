# Supermercado Web App

## Descripción
Esta es una aplicación web de supermercado responsiva desarrollada en JavaScript que utiliza componentes personalizados. Permite a los usuarios gestionar sus datos, añadir productos al carrito, eliminar productos y visualizar un resumen detallado de la compra con IVA incluido. Al finalizar la compra, se genera una "factura" que incluye el número de factura, los productos comprados, el subtotal, el IVA y el total.

---

## Características
- **Formulario de Usuario:** Los usuarios pueden ingresar sus datos personales (ID, nombre, dirección, correo electrónico, etc.).
- **Gestor de Carrito:**
  - Agregar hasta 50 productos al carrito.
  - Eliminar productos del carrito.
  - Visualizar el subtotal, IVA (19%) y total.
- **Factura:**
  - Se genera un número único de factura.
  - Lista detallada de los productos comprados.
  - Subtotal, IVA y total.
- **Diseño Responsivo:** Compatible con dispositivos móviles, tabletas y computadoras de escritorio.

---

## Tecnologías Utilizadas
- **Lenguaje de Programación:** JavaScript (con uso de componentes personalizados).
- **Diseño y Estilo:**
  - Bootstrap 5 para el diseño responsivo.
  - CSS para personalización adicional.
- **Estructura Dinámica:** Shadow DOM para encapsulación de componentes.

---

## Uso de Componentes
- **UserComponent:**
  - Permite al usuario ingresar sus datos personales.
  - Datos como ID, nombre, apellidos, dirección y correo electrónico son requeridos.
- **SummaryComponent:**
  - Gestiona el carrito de compras.
  - Muestra el subtotal, IVA y total.
  - Genera una alerta final con los detalles de la compra.

---

## Funcionalidades Clave

### Agregar Productos
Los productos tinen unico ID y valor, el usuario puede añadir productos a su carrito dinamicamente.

### Eliminar Productos
Cada producto en el carrito tiene un botón de eliminar que actualiza el contenido dinámicamente.

### Generar Factura
Al presionar el botón "Pagar", se genera una alerta con:
- ID del cliente.
- Número de factura.
- Lista de productos comprados.
- Subtotal, IVA (19%) y total.


