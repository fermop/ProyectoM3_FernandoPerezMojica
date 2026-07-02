const routes = {
  '/home': () => '<main><h2>Inicio</h2><p>Bienvenido al chat de Shinobis.</p><nav><a href="/chat" data-link>Ir al Chat</a> | <a href="/about" data-link>Acerca de</a></nav></main>',
  '/chat': () => '<main><h2>Chat</h2><p>Área de conversación.</p><nav><a href="/home" data-link>Volver al Inicio</a></nav></main>',
  '/about': () => '<main><h2>Acerca de</h2><p>Información del proyecto.</p><nav><a href="/home" data-link>Volver al Inicio</a></nav></main>',
  '/404': () => '<main><h2>404 - Página no encontrada</h2><a href="/home" data-link>Volver al inicio</a></main>'
}

const renderView = (path) => {
  const app = document.getElementById('app')
  const view = routes[path] || routes['/404']
  
  app.innerHTML = view()
}

export const navigateTo = (path) => {
  window.history.pushState({}, '', path)
  renderView(path)
}

export const initRouter = () => {
  window.addEventListener('popstate', () => {
    renderView(window.location.pathname)
  })

  document.body.addEventListener('click', e => {
    const target = e.target.closest('[data-link]')
    
    if (target) {
      e.preventDefault()
      navigateTo(target.getAttribute('href'))
    }
  })

  const currentPath = window.location.pathname
  if (currentPath === '/') {
    window.history.replaceState({}, '', '/home')
    renderView('/home')
  } else {
    renderView(currentPath)
  }
}