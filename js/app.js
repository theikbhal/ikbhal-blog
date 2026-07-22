const CONTACTS = [
  { icon: '✉️', label: 'Email', value: 'theikbhal@gmail.com', href: 'mailto:theikbhal@gmail.com' },
  { icon: '📸', label: 'Instagram', value: '@theikbhhal', href: 'https://www.instagram.com/theikbhhal/' },
  { icon: '✕', label: 'X', value: '@theikbhal', href: 'https://x.com/theikbhal' },
  { icon: '▶️', label: 'YouTube', value: 'Muhammad Iqbal Labs', href: 'https://www.youtube.com/@muhammadiqballabs' },
  { icon: '☕', label: 'Support', value: 'Buy me a coffee', href: 'https://buymeacoffee.com/theikbhal' },
]

const THEME_KEY = 'ikbhal-blog-theme'
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
  const headerBtn = document.getElementById('theme-btn')
  if (headerBtn) headerBtn.textContent = theme === 'dark' ? '🌙' : '☀️'
}

function toggleTheme() {
  setTheme(getTheme() === 'dark' ? 'light' : 'dark')
}

function setSortOrder(order) {
  sortOrder = order
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

function downloadFile(content, filename, mime) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function exportAllJSON(posts) {
  const data = JSON.stringify(posts, null, 2)
  downloadFile(data, 'ikbhal-blog-posts.json', 'application/json')
}

async function exportPostJSON(slug) {
  const [posts, content] = await Promise.all([loadPosts(), loadPostContent(slug)])
  const post = posts.find(p => p.slug === slug)
  const data = JSON.stringify({ ...post, body: content }, null, 2)
  downloadFile(data, `${slug}.json`, 'application/json')
}

async function exportPostMD(slug) {
  const content = await loadPostContent(slug)
  downloadFile(content, `${slug}.md`, 'text/markdown')
}

async function exportPostTXT(slug) {
  const [posts, content] = await Promise.all([loadPosts(), loadPostContent(slug)])
  const post = posts.find(p => p.slug === slug)
  const text = `# ${post.title}\n${post.date} · ${post.readTime}\n\n${content.replace(/[#*`\[\]()>|_-]/g, '').replace(/\n{3,}/g, '\n\n')}`
  downloadFile(text, `${slug}.txt`, 'text/plain')
}

async function exportAllMD() {
  const posts = await loadPosts()
  for (const p of posts) {
    const content = await loadPostContent(p.slug)
    downloadFile(content, `${p.slug}.md`, 'text/markdown')
  }
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

function formatTweetTime(dateStr) {
  const d = new Date(dateStr)
  const now = new Date()
  const diffMs = now - d
  const diffHrs = Math.floor(diffMs / 3600000)
  const diffMins = Math.floor(diffMs / 60000)

  if (diffMins < 1) return 'now'
  if (diffMins < 60) return `${diffMins}m`
  if (diffHrs < 24) return `${diffHrs}h`
  if (diffHrs < 168) return `${Math.floor(diffHrs / 24)}d`
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function renderHome(posts) {
  const main = document.getElementById('main-content')
  document.title = 'ikbhal — build in public'

  const filtered = posts.filter(p => matchesFilter(p, activeFilter))
  const indexed = filtered.map((p, i) => ({ ...p, _idx: i }))
  const sorted = indexed.sort((a, b) => {
    const dateDiff = sortOrder === 'desc'
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
    if (dateDiff !== 0) return dateDiff
    return sortOrder === 'desc' ? b._idx - a._idx : a._idx - b._idx
  })

  const groups = getDateGroups(posts)
  const sortLabel = sortOrder === 'desc' ? '↓ Newest' : '↑ Oldest'
  const postCount = posts.length

  const filtersHtml = groups.length > 0 ? `
    <div class="filters">
      <button class="filter-chip${!activeFilter ? ' active' : ''}" data-filter="">All</button>
      ${groups.map(g => `
        <button class="filter-chip${activeFilter === g.key ? ' active' : ''}" data-filter="${g.key}">${g.label}</button>
      `).join('')}
    </div>
  ` : ''

  main.innerHTML = `
    <div class="profile-header">
      <div class="profile-row">
        <div class="profile-avatar">⚡</div>
        <div class="profile-info">
          <div class="profile-name">ikbhal</div>
          <div class="profile-handle">@theikbhal</div>
          <div class="profile-bio">Building little things. Sharing the journey.</div>
          <div class="profile-meta">
            <span class="profile-stat"><strong>${postCount}</strong> <span class="profile-stat-label">posts</span></span>
          </div>
          <div class="profile-links">
            ${CONTACTS.map(c => `<a href="${c.href}" class="profile-link" target="_blank" rel="noopener">${c.icon}</a>`).join('')}
            <button class="profile-link profile-about-btn" id="about-trigger">?</button>
          </div>
        </div>
      </div>
      <div class="tab-bar">
        <button class="tab-item active">Posts</button>
      </div>
    </div>
    <div class="controls-row">
      <button class="control-btn-sm" id="sort-btn">↕ ${sortLabel}</button>
      <button class="control-btn-sm" id="export-btn">⤓ Export</button>
      <div class="export-wrapper">
        <div class="export-dropdown hidden" id="export-dropdown">
          <button class="export-option" data-export="pdf">📄 PDF</button>
          <button class="export-option" data-export="json">📋 JSON</button>
          <button class="export-option" data-export="md">📝 Markdown</button>
        </div>
      </div>
    </div>
    ${filtersHtml}
    ${sorted.length === 0 ? `
      <div class="loading">No posts match this filter.</div>
    ` : `
      <ul class="post-list">
        ${sorted.map(p => `
          <li class="post-item">
            <a href="#" class="post-link" data-post="${p.slug}">
              <div class="tweet">
                <div class="tweet-avatar">⚡</div>
                <div class="tweet-body">
                  <div class="tweet-header">
                    <span class="tweet-name">ikbhal</span>
                    <span class="tweet-handle">@theikbhal</span>
                    <span class="tweet-dot">·</span>
                    <span class="tweet-time">${formatTweetTime(p.date)}</span>
                  </div>
                  <div class="tweet-title">${escapeHtml(p.title)}</div>
                  ${p.excerpt ? `<div class="tweet-excerpt">${escapeHtml(p.excerpt)}</div>` : ''}
                  <div class="tweet-meta">${p.date} · ${p.readTime}</div>
                  <div class="tweet-actions">
                    <span class="tweet-action">💬</span>
                    <span class="tweet-action">🔄</span>
                    <span class="tweet-action">❤️</span>
                    <span class="tweet-action">🔗</span>
                  </div>
                </div>
              </div>
            </a>
          </li>
        `).join('')}
      </ul>
    `}
  `

  document.querySelectorAll('[data-post]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault()
      renderPost(e.currentTarget.dataset.post)
    })
  })

  document.getElementById('about-trigger')?.addEventListener('click', () => {
    const overlay = document.getElementById('help-overlay')
    if (overlay) overlay.classList.remove('hidden')
  })

  const helpContactGrid = document.querySelector('.help-body .contact-grid')
  if (helpContactGrid) {
    helpContactGrid.innerHTML = CONTACTS.map(c =>
      `<a href="${c.href}" class="contact-chip" target="_blank" rel="noopener">${c.icon} ${escapeHtml(c.label)}</a>`
    ).join('')
  }

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

  const exportBtn = document.getElementById('export-btn')
  const exportDropdown = document.getElementById('export-dropdown')
  if (exportBtn && exportDropdown) {
    exportBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      exportDropdown.classList.toggle('hidden')
    })
    document.addEventListener('click', () => exportDropdown.classList.add('hidden'), { once: false })
    exportDropdown.querySelectorAll('.export-option').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation()
        exportDropdown.classList.add('hidden')
        const type = e.currentTarget.dataset.export
        if (type === 'pdf') window.print()
        else if (type === 'json') exportAllJSON(posts)
        else if (type === 'md') exportAllMD()
      })
    })
  }
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
            <a href="#" class="back-link" data-nav="home">←</a>
            <span style="font-weight:700;font-size:17px">Post</span>
            <div class="post-nav-right">
              <button class="control-btn" id="export-post-btn">⤓</button>
              <div class="export-dropdown hidden" id="export-post-dropdown">
                <button class="export-option" data-export="pdf">📄 PDF</button>
                <button class="export-option" data-export="json">📋 JSON</button>
                <button class="export-option" data-export="md">📝 Markdown</button>
                <button class="export-option" data-export="txt">📃 Text</button>
              </div>
            </div>
          </div>
          <div class="tweet" style="margin-top:4px">
            <div class="tweet-avatar">⚡</div>
            <div class="tweet-body">
              <div class="tweet-header">
                <span class="tweet-name">ikbhal</span>
                <span class="tweet-handle">@theikbhal</span>
                <span class="tweet-dot">·</span>
                <span class="tweet-time">${formatTweetTime(post.date)}</span>
              </div>
              <h1 class="post-page-title">${escapeHtml(post.title)}</h1>
              <div class="post-page-meta">${post.date} · ${post.readTime}</div>
              <div class="tweet-actions">
                <span class="tweet-action">💬</span>
                <span class="tweet-action">🔄</span>
                <span class="tweet-action">❤️</span>
                <span class="tweet-action">🔗</span>
              </div>
            </div>
          </div>
        </div>
        <div class="post-content">${html}</div>
      </article>
    `

    document.querySelector('[data-nav="home"]').addEventListener('click', (e) => {
      e.preventDefault()
      loadHome()
    })

    const exportPostBtn = document.getElementById('export-post-btn')
    const exportPostDropdown = document.getElementById('export-post-dropdown')
    if (exportPostBtn && exportPostDropdown) {
      exportPostBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        exportPostDropdown.classList.toggle('hidden')
      })
      document.addEventListener('click', () => exportPostDropdown.classList.add('hidden'), { once: false })
      exportPostDropdown.querySelectorAll('.export-option').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.stopPropagation()
          exportPostDropdown.classList.add('hidden')
          const type = e.currentTarget.dataset.export
          if (type === 'pdf') window.print()
          else if (type === 'json') await exportPostJSON(slug)
          else if (type === 'md') await exportPostMD(slug)
          else if (type === 'txt') await exportPostTXT(slug)
        })
      })
    }
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
    sortOrder = 'asc'
    activeFilter = getActiveFilter()
    renderHome(allPosts)
  } catch {
    renderHome([])
  }
}

function updateActiveNav(id) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'))
  const nav = document.getElementById(`nav-${id}`)
  if (nav) nav.classList.add('active')
}

document.addEventListener('DOMContentLoaded', () => {
  setTheme(getTheme())

  document.querySelector('.logo')?.addEventListener('click', (e) => {
    e.preventDefault()
    loadHome()
  })

  document.getElementById('about-btn')?.addEventListener('click', () => {
    const overlay = document.getElementById('help-overlay')
    if (overlay) overlay.classList.remove('hidden')
  })

  const themeBtn = document.getElementById('theme-btn')
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme)

  const helpBtn = document.getElementById('help-btn')
  const helpOverlay = document.getElementById('help-overlay')
  const helpClose = document.getElementById('help-close')

  if (helpBtn && helpOverlay) {
    helpBtn.addEventListener('click', () => {
      helpOverlay.classList.remove('hidden')
    })
  }

  if (helpOverlay) {
    helpOverlay.addEventListener('click', (e) => {
      if (e.target === helpOverlay) helpOverlay.classList.add('hidden')
    })
    if (helpClose) {
      helpClose.addEventListener('click', () => helpOverlay.classList.add('hidden'))
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') helpOverlay.classList.add('hidden')
    })
  }

  loadHome()
})
