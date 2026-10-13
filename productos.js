// Configuración general
const CONFIG = {
  // Números de WhatsApp con prefijo de país, sin "+" ni espacios.
  // Cada producto indica en "contacto" a quién se le escribe.
  whatsapp: {
    vicente: "56953708223",
    ignacio: "", // pendiente
  },
  moneda: "$",
};

// Listado de productos.
// - fotos: rutas dentro de img/productos/ (la primera es la portada).
//   Se preparan con: swift scripts/foto.swift original.heic img/productos/<id>/1.jpg
// - entrega: dónde se retira o entrega
// - contacto: "vicente" o "ignacio" (a quién le llega el WhatsApp)
// - vendido: true para marcarlo como vendido
const PRODUCTOS = [
  {
    id: "banca-perjohan",
    nombre: "Banca PERJOHAN",
    marca: "IKEA",
    precio: 27000,
    descripcion: "Banca con almacenaje, pino, 100 cm. Pintada.",
    medidas: "100 cm de largo",
    estado: "No presenta mayores detalles de uso",
    entrega: "Retiro en Providencia",
    fotos: [
      "img/productos/banca-perjohan/1.jpg",
      "img/productos/banca-perjohan/2.jpg",
      "img/productos/banca-perjohan/3.jpg",
      "img/productos/banca-perjohan/4.jpg",
    ],
    contacto: "vicente",
    vendido: true,
  },
  {
    id: "set-cubiertos",
    nombre: "Set de cubiertos",
    marca: "IKEA",
    precio: 10000,
    descripcion: "Set de 6.",
    medidas: "",
    estado: "",
    entrega: "Retiro en Providencia o entrega en metro Tobalaba, Los Leones o Cristóbal Colón",
    fotos: [
      "img/productos/set-cubiertos/1.jpg",
      "img/productos/set-cubiertos/2.jpg",
    ],
    contacto: "vicente",
    vendido: false,
  },
  {
    id: "bowl-ceramica",
    nombre: "Bowl",
    marca: "",
    precio: 3000,
    descripcion: "Bowl de cerámica.",
    medidas: "15 cm de diámetro",
    estado: "",
    entrega: "Retiro en Providencia o entrega en metro Tobalaba, Los Leones o Cristóbal Colón",
    fotos: [
      "img/productos/bowl-ceramica/1.jpg",
      "img/productos/bowl-ceramica/2.jpg",
      "img/productos/bowl-ceramica/3.jpg",
    ],
    contacto: "vicente",
    vendido: false,
  },
  {
    id: "set-individuales",
    nombre: "Set de individuales",
    marca: "H&M Home",
    precio: 5000,
    descripcion: "Set de 5: 3 negros y 2 beige.",
    medidas: "",
    estado: "",
    entrega: "Retiro en Providencia o entrega en metro Tobalaba, Los Leones o Cristóbal Colón",
    fotos: [
      "img/productos/set-individuales/1.jpg",
      "img/productos/set-individuales/2.jpg",
    ],
    contacto: "vicente",
    vendido: false,
  },
  {
    id: "estanteria-bano",
    nombre: "Estantería de baño",
    marca: "IKEA",
    precio: 18000,
    descripcion: "Estantería esquinera de 3 repisas.",
    medidas: "",
    estado: "",
    entrega: "Retiro en Providencia",
    fotos: [
      "img/productos/estanteria-bano/1.jpg",
      "img/productos/estanteria-bano/2.jpg",
      "img/productos/estanteria-bano/3.jpg",
    ],
    contacto: "vicente",
    vendido: false,
  },
  {
    id: "piso-kyrre",
    nombre: "Piso KYRRE",
    marca: "IKEA",
    precio: 12000,
    descripcion: "Azul.",
    medidas: "",
    estado: "",
    entrega: "Retiro en Providencia",
    fotos: [
      "img/productos/piso-kyrre/1.jpg",
      "img/productos/piso-kyrre/2.jpg",
    ],
    contacto: "vicente",
    vendido: false,
  },
  {
    id: "mesa-gladom",
    nombre: "Mesa GLADOM",
    marca: "IKEA",
    precio: 8000,
    descripcion: "Mesa lateral con bandeja, negro.",
    medidas: "45 × 53 cm",
    estado: "",
    entrega: "Retiro en Providencia",
    fotos: [
      "img/productos/mesa-gladom/1.jpg",
      "img/productos/mesa-gladom/2.jpg",
    ],
    contacto: "vicente",
    vendido: false,
  },
  {
    id: "mueble-hyllis",
    nombre: "Mueble HYLLIS",
    marca: "IKEA",
    precio: 8000,
    descripcion: "Pintado burdeo.",
    medidas: "",
    estado: "",
    entrega: "Retiro en Providencia",
    fotos: [
      "img/productos/mueble-hyllis/1.jpg",
      "img/productos/mueble-hyllis/2.jpg",
    ],
    contacto: "vicente",
    vendido: true,
  },
];
