class Slideshow {
  constructor() {
    this.currentSlide = 0;
    this.sections = [];
    this.container = null;
    this.init();
  }

  init() {
    // Get all sections from the first details element
    const firstDetails = document.querySelector('details');
    if (!firstDetails) return;

    this.sections = Array.from(firstDetails.querySelectorAll('section'));
    if (this.sections.length === 0) return;

    // Create slideshow container
    this.createContainer();
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyPress(e));
  }

  createContainer() {
    this.container = document.createElement('div');
    this.container.className = 'slideshow-container';
    this.container.style.cssText = `
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: var(--bg, #fff);
      z-index: 10000;
      overflow: hidden;
    `;

    // Create slide wrapper
    this.slideWrapper = document.createElement('div');
    this.slideWrapper.className = 'slide-wrapper';
    this.slideWrapper.style.cssText = `
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      overflow: auto;
    `;

    this.container.appendChild(this.slideWrapper);
    document.body.appendChild(this.container);
  }

  start() {
    this.currentSlide = 0;
    this.container.style.display = 'block';
    this.showSlide();
    document.body.style.overflow = 'hidden';
  }

  exit() {
    this.container.style.display = 'none';
    document.body.style.overflow = '';
  }

  showSlide() {
    // Clear current slide
    this.slideWrapper.innerHTML = '';

    // Clone the section and add it to the slide
    const slideContent = this.sections[this.currentSlide].cloneNode(true);
    
    // Hide aside elements
    const asideElements = slideContent.querySelectorAll('aside');
    asideElements.forEach(aside => aside.style.display = 'none');
    
    slideContent.style.cssText = `
      max-width: 60rem;
      background: var(--article-bg, #f9f9f9);
      padding: 3rem;
      border-radius: 1rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;

    this.slideWrapper.appendChild(slideContent);
  }

  nextSlide() {
    if (this.currentSlide < this.sections.length - 1) {
      this.currentSlide++;
      this.showSlide();
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.showSlide();
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Escape') {
      // Toggle slideshow on/off
      if (this.container.style.display === 'none') {
        this.start();
      } else {
        this.exit();
      }
      return;
    }

    if (this.container.style.display === 'none') return;

    switch(e.key) {
      case 'ArrowLeft':
        this.prevSlide();
        break;
      case 'ArrowRight':
        this.nextSlide();
        break;
    }
  }
}

// Initialize slideshow when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new Slideshow());
} else {
  new Slideshow();
}
