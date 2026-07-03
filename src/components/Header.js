export const Header = () => {
  const menuIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu-icon lucide-menu"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>`
  const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`

  return `
    <header class="app-header">
      <div class="app-header-wrapper">
        <div class="logo-container">
          <img src="/public/assets/logo.png" alt="Konoha Logo" class="logo-img" />
          <h1>Shinobi AI</h1>
        </div>
        
        <button id="mobile-menu-btn" class="mobile-menu-btn" aria-label="Abrir menú">
          ${menuIcon}
        </button>

        <div id="header-settings" class="app-header-settings">
          <button id="close-menu-btn" class="close-menu-btn" aria-label="Cerrar menú">
            ${closeIcon}
          </button>
          
          <nav class="main-nav">
            <a href="/home" data-link>Inicio</a>
            <a href="/chat" data-link>Chat</a>
            <a href="/about" data-link>Acerca de</a>
          </nav>
          
          <button id="theme-toggle" class="theme-btn" aria-label="Cambiar tema"></button>
        </div>
        
        <div id="menu-overlay" class="menu-overlay"></div>
      </div>
    </header>
  `
}