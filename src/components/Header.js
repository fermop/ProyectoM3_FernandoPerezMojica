export const Header = () => {
  return `
    <header class="app-header">
      <div class="logo-container">
        <img src="/public/assets/logo.webp" alt="Konoha Logo" class="logo-img" />
        <h1>Shinobi AI</h1>
      </div>
      <nav class="main-nav">
        <a href="/home" data-link>Inicio</a>
        <a href="/chat" data-link>Chat</a>
        <a href="/about" data-link>Acerca de</a>
      </nav>
      <button id="theme-toggle" class="theme-btn" aria-label="Cambiar tema"></button>
    </header>
  `
}