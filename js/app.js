const CONTACTS = [
  { icon: '✉️', label: 'Email', value: 'theikbhal@gmail.com', href: 'mailto:theikbhal@gmail.com' },
  { icon: '📱', label: 'Phone', value: '+91 9901014560', href: 'tel:+919901014560' },
  { icon: '📸', label: 'Instagram', value: '@theikbhhal', href: 'https://www.instagram.com/theikbhhal/' },
  { icon: '✕', label: 'X', value: '@theikbhal', href: 'https://x.com/theikbhal' },
  { icon: '▶️', label: 'YouTube', value: 'Muhammad Iqbal Labs', href: 'https://www.youtube.com/@muhammadiqballabs' },
]

const THEME_KEY = 'ikbhal-blog-theme'

function getTheme() {
  return localStorage.getItem(THEME_KEY) || 'dark'
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme
  localStorage.setItem(THEME_KEY, theme)
  const btn = document.getElementById('theme-btn')
  if (btn) btn.textContent = theme === 'dark' ? '🌙' : '☀️'
}

function toggleTheme() {
  const current = getTheme()
  setTheme(current === 'dark' ? 'light' : 'dark')
}

async function loadPosts() {
  const res = await fetch('posts/manifest.json')
  if (!res.ok) throw new Error('Failed to load posts')
  return res.json()
}

async function loadPostContent(slug) {
  const res = await fetch(`posts/${slug}.md`)
  if (!res.ok) throw new Error('Post not found')
  return res.text()
}

function renderHome(posts) {
  const main = document.getElementById('main-content')
  document.title = 'ikbhal — build in public'

  if (!posts || posts.length === 0) {
    main.innerHTML = `
      <div class="loading">No posts yet. Coming soon.</div>
    `
    return
  }

  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))

  const list = sorted.map(p => `
    <li class="post-item">
      <a href="#" class="post-link" data-post="${p.slug}">
        <div class="post-title">${escapeHtml(p.title)}</div>
        <div class="post-meta">${p.date} · ${p.readTime}</div>
        ${p.excerpt ? `<div class="post-excerpt">${escapeHtml(p.excerpt)}</div>` : ''}
      </a>
    </li>
  `).join('')

  main.innerHTML = `
    <ul class="post-list">${list}</ul>
    ${renderContact()}
  `

  document.querySelectorAll('[data-post]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault()
      const slug = e.currentTarget.dataset.post
      renderPost(slug)
    })
  })
}

async function renderPost(slug) {
  const main = document.getElementById('main-content')
  main.innerHTML = '<div class="loading">Loading...</div>'

  try {
    const [posts, content] = await Promise.all([loadPosts(), loadPostContent(slug)])
    const post = posts.find(p => p.slug === slug)
    if (!post) throw new Error('Post not found')

    const html = marked.parse(content)
    document.title = `${post.title} — ikbhal`

    main.innerHTML = `
      <article>
        <div class="post-header">
          <a href="#" class="back-link" data-nav="home">← Back to posts</a>
          <h1 class="post-page-title">${escapeHtml(post.title)}</h1>
          <div class="post-page-meta">${post.date} · ${post.readTime}</div>
        </div>
        <div class="post-content">${html}</div>
      </article>
      <div class="contact-section">
        <div class="contact-title">Connect</div>
        ${renderContactItems()}
      </div>
    `

    document.querySelector('[data-nav="home"]').addEventListener('click', (e) => {
      e.preventDefault()
      loadHome()
    })
  } catch (err) {
    main.innerHTML = `
      <div class="error">Failed to load post. <a href="#" data-nav="home">Go back home</a></div>
    `
    document.querySelector('[data-nav="home"]').addEventListener('click', (e) => {
      e.preventDefault()
      loadHome()
    })
  }
}

function renderContact() {
  return `
    <div class="contact-section">
      <div class="contact-title">Connect</div>
      ${renderContactItems()}
    </div>
  `
}

function renderContactItems() {
  return CONTACTS.map(c => {
    const value = c.href
      ? `<a href="${c.href}" class="contact-value" target="_blank" rel="noopener">${escapeHtml(c.value)}</a>`
      : `<span class="contact-value">${escapeHtml(c.value)}</span>`
    return `
      <div class="contact-item">
        <span class="contact-icon">${c.icon}</span>
        <span class="contact-label">${c.label}</span>
        ${value}
      </div>
    `
  }).join('')
}

function escapeHtml(text) {
  const d = document.createElement('div')
  d.textContent = text
  return d.innerHTML
}

async function loadHome() {
  const main = document.getElementById('main-content')
  main.innerHTML = '<div class="loading">Loading...</div>'

  try {
    const posts = await loadPosts()
    renderHome(posts)
  } catch {
    renderHome([])
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTheme(getTheme())

  document.getElementById('theme-btn').addEventListener('click', toggleTheme)

  loadHome()
})
