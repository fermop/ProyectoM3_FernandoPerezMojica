import { Header } from '#/components/Header.js'
import { Home } from '#/views/Home.js'
import { Chat, initChat } from '#/views/Chat.js'
import { About } from '#/views/About.js'

const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`
const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-icon lucide-moon"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>`

const routes = {
  '/home': Home,
  '/chat': Chat,
  '/about': About,
  '/404': () => '<section><h2>404 - Página no encontrada</h2><a href="/home" data-link>Volver al inicio</a></section>'
}

const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  const defaultTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light')
  document.body.setAttribute('data-theme', defaultTheme)
}

const initThemeToggle = () => {
  const btn = document.getElementById('theme-toggle')
  if (!btn) return
  
  const body = document.body
  const isDark = body.getAttribute('data-theme') === 'dark'
  
  btn.innerHTML = isDark ? sunIcon : moonIcon
  
  btn.addEventListener('click', () => {
    const currentlyDark = body.getAttribute('data-theme') === 'dark'
    const newTheme = currentlyDark ? 'light' : 'dark'
    
    body.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
    btn.innerHTML = currentlyDark ? moonIcon : sunIcon
  })
}

const renderView = (path) => {
  const app = document.getElementById('app')
  
  const cleanPath = path.split('?')[0]
  const view = routes[cleanPath] || routes['/404']
  
  app.innerHTML = `
    ${Header()}
    <main>
      ${view()}
    </main>
  `
  
  initThemeToggle()
  
  if (cleanPath === '/chat') {
    initChat()
  }
}

export const navigateTo = (path) => {
  window.history.pushState({}, '', path)
  renderView(path)
}

export const initRouter = () => {
  initializeTheme()

  window.addEventListener('popstate', () => {
    renderView(window.location.pathname + window.location.search)
  })

  document.body.addEventListener('click', e => {
    const target = e.target.closest('[data-link]')
    
    if (target) {
      e.preventDefault()

      const targetHref = target.getAttribute('href')
      const currentFullPath = window.location.pathname + window.location.search
      
      if (currentFullPath === targetHref) {
        return
      }
      
      navigateTo(targetHref)
    }
  })

  const currentPath = window.location.pathname + window.location.search
  if (window.location.pathname === '/') {
    window.history.replaceState({}, '', '/home')
    renderView('/home')
  } else {
    renderView(currentPath)
  }
}