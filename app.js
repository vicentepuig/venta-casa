(() => {
  const grid = document.getElementById("catalogo");
  const modal = document.getElementById("modal");
  const $ = (id) => document.getElementById(id);

  const precio = (p) =>
    typeof p === "number"
      ? CONFIG.moneda + p.toLocaleString("es-CL")
      : p || "";

  const escape = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  // Los vendidos van al final
  const productos = [...PRODUCTOS].sort((a, b) => Number(!!a.vendido) - Number(!!b.vendido));

  grid.innerHTML = productos
    .map((p) => {
      const foto = p.fotos && p.fotos[0];
      return `
        <button class="card${p.vendido ? " is-sold" : ""}" type="button" data-id="${escape(p.id)}">
          <span class="card__img">
            ${foto ? `<img src="${escape(foto)}" alt="${escape(p.nombre)}" loading="lazy">` : ""}
            ${p.vendido ? `<span class="tag">Vendido</span>` : ""}
          </span>
          <span class="card__name">${escape(p.nombre)}</span>
          <span class="card__brand">${escape(p.marca)}</span>
          <span class="card__price">${escape(precio(p.precio))}</span>
        </button>`;
    })
    .join("");

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) location.hash = card.dataset.id;
  });

  // Carrusel de fotos de la ficha
  const track = $("carousel-track");
  const dots = $("carousel-dots");
  const carousel = $("carousel");
  let index = 0;
  let resizing = false;
  const current = () => Math.round(track.scrollLeft / track.clientWidth);

  function goTo(i, smooth = true) {
    const n = track.children.length;
    if (!n) return;
    i = (i + n) % n;
    track.scrollTo({ left: i * track.clientWidth, behavior: smooth ? "smooth" : "auto" });
  }

  function updateDots() {
    if (resizing) return;
    const i = (index = current());
    dots.querySelectorAll("span").forEach((d, k) => d.classList.toggle("is-active", k === i));
  }

  function setPhotos(fotos, alt) {
    track.innerHTML = fotos
      .map((f, i) => `<img src="${escape(f)}" alt="${escape(alt)}${fotos.length > 1 ? ` (${i + 1} de ${fotos.length})` : ""}"${i ? ' loading="lazy"' : ""}>`)
      .join("");
    dots.innerHTML = fotos.length > 1 ? fotos.map(() => "<span></span>").join("") : "";
    carousel.classList.toggle("is-multi", fotos.length > 1);
    goTo(0, false);
    updateDots();
  }

  carousel.querySelector(".carousel__nav--prev").addEventListener("click", () => goTo(index - 1));
  carousel.querySelector(".carousel__nav--next").addEventListener("click", () => goTo(index + 1));
  track.addEventListener("scroll", () => requestAnimationFrame(updateDots), { passive: true });
  // Al cambiar el tamaño, mantener la misma foto encuadrada (Safari no reajusta solo)
  new ResizeObserver(() => {
    resizing = true;
    track.scrollLeft = index * track.clientWidth;
    requestAnimationFrame(() => (resizing = false));
  }).observe(track);
  modal.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(index - 1);
    if (e.key === "ArrowRight") goTo(index + 1);
  });

  function open(p) {
    $("modal-brand").textContent = p.marca || "";
    $("modal-title").textContent = p.nombre;
    $("modal-price").textContent = precio(p.precio);
    $("modal-desc").textContent = p.descripcion || "";

    const details = [["Medidas", p.medidas], ["Estado", p.estado], ["Entrega", p.entrega]].filter(([, v]) => v);
    $("modal-details").innerHTML = details.map(([k, v]) => `<dt>${k}</dt><dd>${escape(v)}</dd>`).join("");


    const cta = $("modal-cta");
    if (p.vendido) {
      cta.removeAttribute("href");
      cta.textContent = "Vendido";
      cta.classList.add("is-disabled");
    } else {
      const msg = `¡Hola! Me interesa "${p.nombre}" (${precio(p.precio)}) de la venta de cosas: ${location.href}`;
      cta.href = `https://wa.me/${CONFIG.whatsapp[p.contacto] || CONFIG.whatsapp.vicente}?text=${encodeURIComponent(msg)}`;
      cta.textContent = "Contactar por WhatsApp";
      cta.classList.remove("is-disabled");
    }

    modal.classList.toggle("is-sold", !!p.vendido);
    if (!modal.open) {
      modal.showModal();
      // Foco en la ficha (no en la ×), así Safari no muestra el anillo azul al abrir
      modal.focus();
      document.documentElement.classList.add("no-scroll");
    }
    setPhotos(p.fotos || [], p.nombre);
    modal.scrollTop = 0;
  }

  function close() {
    if (location.hash) history.pushState("", document.title, location.pathname + location.search);
    if (modal.open) modal.close();
  }

  function route() {
    const id = decodeURIComponent(location.hash.slice(1));
    const p = PRODUCTOS.find((x) => x.id === id);
    if (p) open(p);
    else if (modal.open) modal.close();
  }

  modal.querySelector(".modal__close").addEventListener("click", close);
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
  modal.addEventListener("cancel", (e) => { e.preventDefault(); close(); });
  modal.addEventListener("close", () => document.documentElement.classList.remove("no-scroll"));

  window.addEventListener("hashchange", route);
  route();
})();
