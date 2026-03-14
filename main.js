/* ============================================
   ULTIMATE 3D PORTFOLIO - ANANT TYAGI
   Complete JavaScript - All Animations & Logic
   ============================================ */

// Immediate execution test
console.log('=== MAIN.JS LOADED SUCCESSFULLY ===');
console.log('Current time:', new Date().toLocaleTimeString());

// ===== Wait for DOM =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    
    try {
        initPreloader();
        initCustomCursor();
        initThreeJS();
        initParticles();
        initNavigation();
        initTyped();
        initScrollAnimations();
        initSkillTabs();
        initProjectFilters();
        initTestimonialSlider();
        initContactForm();
        initCounters();
        initMagneticButtons();
        initScrollProgress();
        initTiltElements();
        initMobileMenu();
        
        console.log('All initializations complete');
    } catch (error) {
        console.error('Initialization error:', error);
        // Force remove preloader if there's an error
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('loaded');
            document.body.style.overflow = 'auto';
        }
    }
});

// ============================================
// PRELOADER
// ============================================
// PRELOADER
// ============================================
function initPreloader() {
    console.log('Initializing preloader...');
    const preloader = document.getElementById('preloader');
    const counter = document.getElementById('preloader-count');
    const bar = document.getElementById('preloader-bar');
    
    if (!preloader) {
        console.error('Preloader element not found!');
        return;
    }
    
    let count = 0;

    const interval = setInterval(() => {
        count++;
        if (counter) counter.textContent = count;
        if (bar) bar.style.width = count + '%';

        if (count >= 100) {
            clearInterval(interval);
            console.log('Preloader complete, hiding...');
            setTimeout(() => {
                if (preloader) {
                    preloader.classList.add('loaded');
                    document.body.style.overflow = 'auto';
                    console.log('Preloader hidden');

                    // Trigger hero animations after preloader
                    setTimeout(() => {
                        triggerHeroAnimations();
                    }, 300);
                }
            }, 500);
        }
    }, 20);

    // Prevent scroll during preloader
    document.body.style.overflow = 'hidden';
    
    // Safety timeout - force hide preloader after 5 seconds
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('loaded')) {
            console.warn('Preloader timeout - forcing hide');
            clearInterval(interval);
            preloader.classList.add('loaded');
            document.body.style.overflow = 'auto';
            triggerHeroAnimations();
        }
    }, 5000);
}

function triggerHeroAnimations() {
    const revealElements = document.querySelectorAll('.hero-section .reveal-up');
    revealElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('revealed');
        }, index * 150);
    });
}

// ============================================
// CUSTOM CURSOR
// ============================================
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');

    if (!cursor || !follower) return;
    if (window.innerWidth <= 768) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Cursor - fast follow
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Follower - slower follow
        followerX += (mouseX - followerX) * 0.08;
        followerY += (mouseY - followerY) * 0.08;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects
    const interactiveElements = document.querySelectorAll(
        'a, button, .btn, .skill-card, .project-card, .service-card, .contact-card, .magnetic-btn, input, textarea'
    );

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.classList.add('hover');
            cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });
        el.addEventListener('mouseleave', () => {
            follower.classList.remove('hover');
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
    });
}

// ============================================
// THREE.JS 3D BACKGROUND
// ============================================
function initThreeJS() {
    const container = document.getElementById('three-container');
    if (!container) {
        console.warn('Three.js container not found');
        return;
    }
    
    if (!window.THREE) {
        console.warn('Three.js library not loaded');
        return;
    }
    
    try {
        const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create floating geometric shapes
    const geometries = [];
    const materials = [
        new THREE.MeshBasicMaterial({ color: 0x6c63ff, wireframe: true, transparent: true, opacity: 0.15 }),
        new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.12 }),
        new THREE.MeshBasicMaterial({ color: 0xff6b9d, wireframe: true, transparent: true, opacity: 0.1 })
    ];

    // Icosahedrons
    for (let i = 0; i < 5; i++) {
        const geometry = new THREE.IcosahedronGeometry(Math.random() * 1.5 + 0.5, 1);
        const material = materials[Math.floor(Math.random() * materials.length)];
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 15 - 5
        );

        mesh.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );

        mesh.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.005,
                y: (Math.random() - 0.5) * 0.005,
                z: (Math.random() - 0.5) * 0.003
            },
            floatSpeed: Math.random() * 0.003 + 0.001,
            floatOffset: Math.random() * Math.PI * 2,
            originalY: mesh.position.y
        };

        scene.add(mesh);
        geometries.push(mesh);
    }

    // Octahedrons
    for (let i = 0; i < 4; i++) {
        const geometry = new THREE.OctahedronGeometry(Math.random() * 1 + 0.3, 0);
        const material = materials[Math.floor(Math.random() * materials.length)];
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(
            (Math.random() - 0.5) * 18,
            (Math.random() - 0.5) * 18,
            (Math.random() - 0.5) * 12 - 5
        );

        mesh.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.008,
                y: (Math.random() - 0.5) * 0.008,
                z: (Math.random() - 0.5) * 0.004
            },
            floatSpeed: Math.random() * 0.004 + 0.002,
            floatOffset: Math.random() * Math.PI * 2,
            originalY: mesh.position.y
        };

        scene.add(mesh);
        geometries.push(mesh);
    }

    // Torus
    for (let i = 0; i < 3; i++) {
        const geometry = new THREE.TorusGeometry(Math.random() * 1 + 0.5, 0.15, 8, 20);
        const material = materials[Math.floor(Math.random() * materials.length)];
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(
            (Math.random() - 0.5) * 16,
            (Math.random() - 0.5) * 16,
            (Math.random() - 0.5) * 10 - 5
        );

        mesh.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.006,
                y: (Math.random() - 0.5) * 0.006,
                z: (Math.random() - 0.5) * 0.003
            },
            floatSpeed: Math.random() * 0.003 + 0.001,
            floatOffset: Math.random() * Math.PI * 2,
            originalY: mesh.position.y
        };

        scene.add(mesh);
        geometries.push(mesh);
    }

    // Dodecahedrons
    for (let i = 0; i < 3; i++) {
        const geometry = new THREE.DodecahedronGeometry(Math.random() * 0.8 + 0.3, 0);
        const material = materials[Math.floor(Math.random() * materials.length)];
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 12 - 5
        );

        mesh.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.007,
                y: (Math.random() - 0.5) * 0.007,
                z: (Math.random() - 0.5) * 0.004
            },
            floatSpeed: Math.random() * 0.005 + 0.002,
            floatOffset: Math.random() * Math.PI * 2,
            originalY: mesh.position.y
        };

        scene.add(mesh);
        geometries.push(mesh);
    }

    // Star field
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 1500;
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100;
        positions[i + 1] = (Math.random() - 0.5) * 100;
        positions[i + 2] = (Math.random() - 0.5) * 50 - 25;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.08,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    camera.position.z = 8;

    // Mouse interaction
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;

    document.addEventListener('mousemove', (e) => {
        targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Animation loop
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        // Smooth mouse follow
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;

        // Rotate and float geometries
        geometries.forEach(mesh => {
            mesh.rotation.x += mesh.userData.rotationSpeed.x;
            mesh.rotation.y += mesh.userData.rotationSpeed.y;
            mesh.rotation.z += mesh.userData.rotationSpeed.z;

            mesh.position.y = mesh.userData.originalY +
                Math.sin(time * mesh.userData.floatSpeed * 100 + mesh.userData.floatOffset) * 0.5;
        });

        // Camera follows mouse slightly
        camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.02;
        camera.position.y += (-mouseY * 1 - camera.position.y) * 0.02;
        camera.lookAt(0, 0, 0);

        // Rotate stars slowly
        stars.rotation.y += 0.0002;
        stars.rotation.x += 0.0001;

        renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    } catch (error) {
        console.error('Three.js initialization error:', error);
    }
}

// ============================================
// PARTICLE CANVAS
// ============================================
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;
    const connectionDistance = 150;
    let mouseParticle = { x: -1000, y: -1000 };

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            // Mouse interaction
            const dx = mouseParticle.x - this.x;
            const dy = mouseParticle.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 200) {
                const force = (200 - distance) / 200;
                this.vx -= (dx / distance) * force * 0.01;
                this.vy -= (dy / distance) * force * 0.01;
            }

            // Speed limit
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > 1.5) {
                this.vx = (this.vx / speed) * 1.5;
                this.vy = (this.vy / speed) * 1.5;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(108, 99, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(108, 99, 255, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }

            // Mouse connections
            const dx = mouseParticle.x - particles[i].x;
            const dy = mouseParticle.y - particles[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 200) {
                const opacity = (1 - distance / 200) * 0.3;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouseParticle.x, mouseParticle.y);
                ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        drawConnections();
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Mouse tracking
    document.addEventListener('mousemove', (e) => {
        mouseParticle.x = e.clientX;
        mouseParticle.y = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
        mouseParticle.x = -1000;
        mouseParticle.y = -1000;
    });

    // Resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Scroll effects
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!hamburger || !overlay) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : 'auto';

        // Animate mobile nav items
        const items = overlay.querySelectorAll('.mobile-nav-list li');
        items.forEach((item, index) => {
            if (overlay.classList.contains('active')) {
                item.style.transitionDelay = (index * 0.08) + 's';
            } else {
                item.style.transitionDelay = '0s';
            }
        });
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);

            hamburger.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';

            if (target) {
                setTimeout(() => {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        });
    });
}

// ============================================
// TYPED.JS
// ============================================
function initTyped() {
    const typedElement = document.getElementById('typed-output');
    if (!typedElement || typeof Typed === 'undefined') return;

    new Typed('#typed-output', {
        strings: [
            'Web Applications',
            'Scalable APIs',
            'Beautiful UIs',
            'Full Stack Solutions',
            'Cloud Architectures',
            'Mobile Apps',
            'Digital Experiences',
            'Open Source Projects'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        startDelay: 1000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

// ============================================
// SCROLL ANIMATIONS (REVEAL)
// ============================================
function initScrollAnimations() {
    const revealElements = document.querySelectorAll(
        '.reveal-up, .reveal-left, .reveal-right'
    );

    // Exclude hero section elements (they animate after preloader)
    const nonHeroElements = Array.from(revealElements).filter(
        el => !el.closest('.hero-section')
    );

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    nonHeroElements.forEach(el => observer.observe(el));

    // Animate skill bars when visible
    const skillFills = document.querySelectorAll('.skill-fill');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillFills.forEach(fill => skillObserver.observe(fill));
}

// ============================================
// SCROLL PROGRESS BAR
// ============================================
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ============================================
// SKILL TABS
// ============================================
function initSkillTabs() {
    const tabs = document.querySelectorAll('.skill-tab');
    const panels = document.querySelectorAll('.skills-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            // Remove active from all
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // Add active to clicked
            tab.classList.add('active');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');

                // Animate skill bars in the new panel
                setTimeout(() => {
                    const fills = targetPanel.querySelectorAll('.skill-fill');
                    fills.forEach(fill => {
                        const width = fill.getAttribute('data-width');
                        fill.style.width = '0%';
                        setTimeout(() => {
                            fill.style.width = width + '%';
                        }, 100);
                    });
                }, 50);
            }
        });
    });

    // Trigger initial tab skill bars
    const activePanel = document.querySelector('.skills-panel.active');
    if (activePanel) {
        const fills = activePanel.querySelectorAll('.skill-fill');
        fills.forEach(fill => {
            fill.style.width = '0%';
        });
    }
}

// ============================================
// PROJECT FILTERS
// ============================================
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    function showCard(card, delay) {
        // Remove any class that could hold opacity:0
        card.classList.remove('hidden', 'reveal-up');
        card.classList.add('revealed');
        // Reset to invisible via inline style, then transition to visible
        card.style.transition = 'none';
        card.style.opacity = '0';
        card.style.transform = 'translateY(24px)';
        card.style.animation = 'none';
        void card.offsetHeight; // force reflow
        card.style.transition = `opacity 0.45s ease ${delay}s, transform 0.45s ease ${delay}s`;
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }

    function hideCard(card) {
        card.classList.add('hidden');
        card.style.transition = '';
        card.style.opacity = '';
        card.style.transform = '';
        card.style.animation = '';
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            let visibleIndex = 0;
            projectCards.forEach((card) => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    showCard(card, visibleIndex * 0.08);
                    visibleIndex++;
                } else {
                    hideCard(card);
                }
            });
        });
    });

    // Trigger "All" on init so every card starts in the correct visible state
    const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if (allBtn) allBtn.click();
}

// ============================================
// TESTIMONIAL SLIDER
// ============================================
function initTestimonialSlider() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.getElementById('prev-test');
    const nextBtn = document.getElementById('next-test');
    let currentSlide = 0;
    let autoSlideInterval;

    if (cards.length === 0) return;

    function showSlide(index) {
        cards.forEach(card => {
            card.classList.remove('active', 'prev');
        });
        dots.forEach(dot => dot.classList.remove('active'));

        // Previous slide
        const prevIndex = (index - 1 + cards.length) % cards.length;
        cards[prevIndex].classList.add('prev');

        // Current slide
        cards[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');

        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % cards.length;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + cards.length) % cards.length;
        showSlide(prev);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetAutoSlide();
        });
    });

    // Auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    showSlide(0);
    startAutoSlide();
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const subject = form.querySelector('#subject').value.trim();
        const message = form.querySelector('#message').value.trim();

        // Basic validation
        if (!name || !email || !subject || !message) {
            showStatus('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showStatus('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        submitBtn.querySelector('.btn-text').textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showStatus('Message sent successfully! I\'ll get back to you soon. 🚀', 'success');
            form.reset();
            submitBtn.querySelector('.btn-text').textContent = originalText;
            submitBtn.disabled = false;

            // Hide status after 5 seconds
            setTimeout(() => {
                if (status) {
                    status.style.display = 'none';
                    status.classList.remove('success', 'error');
                }
            }, 5000);
        }, 2000);
    });

    function showStatus(msg, type) {
        if (!status) return;
        status.textContent = msg;
        status.className = 'form-status ' + type;
        status.style.display = 'block';
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// ============================================
// COUNTERS
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('.counter');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const start = 0;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Ease out cubic
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(start + (target - start) * easeOut);

                    counter.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                }

                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

// ============================================
// MAGNETIC BUTTONS
// ============================================
function initMagneticButtons() {
    if (window.innerWidth <= 768) return;

    const magneticElements = document.querySelectorAll('.magnetic-btn');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

// ============================================
// TILT ELEMENTS
// ============================================
function initTiltElements() {
    if (window.innerWidth <= 768) return;

    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 8,
            speed: 400,
            perspective: 1000,
            glare: false,
            "max-glare": 0.15,
            scale: 1.02,
            gyroscope: false
        });
    }
}

// ============================================
// GSAP SCROLL ANIMATIONS (BONUS)
// ============================================
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax for gradient orbs
    gsap.to('.orb-1', {
        y: -100,
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    gsap.to('.orb-2', {
        y: -80,
        x: 50,
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5
        }
    });

    gsap.to('.orb-3', {
        y: -60,
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 2
        }
    });

    // Marquee speed change on scroll
    gsap.to('.marquee-content', {
        x: '-=200',
        scrollTrigger: {
            trigger: '.marquee-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });

    // Section titles parallax
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            y: 30,
            opacity: 0,
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                end: 'top 60%',
                scrub: 1
            }
        });
    });

    // Timeline cards stagger
    gsap.utils.toArray('.timeline-card').forEach((card, i) => {
        gsap.from(card, {
            x: i % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Service cards stagger
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Project cards stagger
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            y: 80,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.15,
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Footer CTA text reveal
    gsap.from('.footer-cta h2', {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
            trigger: '.footer-cta',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    // Skill cards entrance
    gsap.utils.toArray('.skill-card').forEach((card, i) => {
        gsap.from(card, {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.05,
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    });

    // About image parallax
    const aboutImg = document.querySelector('.about-image-wrapper');
    if (aboutImg) {
        gsap.to(aboutImg, {
            y: -30,
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2
            }
        });
    }

    // Contact cards stagger
    gsap.utils.toArray('.contact-card').forEach((card, i) => {
        gsap.from(card, {
            x: -40,
            opacity: 0,
            duration: 0.7,
            delay: i * 0.15,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });
}

// ============================================
// SMOOTH SCROLL ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offset = 80;
            const position = target.offsetTop - offset;
            window.scrollTo({
                top: position,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// DYNAMIC YEAR IN FOOTER
// ============================================
(function () {
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = new Date().getFullYear();
    });
})();

// ============================================
// EASTER EGG - KONAMI CODE
// ============================================
(function () {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                konamiIndex = 0;
                activateEasterEgg();
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        document.body.style.transition = 'filter 1s ease';
        document.body.style.filter = 'hue-rotate(180deg)';

        setTimeout(() => {
            document.body.style.filter = 'hue-rotate(0deg)';
        }, 3000);

        // Create celebration particles
        for (let i = 0; i < 50; i++) {
            createConfetti();
        }
    }

    function createConfetti() {
        const confetti = document.createElement('div');
        const colors = ['#6c63ff', '#00d4ff', '#ff6b9d', '#ffc107', '#00ff88'];

        confetti.style.cssText = `
            position: fixed;
            top: -10px;
            left: ${Math.random() * 100}vw;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            pointer-events: none;
            z-index: 99999;
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
        `;

        // Add confetti animation
        if (!document.getElementById('confetti-style')) {
            const style = document.createElement('style');
            style.id = 'confetti-style';
            style.textContent = `
                @keyframes confettiFall {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(${Math.random() * 720}deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
})();

// ============================================
// PERFORMANCE: REDUCE ANIMATIONS ON LOW-END
// ============================================
(function () {
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
        document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
        // Disable particles on low-end devices
        const particleCanvas = document.getElementById('particle-canvas');
        if (particleCanvas) particleCanvas.style.display = 'none';
    }

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const threeContainer = document.getElementById('three-container');
        const particleCanvas = document.getElementById('particle-canvas');

        if (threeContainer) threeContainer.style.display = 'none';
        if (particleCanvas) particleCanvas.style.display = 'none';

        // Force reveal all elements
        document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
            el.classList.add('revealed');
        });
    }
})();

// ============================================
//

// ============================================
// SMOOTH PAGE TRANSITIONS
// ============================================
(function () {
    const links = document.querySelectorAll('a:not([href^="#"]):not([target="_blank"])');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            e.preventDefault();
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';

            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });

    // Fade in on page load
    window.addEventListener('pageshow', () => {
        document.body.style.opacity = '1';
    });
})();

// ============================================
// TEXT SPLIT ANIMATION UTILITY
// ============================================
class TextSplitter {
    constructor(element, type = 'chars') {
        this.element = element;
        this.type = type;
        this.originalHTML = element.innerHTML;
    }

    split() {
        const text = this.element.textContent;
        this.element.innerHTML = '';

        if (this.type === 'chars') {
            text.split('').forEach((char, i) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(40px) rotate(10deg)';
                span.style.transition = `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.03}s`;
                this.element.appendChild(span);
            });
        } else if (this.type === 'words') {
            text.split(' ').forEach((word, i) => {
                const span = document.createElement('span');
                span.textContent = word;
                span.style.display = 'inline-block';
                span.style.marginRight = '8px';
                span.style.opacity = '0';
                span.style.transform = 'translateY(30px)';
                span.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.08}s`;
                this.element.appendChild(span);
            });
        }
    }

    animate() {
        const spans = this.element.querySelectorAll('span');
        spans.forEach(span => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0) rotate(0)';
        });
    }

    reset() {
        this.element.innerHTML = this.originalHTML;
    }
}

// ============================================
// SPOTLIGHT / TORCH EFFECT ON CARDS
// ============================================
(function () {
    const spotlightCards = document.querySelectorAll(
        '.skill-card, .service-card, .project-card, .timeline-card, .contact-card'
    );

    spotlightCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--spotlight-x', `${x}px`);
            card.style.setProperty('--spotlight-y', `${y}px`);
            card.style.background = `
                radial-gradient(
                    300px circle at var(--spotlight-x) var(--spotlight-y),
                    rgba(108, 99, 255, 0.06),
                    transparent 60%
                ),
                var(--bg-card)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = 'var(--bg-card)';
        });
    });
})();

// ============================================
// PARALLAX MOUSE MOVEMENT FOR HERO
// ============================================
(function () {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    const layers = [
        { el: hero.querySelector('.orb-1'), speed: 0.02 },
        { el: hero.querySelector('.orb-2'), speed: 0.03 },
        { el: hero.querySelector('.orb-3'), speed: 0.015 },
        { el: hero.querySelector('.hero-content'), speed: 0.005 },
    ];

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const mouseX = e.clientX - rect.left - centerX;
        const mouseY = e.clientY - rect.top - centerY;

        layers.forEach(layer => {
            if (!layer.el) return;
            const x = mouseX * layer.speed;
            const y = mouseY * layer.speed;
            layer.el.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    hero.addEventListener('mouseleave', () => {
        layers.forEach(layer => {
            if (!layer.el) return;
            layer.el.style.transition = 'transform 0.5s ease';
            layer.el.style.transform = 'translate(0, 0)';
            setTimeout(() => {
                layer.el.style.transition = '';
            }, 500);
        });
    });
})();

// ============================================
// RIPPLE EFFECT ON BUTTONS
// ============================================
(function () {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            // Remove existing ripple
            const existingRipple = this.querySelector('.ripple-effect');
            if (existingRipple) existingRipple.remove();

            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleExpand 0.6s ease-out forwards;
                pointer-events: none;
                z-index: 10;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 700);
        });
    });

    // Add ripple animation if not exists
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes rippleExpand {
                0% { transform: scale(0); opacity: 1; }
                100% { transform: scale(4); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
})();

// ============================================
// DYNAMIC GRADIENT FOLLOW CURSOR (HERO)
// ============================================
(function () {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        hero.style.background = `
            radial-gradient(
                600px circle at ${x}% ${y}%,
                rgba(108, 99, 255, 0.04),
                transparent 50%
            ),
            var(--bg-primary)
        `;
    });

    hero.addEventListener('mouseleave', () => {
        hero.style.background = 'var(--bg-primary)';
    });
})();

// ============================================
// INTERSECTION OBSERVER FOR SECTION ANIMATIONS
// ============================================
(function () {
    const sections = document.querySelectorAll('.section');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');

                // Trigger child stagger animations
                const children = entry.target.querySelectorAll(
                    '.reveal-up:not(.revealed), .reveal-left:not(.revealed), .reveal-right:not(.revealed)'
                );

                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('revealed');
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => sectionObserver.observe(section));
})();

// ============================================
// TYPEWRITER EFFECT FOR SECTION TAGS
// ============================================
(function () {
    const tags = document.querySelectorAll('.section-tag');

    const tagObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent;
                el.textContent = '';
                el.style.borderRight = '2px solid var(--accent-primary)';

                let i = 0;
                const interval = setInterval(() => {
                    el.textContent += text[i];
                    i++;
                    if (i >= text.length) {
                        clearInterval(interval);
                        setTimeout(() => {
                            el.style.borderRight = 'none';
                        }, 500);
                    }
                }, 50);

                tagObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    tags.forEach(tag => tagObserver.observe(tag));
})();

// ============================================
// SCROLL-TRIGGERED NUMBER MORPHING
// ============================================
(function () {
    const morphNumbers = document.querySelectorAll('.stat-number.counter');

    morphNumbers.forEach(num => {
        // Add subtle scale pulse after counting
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    num.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        num.style.transform = 'scale(1)';
                    }, 100);
                }
            });
        });

        observer.observe(num, { childList: true, characterData: true, subtree: true });
    });
})();

// ============================================
// TILT CARD 3D DEPTH LAYERS
// ============================================
(function () {
    const depthCards = document.querySelectorAll('.project-card, .service-card');

    depthCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            const icon = card.querySelector('.service-icon, .project-placeholder i');
            const title = card.querySelector('h3, .project-title');

            if (icon) {
                icon.style.transform = `translate(${(x - 0.5) * 15}px, ${(y - 0.5) * 15}px)`;
            }
            if (title) {
                title.style.transform = `translate(${(x - 0.5) * 8}px, ${(y - 0.5) * 8}px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.service-icon, .project-placeholder i');
            const title = card.querySelector('h3, .project-title');

            if (icon) icon.style.transform = 'translate(0, 0)';
            if (title) title.style.transform = 'translate(0, 0)';
        });
    });
})();

// ============================================
// KEYBOARD NAVIGATION ACCESSIBILITY
// ============================================
(function () {
    // Tab focus visual indicator
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });

    // Add focus styles
    const style = document.createElement('style');
    style.textContent = `
        body.keyboard-nav *:focus {
            outline: 2px solid var(--accent-primary) !important;
            outline-offset: 4px !important;
        }
        body:not(.keyboard-nav) *:focus {
            outline: none;
        }
    `;
    document.head.appendChild(style);

    // Escape key closes mobile menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const hamburger = document.getElementById('hamburger');
            const overlay = document.getElementById('mobile-overlay');

            if (overlay && overlay.classList.contains('active')) {
                hamburger.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
})();

// ============================================
// SCROLL VELOCITY BASED EFFECTS
// ============================================
(function () {
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        scrollVelocity = Math.abs(window.scrollY - lastScrollY);
        lastScrollY = window.scrollY;

        if (!ticking) {
            requestAnimationFrame(() => {
                // Skew marquee based on scroll speed
                const marquee = document.querySelector('.marquee-content');
                if (marquee) {
                    const skew = Math.min(scrollVelocity * 0.05, 5);
                    const direction = window.scrollY > lastScrollY ? 1 : -1;
                    marquee.style.transform = `skewX(${skew * direction}deg)`;

                    setTimeout(() => {
                        marquee.style.transform = 'skewX(0deg)';
                    }, 150);
                }

                // Compress nav on fast scroll
                const navbar = document.getElementById('navbar');
                if (navbar && scrollVelocity > 20) {
                    navbar.style.transform = 'translateY(-2px)';
                    setTimeout(() => {
                        navbar.style.transform = 'translateY(0)';
                    }, 200);
                }

                ticking = false;
            });
            ticking = true;
        }
    });
})();

// ============================================
// PROGRESSIVE IMAGE LOADING SIMULATION
// ============================================
(function () {
    const placeholders = document.querySelectorAll('.project-placeholder, .image-placeholder');

    placeholders.forEach(placeholder => {
        // Add shimmer effect
        placeholder.style.position = 'relative';
        placeholder.style.overflow = 'hidden';

        const shimmer = document.createElement('div');
        shimmer.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.03),
                transparent
            );
            animation: shimmerSlide 2s ease-in-out infinite;
            pointer-events: none;
        `;

        placeholder.appendChild(shimmer);
    });

    // Add shimmer animation
    if (!document.getElementById('shimmer-style')) {
        const style = document.createElement('style');
        style.id = 'shimmer-style';
        style.textContent = `
            @keyframes shimmerSlide {
                0% { left: -100%; }
                100% { left: 200%; }
            }
        `;
        document.head.appendChild(style);
    }
})();

// ============================================
// AUTO-ROTATING TECH STACK BADGE
// ============================================
(function () {
    const badge = document.querySelector('.hero-badge span:last-child');
    if (!badge) return;

    const statuses = [
        'Available for Freelance Work',
        'Open to Full-Time Roles',
        'Building Cool Stuff 🚀',
        'Learning Every Day 📚',
        'Coffee + Code ☕',
        'Available for Freelance Work'
    ];

    let currentIndex = 0;

    setInterval(() => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(-10px)';

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % statuses.length;
            badge.textContent = statuses[currentIndex];
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }, 300);
    }, 4000);

    badge.style.transition = 'all 0.3s ease';
})();

// ============================================
// SMOOTH ANCHOR SCROLL WITH OFFSET
// ============================================
(function () {
    // Handles CTA buttons and footer links
    const ctaLinks = document.querySelectorAll('.hero-cta a, .about-cta a, .footer-cta a, .nav-cta');

    ctaLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80;
                const position = target.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({
                    top: position,
                    behavior: 'smooth'
                });
            }
        });
    });
})();

// ============================================
// DYNAMIC COLOR THEME (TIME-BASED)
// ============================================
(function () {
    const hour = new Date().getHours();

    // Slightly adjust accent colors based on time of day
    if (hour >= 6 && hour < 12) {
        // Morning - Warmer tones
        document.documentElement.style.setProperty('--accent-primary', '#7c6cff');
    } else if (hour >= 12 && hour < 18) {
        // Afternoon - Default
        document.documentElement.style.setProperty('--accent-primary', '#6c63ff');
    } else if (hour >= 18 && hour < 22) {
        // Evening - Purple tones
        document.documentElement.style.setProperty('--accent-primary', '#8b5cf6');
    } else {
        // Night - Deeper blue
        document.documentElement.style.setProperty('--accent-primary', '#5b52e0');
    }
})();

// ============================================
// FORM INPUT ANIMATIONS
// ============================================
(function () {
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');

    inputs.forEach(input => {
        // Floating label effect enhancement
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');

            // Add subtle glow
            input.style.boxShadow = '0 0 0 3px rgba(108, 99, 255, 0.1)';
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            input.style.boxShadow = 'none';

            // Check if has value
            if (input.value.trim()) {
                input.parentElement.classList.add('has-value');
            } else {
                input.parentElement.classList.remove('has-value');
            }
        });

        // Character counter for textarea
        if (input.tagName === 'TEXTAREA') {
            const maxLen = 1000;
            const counter = document.createElement('span');
            counter.style.cssText = `
                position: absolute;
                bottom: 8px;
                right: 12px;
                font-size: 0.7rem;
                color: var(--text-tertiary);
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            counter.textContent = `0/${maxLen}`;
            input.parentElement.style.position = 'relative';
            input.parentElement.appendChild(counter);

            input.addEventListener('focus', () => {
                counter.style.opacity = '1';
            });

            input.addEventListener('blur', () => {
                counter.style.opacity = '0';
            });

            input.addEventListener('input', () => {
                const len = input.value.length;
                counter.textContent = `${len}/${maxLen}`;
                counter.style.color = len > maxLen * 0.9 ? 'var(--accent-tertiary)' : 'var(--text-tertiary)';
            });
        }
    });
})();

// ============================================
// LAZY SECTION LOADING INDICATOR
// ============================================
(function () {
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        const sectionId = section.getAttribute('id');
        if (!sectionId) return;

        // Add a subtle entrance line at the top of each section
        const line = document.createElement('div');
        line.style.cssText = `
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 1px;
            background: var(--gradient-1);
            transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 5;
        `;
        section.style.position = 'relative';
        section.appendChild(line);

        const lineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    line.style.width = '100px';
                    setTimeout(() => {
                        line.style.opacity = '0';
                    }, 2000);
                    lineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        lineObserver.observe(section);
    });
})();

// ============================================
// SCROLL-BASED NAVBAR HIDE/SHOW
// ============================================
(function () {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScroll = 0;
    let isScrollingDown = false;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll <= 100) {
            navbar.style.transform = 'translateY(0)';
            return;
        }

        if (currentScroll > lastScroll && !isScrollingDown) {
            // Scrolling down
            isScrollingDown = true;
            navbar.style.transform = 'translateY(-100%)';
            navbar.style.transition = 'transform 0.4s ease';
        } else if (currentScroll < lastScroll && isScrollingDown) {
            // Scrolling up
            isScrollingDown = false;
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
})();

// ============================================
// GOOEY BLOB ANIMATION FOR HERO 3D
// ============================================
(function () {
    const hero3d = document.getElementById('hero-3d');
    if (!hero3d) return;

    // Create animated SVG blob
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 500 500");
    svg.style.cssText = `
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0.4;
    `;

    // Gradient definition
    const defs = document.createElementNS(svgNS, "defs");
    const gradient = document.createElementNS(svgNS, "linearGradient");
    gradient.setAttribute("id", "blobGradient");
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("x2", "100%");
    gradient.setAttribute("y2", "100%");

    const stop1 = document.createElementNS(svgNS, "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", "#6c63ff");

    const stop2 = document.createElementNS(svgNS, "stop");
    stop2.setAttribute("offset", "50%");
    stop2.setAttribute("stop-color", "#00d4ff");

    const stop3 = document.createElementNS(svgNS, "stop");
    stop3.setAttribute("offset", "100%");
    stop3.setAttribute("stop-color", "#ff6b9d");

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    gradient.appendChild(stop3);
    defs.appendChild(gradient);

    // Filter for glow
    const filter = document.createElementNS(svgNS, "filter");
    filter.setAttribute("id", "blobGlow");
    const feGaussian = document.createElementNS(svgNS, "feGaussianBlur");
    feGaussian.setAttribute("stdDeviation", "20");
    feGaussian.setAttribute("result", "coloredBlur");
    const feMerge = document.createElementNS(svgNS, "feMerge");
    const feMergeNode1 = document.createElementNS(svgNS, "feMergeNode");
    feMergeNode1.setAttribute("in", "coloredBlur");
    const feMergeNode2 = document.createElementNS(svgNS, "feMergeNode");
    feMergeNode2.setAttribute("in", "SourceGraphic");
    feMerge.appendChild(feMergeNode1);
    feMerge.appendChild(feMergeNode2);
    filter.appendChild(feGaussian);
    filter.appendChild(feMerge);
    defs.appendChild(filter);

    svg.appendChild(defs);

    // Animated blob path
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("fill", "url(#blobGradient)");
    path.setAttribute("filter", "url(#blobGlow)");
    path.style.transition = 'd 0.5s ease';

    svg.appendChild(path);
    hero3d.appendChild(svg);

    // Animate the blob
    let time = 0;

    function updateBlob() {
        time += 0.005;

        const points = [];
        const numPoints = 8;
        const centerX = 250;
        const centerY = 250;
        const baseRadius = 140;

        for (let i = 0; i < numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 2;
            const noise1 = Math.sin(time * 2 + i * 0.8) * 30;
            const noise2 = Math.cos(time * 1.5 + i * 1.2) * 20;
            const radius = baseRadius + noise1 + noise2;

            points.push({
                x: centerX + Math.cos(angle) * radius,
                y: centerY + Math.sin(angle) * radius
            });
        }

        // Create smooth path using cubic bezier curves
        let d = `M ${points[0].x} ${points[0].y}`;

        for (let i = 0; i < points.length; i++) {
            const current = points[i];
            const next = points[(i + 1) % points.length];
            const nextNext = points[(i + 2) % points.length];

            const cpX1 = current.x + (next.x - points[(i - 1 + points.length) % points.length].x) / 4;
            const cpY1 = current.y + (next.y - points[(i - 1 + points.length) % points.length].y) / 4;
            const cpX2 = next.x - (nextNext.x - current.x) / 4;
            const cpY2 = next.y - (nextNext.y - current.y) / 4;

            d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${next.x} ${next.y}`;
        }

        d += ' Z';
        path.setAttribute('d', d);

        requestAnimationFrame(updateBlob);
    }

    updateBlob();

    // Rotate gradient based on time
    setInterval(() => {
        const rotation = (Date.now() / 50) % 360;
        gradient.setAttribute("gradientTransform", `rotate(${rotation}, 0.5, 0.5)`);
    }, 50);
})();

// ============================================
// FLOATING CODE SNIPPETS (HERO DECORATION)
// ============================================
(function () {
    const heroVisual = document.querySelector('.hero-visual');
    if (!heroVisual || window.innerWidth <= 1024) return;

    const codeSnippets = [
        'const app = express();',
        'function deploy() {}',
        '<div className="hero">',
        'npm run build',
        'git push origin main',
        'docker-compose up',
        'SELECT * FROM users',
        'import React from "react"',
        'async/await',
        'res.json({ success: true })'
    ];

    codeSnippets.forEach((snippet, i) => {
        const el = document.createElement('div');
        el.textContent = snippet;
        el.style.cssText = `
            position: absolute;
            font-family: 'Courier New', monospace;
            font-size: ${Math.random() * 4 + 9}px;
            color: rgba(108, 99, 255, ${Math.random() * 0.15 + 0.05});
            white-space: nowrap;
            pointer-events: none;
            top: ${Math.random() * 80 + 10}%;
            left: ${Math.random() * 80 + 10}%;
            animation: codeFloat${i} ${Math.random() * 10 + 10}s ease-in-out infinite;
            transform: rotate(${Math.random() * 20 - 10}deg);
            z-index: 1;
        `;

        heroVisual.appendChild(el);
    });

    // Add unique animation for each snippet
    const codeStyle = document.createElement('style');
    let animations = '';

    codeSnippets.forEach((_, i) => {
        const randomX = Math.random() * 30 - 15;
        const randomY = Math.random() * 30 - 15;
        animations += `
            @keyframes codeFloat${i} {
                0%, 100% { transform: translate(0, 0) rotate(${Math.random() * 10 - 5}deg); opacity: ${Math.random() * 0.15 + 0.05}; }
                25% { transform: translate(${randomX}px, ${-randomY}px) rotate(${Math.random() * 10 - 5}deg); }
                50% { transform: translate(${-randomX}px, ${randomY}px) rotate(${Math.random() * 10 - 5}deg); opacity: ${Math.random() * 0.2 + 0.08}; }
                75% { transform: translate(${randomX * 0.5}px, ${-randomY * 0.5}px) rotate(${Math.random() * 10 - 5}deg); }
            }
        `;
    });

    codeStyle.textContent = animations;
    document.head.appendChild(codeStyle);
})();

// ============================================
// SKILLS ORBITING ANIMATION (BONUS)
// ============================================
(function () {
    if (typeof gsap === 'undefined') return;

    // Animate skill icons on hover
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        const icon = card.querySelector('.skill-icon');
        if (!icon) return;

        card.addEventListener('mouseenter', () => {
            gsap.to(icon, {
                rotateY: 360,
                duration: 0.6,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                rotateY: 0,
                duration: 0.4,
                ease: 'power2.in'
            });
        });
    });
})();

// ============================================
// CONSOLE BRANDING
// ============================================
(function () {
    const styles = [
        'color: #6c63ff',
        'font-size: 24px',
        'font-weight: bold',
        'text-shadow: 2px 2px 4px rgba(108, 99, 255, 0.3)',
        'padding: 10px'
    ].join(';');

    const subStyles = [
        'color: #00d4ff',
        'font-size: 14px',
        'padding: 5px'
    ].join(';');

    console.log('%c🚀 Anant Tyagi', styles);
    console.log('%cFull Stack Developer | Building the Future', subStyles);
    console.log('%c💡 Interested in working together? Let\'s connect!', 'color: #ff6b9d; font-size: 12px; padding: 5px;');
    console.log('%c📧 anant.tyagi@email.com', 'color: #a0a0b0; font-size: 11px; padding: 3px;');
    console.log('%c⌨️ Try the Konami Code for a surprise! (↑↑↓↓←→←→BA)', 'color: #ffc107; font-size: 11px; padding: 3px;');
})();

// ============================================
// FINAL: PAGE VISIBILITY HANDLER
// ============================================
(function () {
    let documentTitle = document.title;

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            document.title = '👋 Come back! | Anant Tyagi';
        } else {
            document.title = documentTitle;

            // Small welcome back effect
            const cursor = document.getElementById('cursor');
            if (cursor) {
                cursor.style.background = '#00ff88';
                setTimeout(() => {
                    cursor.style.background = 'var(--accent-primary)';
                }, 1000);
            }
        }
    });
})();

// ============================================
// SERVICE WORKER REGISTRATION (PWA READY)
// ============================================
(function () {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // Uncomment below when you have a service-worker.js file
            // navigator.serviceWorker.register('/service-worker.js')
            //     .then(reg => console.log('SW registered:', reg))
            //     .catch(err => console.log('SW registration failed:', err));
        });
    }
})();

// ============================================
// END OF MAIN.JS
// ============================================
console.log('✅ Portfolio loaded successfully!');