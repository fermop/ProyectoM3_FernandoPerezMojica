export const Chat = () => {
  return `
    <section class="chat-view fade-in">
      <aside class="chat-sidebar">
        <img src="/public/assets/naruto.webp" class="contact-img active" alt="Naruto" data-char="naruto" title="Naruto" />
        <img src="/public/assets/kakashi.webp" class="contact-img" alt="Kakashi" data-char="kakashi" title="Kakashi" />
        <img src="/public/assets/rock-lee.webp" class="contact-img" alt="Rock Lee" data-char="rock-lee" title="Rock Lee" />
      </aside>
      
      <div class="chat-main-area">
        <header class="chat-header">
          <h3 id="current-chat-name">Naruto Uzumaki</h3>
        </header>
        
        <div class="chat-messages" id="chat-messages">
          <div class="message system-msg">
            <p>Selecciona un personaje o escribe un mensaje para empezar.</p>
          </div>
        </div>
        
        <form id="chat-form" class="chat-input-area">
          <input type="text" id="message-input" placeholder="Escribe un mensaje..." autocomplete="off" required />
          <button type="submit" class="btn-primary">Enviar</button>
        </form>
      </div>
    </section>
  `
}