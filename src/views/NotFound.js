export const NotFound = () => {
  return `
    <section class="not-found-view">
      <div class="not-found-wrapper">
        <img class="not-found-img" src="/public/assets/naruto-ashamed.webp" alt="Naruto confundido" loading="lazy" />
        <h2 class="not-found-title">Error 404</h2>
        <p class="not-found-text">¡Oh no! Parece que caíste en un Genjutsu...</p>
        <p class="not-found-subtext">La ruta que buscas no existe en los mapas de nuestra aldea ninja.</p>
        <a href="/home" class="btn-primary" data-link>Volver a la Aldea de la Hoja</a>
      <div>
    </section>
  `
}