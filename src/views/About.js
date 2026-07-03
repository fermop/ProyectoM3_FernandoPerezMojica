export const About = () => {
  return `
    <section class="about-view fade-in">
      <header class="view-header">
        <h2>Acerca del Proyecto</h2>
        <p>Descubre la tecnología y arquitectura detrás de Shinobi AI Chat.</p>
      </header>

      <div class="about-content">
        <article class="about-card">
          <h3>Misión</h3>
          <p>Esta es una Single Page Application (SPA) desarrollada para demostrar la integración de Inteligencia Artificial en interfaces web modernas utilizando únicamente <strong>Vanilla JavaScript</strong>, HTML semántico y CSS responsivo (Mobile-First).</p>
        </article>

        <article class="about-card">
          <h3>Stack y Arquitectura</h3>
          <ul class="tech-list">
            <li><span class="tech-tag">HTML</span></li>
            <li><span class="tech-tag">CSS</span></li>
            <li><span class="tech-tag">JavaScript (ES6+)</span></li>
            <li><span class="tech-tag">History API (Router)</span></li>
            <li><span class="tech-tag">Gemini API (AI)</span></li>
            <li><span class="tech-tag">Vercel Serverless</span></li>
            <li><span class="tech-tag">Vitest</span></li>
          </ul>
          <p>La aplicación utiliza Serverless Functions como intermediario (proxy) para procesar las peticiones. Esto garantiza que la API Key de Google Generative AI se mantenga completamente segura en el servidor, protegiéndola del lado del cliente.</p>
        </article>

        <article class="about-card full-width-card">
          <h3>Personajes Elegidos</h3>
          <p>Para demostrar la capacidad de los <em>System Prompts</em> de la IA para adoptar personalidades específicas, se seleccionaron tres ninjas de Konoha:</p>
          <div class="character-list">
            <div class="character-item">
              <img src="/public/assets/naruto.webp" class="contact-img" alt="Naruto" loading="lazy" />
              <div class="character-info">
                <h4>Naruto Uzumaki</h4>
                <p>Respuestas enérgicas, optimistas y con su clásica muletilla.</p>
              </div>
            </div>
            <div class="character-item">
              <img src="/public/assets/kakashi.webp" class="contact-img" alt="Kakashi" loading="lazy" />
              <div class="character-info">
                <h4>Kakashi Hatake</h4>
                <p>Tono sereno, maduro, misterioso y un poco desinteresado.</p>
              </div>
            </div>
            <div class="character-item">
              <img src="/public/assets/rock-lee.webp" class="contact-img" alt="Rock Lee" loading="lazy" />
              <div class="character-info">
                <h4>Rock Lee</h4>
                <p>Extremadamente entusiasta, formal y enfocado en el entrenamiento.</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  `
}