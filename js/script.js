// DOM elements
const featuredProjectsContainer = document.getElementById("featured-projects")
const allProjectsContainer = document.getElementById("all-projects")
const modalOverlay = document.getElementById("modal-overlay")
const modalContent = document.getElementById("modal-content")
const modalClose = document.getElementById("modal-close")
const backToTop = document.getElementById("back-to-top")
const projectCount = document.getElementById("project-count")

// Declare the projects variable
const projects = [
  // Example project data
  {
    id: "1",
    title: "Project One",
    description: "Description of Project One",
    fullDescription: "Full description of Project One",
    category: "Category One",
    date: "2023-01-01",
    duration: "3 months",
    image: "https://example.com/project1.jpg",
    tags: ["tag1", "tag2", "tag3", "tag4"],
    featured: true,
    links: {
      github: "https://github.com/project1",
      demo: "https://demo.project1.com",
      documentation: "https://docs.project1.com",
    },
    overview: "Overview of Project One",
    features: ["Feature 1", "Feature 2"],
    technologies: [
      { name: "Tech 1", description: "Description of Tech 1" },
      { name: "Tech 2", description: "Description of Tech 2" },
    ],
    challenges: ["Challenge 1", "Challenge 2"],
    results: ["Result 1", "Result 2"],
  },
  // Add more project data here
]

// Declare the projectsData variable
const projectsData = {
  1: projects[0],
  // Add more project data entries here
}

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing...")
  console.log("Projects loaded:", projects.length)
  renderProjects()
  setupEventListeners()
  updateProjectCount()
})

// Update project count in hero section
function updateProjectCount() {
  if (projectCount && projects) {
    projectCount.textContent = projects.length
  }
}

// Render all projects
function renderProjects() {
  console.log("Rendering projects...")
  renderFeaturedProjects()
  renderAllProjects()
}

// Render featured projects
function renderFeaturedProjects() {
  if (!featuredProjectsContainer) {
    console.error("Featured projects container not found")
    return
  }

  const featuredProjects = projects.filter((project) => project.featured)
  console.log("Featured projects:", featuredProjects.length)

  featuredProjectsContainer.innerHTML = featuredProjects.map((project) => createProjectCard(project, true)).join("")
}

// Render all projects (non-featured)
function renderAllProjects() {
  if (!allProjectsContainer) {
    console.error("All projects container not found")
    return
  }

  const otherProjects = projects.filter((project) => !project.featured)
  console.log("Other projects:", otherProjects.length)

  allProjectsContainer.innerHTML = otherProjects.map((project) => createProjectCard(project, false)).join("")
}

// Create project card HTML
function createProjectCard(project, isFeatured = false) {
  const cardClass = isFeatured ? "card featured" : "card"
  const tagsToShow = isFeatured ? project.tags.slice(0, 3) : project.tags.slice(0, 2)

  return `
        <div class="${cardClass}" onclick="openProjectModal('${project.id}')">
            <div class="card-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy" onerror="handleImageError(this)">
                <div class="card-image-overlay"></div>
                <div class="card-category">${project.category}</div>
            </div>
            <div class="card-content">
                <div class="card-header">
                    <h3 class="card-title">${project.title}</h3>
                    <svg class="card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7,7 17,7 17,17"></polyline>
                    </svg>
                </div>
                <p class="card-description">${project.description}</p>
                <div class="card-tags">
                    ${tagsToShow.map((tag) => `<span class="tag ${isFeatured ? "" : "outline"}">${tag}</span>`).join("")}
                </div>
                <div class="card-date">${project.date}</div>
            </div>
        </div>
    `
}

// Open project modal
function openProjectModal(projectId) {
  const project = projectsData[projectId]
  if (!project) {
    console.error("Project not found:", projectId)
    return
  }

  modalContent.innerHTML = createModalContent(project)
  modalOverlay.classList.add("active")
  document.body.style.overflow = "hidden"
}

// Close project modal
function closeProjectModal() {
  modalOverlay.classList.remove("active")
  document.body.style.overflow = "auto"
}

// Create modal content HTML
function createModalContent(project) {
  const githubLink = project.links?.github
    ? `
        <a href="${project.links.github}" target="_blank" class="btn btn-primary">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View Code
        </a>
    `
    : ""

  const demoLink = project.links?.demo
    ? `
        <a href="${project.links.demo}" target="_blank" class="btn btn-outline">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <polygon points="5,3 19,12 5,21"></polygon>
            </svg>
            Live Demo
        </a>
    `
    : ""

  const docLink = project.links?.documentation
    ? `
        <a href="${project.links.documentation}" target="_blank" class="btn btn-outline">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <path d="m18 13 6 6-6 6"></path>
                <path d="m6 7-6 6 6 6"></path>
                <path d="m8 21 8-18"></path>
            </svg>
            Documentation
        </a>
    `
    : ""

  return `
        <div class="modal-header">
            <div class="modal-meta">
                <span class="tag">${project.category}</span>
                <span style="color: var(--slate-500); display: flex; align-items: center; gap: 0.25rem;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    ${project.date}
                </span>
                <span style="color: var(--slate-500);">•</span>
                <span style="color: var(--slate-500);">${project.duration}</span>
            </div>
            
            <h1 class="modal-title">${project.title}</h1>
            
            <p class="modal-description">${project.fullDescription}</p>
            
            <div class="modal-tags">
                ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
            </div>
            
            <div class="modal-links">
                ${githubLink}
                ${demoLink}
                ${docLink}
            </div>
        </div>
        
        <img src="${project.image}" alt="${project.title}" class="modal-image" onerror="handleImageError(this)">
        
        <div class="modal-section">
            <h3>Overview</h3>
            <p>${project.overview}</p>
        </div>
        
        <div class="modal-section">
            <h3>Key Features</h3>
            <ul class="feature-list">
                ${project.features.map((feature) => `<li>${feature}</li>`).join("")}
            </ul>
        </div>
        
        <div class="modal-section">
            <h3>Technologies Used</h3>
            <div class="tech-grid">
                ${project.technologies
                  .map(
                    (tech) => `
                    <div class="tech-card">
                        <h4>${tech.name}</h4>
                        <p>${tech.description}</p>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        </div>
        
        <div class="modal-section">
            <h3>Challenges & Solutions</h3>
            <ul class="challenge-list">
                ${project.challenges.map((challenge) => `<li>${challenge}</li>`).join("")}
            </ul>
        </div>
        
        <div class="modal-section">
            <h3>Results & Impact</h3>
            <div class="results-grid">
                ${project.results
                  .map(
                    (result) => `
                    <div class="result-card">
                        <p>${result}</p>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        </div>
    `
}

// Setup event listeners
function setupEventListeners() {
  // Modal close events
  if (modalClose) {
    modalClose.addEventListener("click", closeProjectModal)
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        closeProjectModal()
      }
    })
  }

  // Escape key to close modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay && modalOverlay.classList.contains("active")) {
      closeProjectModal()
    }
  })

  // Back to top button
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
  }

  // Show/hide back to top button on scroll
  window.addEventListener("scroll", () => {
    if (backToTop) {
      if (window.pageYOffset > 300) {
        backToTop.classList.add("visible")
      } else {
        backToTop.classList.remove("visible")
      }
    }
  })
}

// Handle image errors
function handleImageError(img) {
  img.src = "https://via.placeholder.com/600x400/e2e8f0/64748b?text=Project+Image"
  img.alt = "Project image placeholder"
}

// Global error handler for debugging
window.addEventListener("error", (e) => {
  console.error("Global error:", e.error)
})

// Log when scripts are loaded
console.log("Script.js loaded successfully")
