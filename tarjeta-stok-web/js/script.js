"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  // Saludo según la hora y año del pie
  const h = new Date().getHours();
  $("#saludo").textContent = h >= 5 && h < 12 ? "Buenos días" : h >= 12 && h < 20 ? "Buenas tardes" : "Buenas noches";
  $("#anio").textContent = new Date().getFullYear();

  // Aviso flotante
  let toastTimer;
  const toast = (msg) => {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("is-visible"), 2000);
  };

  // Pestañas
  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".tab").forEach((t) => { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      $$(".panel").forEach((p) => (p.hidden = p.id !== "panel-" + tab.dataset.tab));
    });
  });

  // Pasos de "Cómo funciona"
  const steps = [
    { title: "Cada activo lleva su etiqueta RFID", text: "Ponemos una etiqueta RFID en cada activo, elegida según el tipo de material o herramienta." },
    { title: "La cámara cuenta lo que entra y sale", text: "Con visión artificial contamos cuántos activos entran y salen de la bodega. El modelo aprende con el uso, así que su precisión mejora con el tiempo." },
    { title: "La IA trabaja por ustedes", text: "Estamos desarrollando agentes de IA que prepararán las órdenes de despacho y de compra, y que les dirán cuánto y cuándo comprar." },
  ];
  let current = 0;
  const showStep = (i) => {
    current = i;
    $$(".step").forEach((b, j) => {
      b.classList.toggle("is-active", j === i);
      b.classList.toggle("is-done", j < i);
    });
    $("#step-tag").textContent = `Paso ${i + 1} de ${steps.length}`;
    $("#step-title").textContent = steps[i].title;
    $("#step-text").textContent = steps[i].text;
    $("#step-next").textContent = i < steps.length - 1 ? "Siguiente →" : "Volver al inicio";
  };
  $$(".step").forEach((b) => b.addEventListener("click", () => showStep(Number(b.dataset.step))));
  $("#step-next").addEventListener("click", () => showStep(current < steps.length - 1 ? current + 1 : 0));
  showStep(0);

  // Copiar teléfono / correo
  const copy = async (text) => {
    try { await navigator.clipboard.writeText(text); return true; }
    catch { return false; }
  };
  $$("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const ok = await copy(btn.dataset.copy);
      const label = btn.querySelector("em");
      toast(ok ? btn.dataset.msg : "No se pudo copiar");
      if (ok && label) {
        label.textContent = "Copiado";
        setTimeout(() => (label.textContent = "Copiar"), 1800);
      }
    });
  });

  // Compartir
  $("#compartir").addEventListener("click", async () => {
    const data = { title: "Stok", text: "Trazabilidad de materiales en obra", url: location.href };
    if (navigator.share) {
      try { await navigator.share(data); } catch {}
    } else {
      toast((await copy(location.href)) ? "Enlace copiado" : "No se pudo copiar");
    }
  });

  // Guardar contacto
  $("#guardar").addEventListener("click", () => toast("Contacto descargado"));
});
