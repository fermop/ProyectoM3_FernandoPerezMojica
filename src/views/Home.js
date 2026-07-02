export const Home = () => {
  return `
    <section class="home-view fade-in">
      <header class="view-header">
        <h2>Elige a tu Shinobi</h2>
        <p>Selecciona un personaje para comenzar tu entrenamiento conversacional.</p>
      </header>
      <div class="shinobi-grid">
        <article class="shinobi-card">
          <img src="/public/assets/naruto.webp" alt="Naruto Uzumaki" loading="lazy" />
          <div class="card-content">
            <h3>Naruto Uzumaki</h3>
            <p>¡De veras! Habla con el ninja hiperactivo y futuro Hokage.</p>
            <a href="/chat?character=naruto" class="btn-primary" data-link>Chatear</a>
          </div>
        </article>
        <article class="shinobi-card">
          <img src="/public/assets/kakashi.webp" alt="Kakashi Hatake" loading="lazy" />
          <div class="card-content">
            <h3>Kakashi Hatake</h3>
            <p>El ninja que copia. Respuestas sabias y relajadas.</p>
            <a href="/chat?character=kakashi" class="btn-primary" data-link>Chatear</a>
          </div>
        </article>
        <article class="shinobi-card">
          <img src="/public/assets/rock-lee.webp" alt="Rock Lee" loading="lazy" />
          <div class="card-content">
            <h3>Rock Lee</h3>
            <p>¡El poder de la juventud! Pura energía y determinación.</p>
            <a href="/chat?character=rock-lee" class="btn-primary" data-link>Chatear</a>
          </div>
        </article>
      </div>
    </section>
  `
}