const CONTACTS = [
  { icon: '✉️', label: 'Email', value: 'theikbhal@gmail.com', href: 'mailto:theikbhal@gmail.com' },
  { icon: '📱', label: 'Phone', value: '+91 9901014560', href: 'tel:+919901014560' },
  { icon: '📸', label: 'Instagram', value: '@theikbhhal', href: 'https://www.instagram.com/theikbhhal/' },
  { icon: '✕', label: 'X', value: '@theikbhal', href: 'https://x.com/theikbhal' },
  { icon: '▶️', label: 'YouTube', value: 'Muhammad Iqbal Labs', href: 'https://www.youtube.com/@muhammadiqballabs' },
]

const THEME_KEY = 'ikbhal-blog-theme'
const SORT_KEY = 'ikbhal-blog-sort'
const FILTER_KEY = 'ikbhal-blog-filter'

let allPosts = []
let sortOrder = 'desc'
let activeFilter = ''

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
  setTheme(getTheme() === 'dark' ? 'light' : 'dark')
}

function getSortOrder() {
  return localStorage.getItem(SORT_KEY) || 'desc'
}

function setSortOrder(order) {
  sortOrder = order
  localStorage.setItem(SORT_KEY, order)
}

function getActiveFilter() {
  return localStorage.getItem(FILTER_KEY) || ''
}

function setActiveFilter(filter) {
  activeFilter = filter
  if (filter) localStorage.setItem(FILTER_KEY, filter)
  else localStorage.removeItem(FILTER_KEY)
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

function getDateGroups(posts) {
  const groups = {}
  for (const p of posts) {
    const d = new Date(p.date)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const label = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    if (!groups[key]) groups[key] = { key, label, count: 0 }
    groups[key].count++
  }
  return Object.values(groups).sort((a, b) => b.key.localeCompare(a.key))
}

function matchesFilter(post, filter) {
  if (!filter) return true
  const d = new Date(post.date)
  const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  return key === filter
}

function renderHome(posts) {
  const main = document.getElementById('main-content')
  document.title = 'ikbhal — build in public'

  const filtered = posts.filter(p => matchesFilter(p, activeFilter))
  const sorted = [...filtered].sort((a, b) => {
    return sortOrder === 'desc'
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  })

  const groups = getDateGroups(posts)
  const sortLabel = sortOrder === 'desc' ? '↓ Newest' : '↑ Oldest'

  const filtersHtml = groups.length > 1 ? `
    <div class="filters">
      <button class="filter-chip${!activeFilter ? ' active' : ''}" data-filter="">All</button>
      ${groups.map(g => `
        <button class="filter-chip${activeFilter === g.key ? ' active' : ''}" data-filter="${g.key}">${g.label} (${g.count})</button>
      `).join('')}
    </div>
  ` : ''

  const controlsHtml = groups.length > 1 ? `
    <div class="controls-bar">
      <button class="control-btn sort-btn" id="sort-btn">${sortLabel}</button>
      <button class="control-btn" id="pdf-btn">PDF</button>
    </div>
  ` : ''

  main.innerHTML = `
    ${filtersHtml}
    ${controlsHtml}
    ${sorted.length === 0 ? `
      <div class="loading">No posts match this filter.</div>
    ` : `
      <ul class="post-list">
        ${sorted.map(p => `
          <li class="post-item">
            <a href="#" class="post-link" data-post="${p.slug}">
              <div class="post-title">${escapeHtml(p.title)}</div>
              <div class="post-meta">${p.date} · ${p.readTime}</div>
              ${p.excerpt ? `<div class="post-excerpt">${escapeHtml(p.excerpt)}</div>` : ''}
            </a>
          </li>
        `).join('')}
      </ul>
    `}
    ${renderContact()}
  `

  document.querySelectorAll('[data-post]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault()
      renderPost(e.currentTarget.dataset.post)
    })
  })

  document.querySelectorAll('.filter-chip').forEach(el => {
    el.addEventListener('click', () => {
      setActiveFilter(el.dataset.filter)
      renderHome(posts)
    })
  })

  document.getElementById('sort-btn')?.addEventListener('click', () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
    renderHome(posts)
  })

  document.getElementById('pdf-btn')?.addEventListener('click', () => {
    window.print()
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
          <div class="post-nav">
            <a href="#" class="back-link" data-nav="home">← Back to posts</a>
            <button class="control-btn" id="pdf-post-btn">Export PDF</button>
          </div>
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

    document.getElementById('pdf-post-btn')?.addEventListener('click', () => {
      window.print()
    })
  } catch {
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
    allPosts = await loadPosts()
    sortOrder = getSortOrder()
    activeFilter = getActiveFilter()
    renderHome(allPosts)
  } catch {
    renderHome([])
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTheme(getTheme())
  document.getElementById('theme-btn').addEventListener('click', toggleTheme)
  loadHome()
})
