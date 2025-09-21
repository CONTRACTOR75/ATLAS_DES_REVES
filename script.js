// Atlas des Rêves - Main Script

// Language data (externalized)
const labels = {
    fr: {
        headerTitle: "Atlas des Rêves",
        addDreamText: "Ajouter mon rêve",
        loadingTitle: "Initialisation de l'Atlas",
        loadingText: "Préparation de votre voyage à travers les rêves...",
        instructionsTitle: "🌟 Navigation",
        instruction1: "Clic gauche + glisser :",
        instruction1Desc: "Faire pivoter la vue",
        instruction2: "Molette :",
        instruction2Desc: "Zoomer/dézoomer",
        instruction3: "Clic droit + glisser :",
        instruction3Desc: "Déplacer la vue",
        instruction4: "Clic sur une étoile :",
        instruction4Desc: "Découvrir un rêve",
        dreamFormTitle: "✨ Partagez votre rêve",
        dreamLabel: "Votre rêve",
        authorLabel: "Votre nom (optionnel)",
        submitDreamText: "🌟 Envoyer mon rêve vers les étoiles",
        successTitle: "Rêve envoyé !",
        successText: "Votre rêve voyage maintenant vers les étoiles...",
        closeDreamText: "Fermer ce rêve",
        tutorialTitle: "Bienvenue sur l'Atlas des Rêves",
        tutorialDescription: "Explorez un univers interactif où chaque étoile représente un rêve partagé par nos visiteurs. Naviguez, découvrez et partagez vos propres rêves.",
        skipTutorialText: "Passer",
        nextTutorialText: "Suivant",
        tutorialStep2Title: "Ajouter un rêve",
        tutorialStep2Desc: "Cliquez sur le bouton 'Ajouter mon rêve' pour partager votre propre rêve avec la communauté.",
        tutorialStep3Title: "Changer de langue",
        tutorialStep3Desc: "Utilisez ce bouton pour changer la langue de l'application selon vos préférences.",
        tutorialStep4Title: "Navigation",
        tutorialStep4Desc: "Utilisez ces commandes pour naviguer dans l'univers des rêves et découvrir les étoiles.",
        finishTutorialText: "Terminer",
        anonymous: "Anonyme",
        dreamId: "Rêve",
        resetViewText: "Réinitialiser la vue"
    },
    en: {
        headerTitle: "Dream Atlas",
        addDreamText: "Add my dream",
        loadingTitle: "Atlas Initialization",
        loadingText: "Preparing your journey through dreams...",
        instructionsTitle: "🌟 Navigation",
        instruction1: "Left click + drag:",
        instruction1Desc: "Rotate view",
        instruction2: "Mouse wheel:",
        instruction2Desc: "Zoom in/out",
        instruction3: "Right click + drag:",
        instruction3Desc: "Pan view",
        instruction4: "Click on a star:",
        instruction4Desc: "Discover a dream",
        dreamFormTitle: "✨ Share your dream",
        dreamLabel: "Your dream",
        authorLabel: "Your name (optional)",
        submitDreamText: "🌟 Send my dream to the stars",
        successTitle: "Dream sent!",
        successText: "Your dream is now traveling to the stars...",
        closeDreamText: "Close this dream",
        tutorialTitle: "Welcome to the Dream Atlas",
        tutorialDescription: "Explore an interactive universe where each star represents a dream shared by our visitors. Navigate, discover and share your own dreams.",
        skipTutorialText: "Skip",
        nextTutorialText: "Next",
        tutorialStep2Title: "Add a dream",
        tutorialStep2Desc: "Click on the 'Add my dream' button to share your own dream with the community.",
        tutorialStep3Title: "Change language",
        tutorialStep3Desc: "Use this button to change the application language according to your preferences.",
        tutorialStep4Title: "Navigation",
        tutorialStep4Desc: "Use these commands to navigate through the dream universe and discover the stars.",
        finishTutorialText: "Finish",
        anonymous: "Anonymous",
        dreamId: "Dream",
        resetViewText: "Reset view"
    },
    de: {
        headerTitle: "Traum Atlas",
        addDreamText: "Meinen Traum hinzufügen",
        loadingTitle: "Atlas Initialisierung",
        loadingText: "Bereite deine Reise durch die Träume vor...",
        instructionsTitle: "🌟 Navigation",
        instruction1: "Linksklick + ziehen:",
        instruction1Desc: "Ansicht drehen",
        instruction2: "Mausrad:",
        instruction2Desc: "Vergrößern/Verkleinern",
        instruction3: "Rechtsklick + ziehen:",
        instruction3Desc: "Ansicht verschieben",
        instruction4: "Auf einen Stern klicken:",
        instruction4Desc: "Entdecke einen Traum",
        dreamFormTitle: "✨ Teile deinen Traum",
        dreamLabel: "Dein Traum",
        authorLabel: "Dein Name (optional)",
        submitDreamText: "🌟 Sende meinen Traum zu den Sternen",
        successTitle: "Traum gesendet!",
        successText: "Dein Traum reist jetzt zu den Sternen...",
        closeDreamText: "Diesen Traum schließen",
        tutorialTitle: "Willkommen beim Traum Atlas",
        tutorialDescription: "Erkunde ein interaktives Universum, in dem jeder Stern einen von unseren Besuchern geteilten Traum repräsentiert. Navigiere, entdecke und teile deine eigenen Träume.",
        skipTutorialText: "Überspringen",
        nextTutorialText: "Weiter",
        tutorialStep2Title: "Traum hinzufügen",
        tutorialStep2Desc: "Klicke auf den 'Meinen Traum hinzufügen' Button, um deinen eigenen Traum mit der Community zu teilen.",
        tutorialStep3Title: "Sprache ändern",
        tutorialStep3Desc: "Verwende diesen Button, um die Sprache der Anwendung nach deinen Vorlieben zu ändern.",
        tutorialStep4Title: "Navigation",
        tutorialStep4Desc: "Verwende diese Befehle, um durch das Traum-Universum zu navigieren und die Sterne zu entdecken.",
        finishTutorialText: "Beenden",
        anonymous: "Anonym",
        dreamId: "Traum",
        resetViewText: "Ansicht zurücksetzen"
    }
};

// Dreams data
const dreamsData = [
    {
        id: 1,
        dream: "Je rêve d'un monde où les arbres parlent et partagent leurs secrets millénaires.",
        author: "Luna",
        x: 2,
        y: 3,
        z: -1,
        color: "#FFD700"
    },
    {
        id: 2,
        dream: "Dans mon rêve, je vole au-dessus des nuages avec des ailes de papillon iridescentes.",
        author: "Morphée",
        x: -3,
        y: 2,
        z: 4,
        color: "#9370DB"
    },
    {
        id: 3,
        dream: "Je rêve d'une bibliothèque infinie où chaque livre contient un univers différent.",
        author: "Onirique",
        x: 1,
        y: -2,
        z: 3,
        color: "#00CED1"
    },
    {
        id: 4,
        dream: "Mon rêve est de danser avec les étoiles dans un ballet cosmique éternel.",
        author: "Céleste",
        x: -2,
        y: 4,
        z: -2,
        color: "#FF69B4"
    },
    {
        id: 5,
        dream: "Je rêve d'un océan de lumière où nagent des créatures faites de pure énergie.",
        author: "Lumineux",
        x: 4,
        y: -1,
        z: 2,
        color: "#20B2AA"
    },
    {
        id: 6,
        dream: "Dans mon rêve, chaque note de musique devient une couleur visible qui peint le ciel.",
        author: "Synesthète",
        x: -1,
        y: 3,
        z: -3,
        color: "#FFB347"
    },
    {
        id: 7,
        dream: "Je rêve de jardins suspendus dans l'espace où poussent des fleurs de cristal.",
        author: "Astral",
        x: 3,
        y: -3,
        z: 1,
        color: "#E6E6FA"
    },
    {
        id: 8,
        dream: "Mon rêve est de pouvoir parler avec les animaux et comprendre leurs sagesses anciennes.",
        author: "Druide",
        x: -4,
        y: 1,
        z: -1,
        color: "#32CD32"
    },
    {
        id: 9,
        dream: "Je rêve d'un monde où les émotions prennent forme et dansent autour de nous.",
        author: "Empathique",
        x: 2,
        y: -4,
        z: 3,
        color: "#FF6347"
    },
    {
        id: 10,
        dream: "Dans mon rêve, je voyage à travers le temps dans une machine faite de pensées pures.",
        author: "Temporel",
        x: 0,
        y: 0,
        z: 5,
        color: "#4169E1"
    },
    {
        id: 11,
        dream: "Je rêve d'une forêt enchantée où chaque feuille raconte une histoire différente.",
        author: "Conteur",
        x: -3,
        y: -2,
        z: 2,
        color: "#8FBC8F"
    },
    {
        id: 12,
        dream: "Mon rêve est de créer des aurores boréales avec mes mains et de les offrir au monde.",
        author: "Artiste",
        x: 1,
        y: 5,
        z: -4,
        color: "#00FFFF"
    }
];

// Global variables
let scene, camera, renderer, controls;
let dreamStars = [];
let backgroundStars = [];
let raycaster, mouse;
let isAnimatingNewStar = false;
let currentLanguage = 'fr';
let tutorialStep = 0;
let tutorialSteps = 4;
let isInitialized = false;

// Variables pour le déplacement des instructions
let isDragging = false;
let dragOffset = { x: 0, y: 0 };

// Variables pour le tutoriel
let currentHighlightedElement = null;

// Helper functions for storage (fallback when localStorage is not available)
function getStorageItem(key) {
    try {
        if (typeof Storage !== 'undefined' && window.localStorage) {
            return localStorage.getItem(key);
        } else {
            if (!window.sessionStorageData) {
                window.sessionStorageData = {};
            }
            return window.sessionStorageData[key] || null;
        }
    } catch (e) {
        if (!window.sessionStorageData) {
            window.sessionStorageData = {};
        }
        return window.sessionStorageData[key] || null;
    }
}

function setStorageItem(key, value) {
    try {
        if (typeof Storage !== 'undefined' && window.localStorage) {
            localStorage.setItem(key, value);
        } else {
            if (!window.sessionStorageData) {
                window.sessionStorageData = {};
            }
            window.sessionStorageData[key] = value;
        }
    } catch (e) {
        if (!window.sessionStorageData) {
            window.sessionStorageData = {};
        }
        window.sessionStorageData[key] = value;
    }
}

// Initialize the application
function init() {
    try {
        console.log('Initialisation de l\'Atlas des Rêves...');

        // Set language based on browser preference if first visit
        if (!getStorageItem('dreamAtlasLanguage')) {
            const browserLang = navigator.language.split('-')[0];
            if (['fr', 'en', 'de'].includes(browserLang)) {
                currentLanguage = browserLang;
            } else {
                currentLanguage = 'en';
            }
            setStorageItem('dreamAtlasLanguage', currentLanguage);
        } else {
            currentLanguage = getStorageItem('dreamAtlasLanguage');
        }

        // Update UI with current language
        updateLanguageUI();

        // Check if Three.js is loaded
        if (typeof THREE === 'undefined') {
            throw new Error('Three.js n\'est pas chargé');
        }

        // Set up Three.js scene
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);

        const container = document.getElementById('canvasContainer');
        if (!container) {
            throw new Error('Container canvas non trouvé');
        }
        container.appendChild(renderer.domElement);

        // Set up camera
        camera.position.set(0, 0, 10);

        // Set up OrbitControls
        if (typeof THREE.OrbitControls === 'undefined') {
            throw new Error('OrbitControls non disponible');
        }

        // S'assurer que les contrôles sont activés
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enabled = true;

        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.rotateSpeed = 0.5;
        controls.enableZoom = true;
        controls.enablePan = true;
        controls.enableRotate = true;
        controls.minDistance = 5;
        controls.maxDistance = 50;

        // Set up lighting
        setupLighting();

        // Create background stars
        createBackgroundStars();

        // Create dream stars
        createDreamStars();

        // Set up raycaster for mouse interaction
        raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();

        // Set up event listeners
        setupEventListeners();

        // Mark as initialized
        isInitialized = true;

        // Hide loading screen and show tutorial
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            }

            // Always show tutorial after loading (first visit or language change)
            setTimeout(() => {
                showTutorial();
            }, 500);
        }, 2000);

        // Start animation loop
        animate();

        console.log('Atlas des Rêves initialisé avec succès');

    } catch (error) {
        handleLoadError(error);
    }
}

// Gestion des erreurs de chargement
function handleLoadError(error) {
    console.error('Erreur de chargement:', error);
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.innerHTML = `
            <div class="loading-card">
                <div class="loading-icon" style="background: #ff4757;">❌</div>
                <h2>Erreur de chargement</h2>
                <p>Impossible de charger l'Atlas des Rêves.</p>
                <p style="font-size: 0.8rem; margin-top: 1rem;">${error.message}</p>
                <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #ff4757; border: none; border-radius: 8px; color: white; cursor: pointer;">
                    Réessayer
                </button>
            </div>
        `;
    }
}

function setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Point light for stars
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);
}

function createBackgroundStars() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.7,
        sizeAttenuation: true
    });

    const starsVertices = [];
    for (let i = 0; i < 3000; i++) {
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        const z = (Math.random() - 0.5) * 200;
        starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    backgroundStars.push(stars);
}

function createDreamStars() {
    dreamsData.forEach((dream) => {
        createDreamStar(dream);
    });
}

function createDreamStar(dream, isNew = false) {
    // Create brighter star material with emission
    const material = new THREE.MeshBasicMaterial({
        color: dream.color,
        transparent: true,
        opacity: 1.0
    });

    // Create star geometry - larger for new stars
    const geometry = new THREE.SphereGeometry(isNew ? 0.15 : 0.1, 32, 32);

    const star = new THREE.Mesh(geometry, material);
    star.position.set(dream.x, dream.y, dream.z);
    star.userData = dream;

    // Add intense glow effect for all stars
    const glowGeometry = new THREE.SphereGeometry(isNew ? 0.25 : 0.2, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: dream.color,
        transparent: true,
        opacity: isNew ? 0.6 : 0.5
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    star.add(glow);

    // Add particles around new stars
    if (isNew) {
        createParticlesAroundStar(star, dream.color);

        // Start from bottom and animate to position
        star.position.y = -20;
        star.scale.set(0, 0, 0);
        star.material.opacity = 0;
        glow.material.opacity = 0;

        // Animate star rising
        animateStarRise(star, dream, glow);
    }

    scene.add(star);
    dreamStars.push(star);

    return star;
}

function createParticlesAroundStar(star, color) {
    const particleCount = 20;
    const particles = new THREE.Group();

    for (let i = 0; i < particleCount; i++) {
        const particleGeometry = new THREE.SphereGeometry(0.02, 16, 16);
        const particleMaterial = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.9
        });

        const particle = new THREE.Mesh(particleGeometry, particleMaterial);

        // Position particles in a sphere around the star
        const radius = 0.4 + Math.random() * 0.3;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;

        particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
        particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
        particle.position.z = radius * Math.cos(phi);

        // Add animation data
        particle.userData = {
            originalX: particle.position.x,
            originalY: particle.position.y,
            originalZ: particle.position.z,
            speed: 0.5 + Math.random() * 1.5,
            offset: Math.random() * Math.PI * 2
        };

        particles.add(particle);
    }

    star.add(particles);
    star.userData.particles = particles;
}

function animateParticles(star, time) {
    if (star.userData.particles) {
        star.userData.particles.children.forEach(particle => {
            const data = particle.userData;
            particle.position.x = data.originalX + Math.sin(time * data.speed + data.offset) * 0.1;
            particle.position.y = data.originalY + Math.cos(time * data.speed + data.offset) * 0.1;
            particle.position.z = data.originalZ + Math.sin(time * data.speed * 0.7 + data.offset) * 0.1;

            // Make particles twinkle
            particle.material.opacity = 0.7 + Math.sin(time * 3 + data.offset) * 0.3;
        });
    }
}

function animateStarRise(star, dream, glow) {
    isAnimatingNewStar = true;

    const startTime = Date.now();
    const duration = 2000; // 2 seconds

    function animateRise() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (cubic bezier)
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        // Animate position
        star.position.y = -20 + (dream.y + 20) * easeProgress;

        // Animate scale
        star.scale.setScalar(easeProgress);

        // Animate opacity
        star.material.opacity = 1.0 * easeProgress;

        // Animate glow
        if (glow) {
            glow.material.opacity = 0.6 * easeProgress;
            glow.scale.setScalar(1 + Math.sin(elapsed * 0.01) * 0.2);
        }

        if (progress < 1) {
            requestAnimationFrame(animateRise);
        } else {
            isAnimatingNewStar = false;
        }
    }

    animateRise();
}

function setupEventListeners() {
    // UI event listeners
    const addDreamBtn = document.getElementById('addDreamBtn');
    const closeDreamBtn = document.getElementById('closeDreamBtn');
    const closeDreamFooterBtn = document.getElementById('closeDreamFooterBtn');
    const closeDreamFormBtn = document.getElementById('closeDreamFormBtn');
    const dreamSubmissionForm = document.getElementById('dreamSubmissionForm');
    const resetViewBtn = document.getElementById('resetViewBtn');
    const languageBtn = document.getElementById('languageBtn');
    const skipTutorialBtn = document.getElementById('skipTutorialBtn');
    const nextTutorialBtn = document.getElementById('nextTutorialBtn');

    if (addDreamBtn) addDreamBtn.addEventListener('click', showDreamForm);
    if (closeDreamBtn) closeDreamBtn.addEventListener('click', hideDreamPopup);
    if (closeDreamFooterBtn) closeDreamFooterBtn.addEventListener('click', hideDreamPopup);
    if (closeDreamFormBtn) closeDreamFormBtn.addEventListener('click', hideDreamForm);
    if (dreamSubmissionForm) dreamSubmissionForm.addEventListener('submit', handleDreamSubmission);
    if (resetViewBtn) resetViewBtn.addEventListener('click', resetView);
    if (languageBtn) languageBtn.addEventListener('click', toggleLanguageDropdown);
    if (skipTutorialBtn) skipTutorialBtn.addEventListener('click', skipTutorial);
    if (nextTutorialBtn) nextTutorialBtn.addEventListener('click', nextTutorialStep);

    // Language selector options
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', () => {
            changeLanguage(option.dataset.lang);
        });
    });

    // Instructions panel drag and toggle
    setupInstructionsDrag();
    const instructionsToggle = document.getElementById('instructionsToggle');
    if (instructionsToggle) {
        instructionsToggle.addEventListener('click', toggleInstructions);
    }

    // Mouse click events for star interaction - IMPORTANT: Ajouter après avoir configuré les contrôles
    if (renderer && renderer.domElement) {
        renderer.domElement.addEventListener('click', onMouseClick);
    }

    // Force la réactivation des contrôles au moindre clic
    renderer.domElement.addEventListener('pointerdown', () => {
        if (controls) controls.enabled = true;
    });


    // Keyboard events
    document.addEventListener('keydown', onKeyDown);

    // Window resize
    window.addEventListener('resize', onWindowResize);

    // Close language dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.language-selector')) {
            const dropdown = document.getElementById('languageDropdown');
            if (dropdown) {
                dropdown.classList.remove('show');
            }
        }
    });
}

// Système de déplacement des instructions
function setupInstructionsDrag() {
    const instructionsPanel = document.getElementById('instructionsPanel');
    const instructionsHeader = instructionsPanel?.querySelector('.instructions-header');

    if (!instructionsPanel || !instructionsHeader) return;

    instructionsHeader.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);

    // Support tactile pour mobile
    instructionsHeader.addEventListener('touchstart', startDrag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', endDrag);
}

function startDrag(e) {
    isDragging = true;
    const instructionsPanel = document.getElementById('instructionsPanel');
    if (instructionsPanel) {
        instructionsPanel.classList.add('dragging');

        const rect = instructionsPanel.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);

        dragOffset.x = clientX - rect.left;
        dragOffset.y = clientY - rect.top;
    }

    e.preventDefault();
}

function drag(e) {
    if (!isDragging) return;

    const instructionsPanel = document.getElementById('instructionsPanel');
    if (!instructionsPanel) return;

    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    let newX = clientX - dragOffset.x;
    let newY = clientY - dragOffset.y;

    // Limites de l'écran
    const maxX = window.innerWidth - instructionsPanel.offsetWidth;
    const maxY = window.innerHeight - instructionsPanel.offsetHeight;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    instructionsPanel.style.left = newX + 'px';
    instructionsPanel.style.top = newY + 'px';
    instructionsPanel.style.right = 'auto';
    instructionsPanel.style.bottom = 'auto';

    e.preventDefault();
}

function endDrag() {
    if (!isDragging) return;

    isDragging = false;
    const instructionsPanel = document.getElementById('instructionsPanel');
    if (instructionsPanel) {
        instructionsPanel.classList.remove('dragging');
    }
}

function toggleInstructions() {
    const content = document.getElementById('instructionsContent');
    const toggle = document.getElementById('instructionsToggle');

    if (content && toggle) {
        content.classList.toggle('collapsed');
        toggle.textContent = content.classList.contains('collapsed') ? '+' : '−';
    }
}

function resetView() {
    if (!controls || !camera) return;

    controls.reset();

    // Animation de retour à la position initiale
    camera.position.set(0, 0, 10);
    controls.update();

    // Effet visuel de confirmation
    const btn = document.getElementById('resetViewBtn');
    if (btn) {
        btn.style.background = 'var(--gradient-nebula)';
        btn.style.color = 'var(--cosmic-deep)';

        setTimeout(() => {
            btn.style.background = '';
            btn.style.color = '';
        }, 1000);
    }
}

function onKeyDown(event) {
    if (!controls || !camera) return;

    // Improved keyboard controls
    switch (event.key) {
        case 'Escape':
            hideDreamPopup();
            hideDreamForm();
            break;
        case 'ArrowLeft':
            controls.rotateLeft(0.5);
            break;
        case 'ArrowRight':
            controls.rotateRight(0.5);
            break;
        case 'ArrowUp':
            controls.rotateUp(0.5);
            break;
        case 'ArrowDown':
            controls.rotateDown(0.5);
            break;
        case '+':
        case '=':
            // Zoom in
            camera.fov -= 5;
            camera.updateProjectionMatrix();
            break;
        case '-':
            // Zoom out
            camera.fov += 5;
            camera.updateProjectionMatrix();
            break;
        case ' ':
            // Reset view
            event.preventDefault();
            resetView();
            break;
    }
}

function onMouseClick(event) {
    if (isAnimatingNewStar || !raycaster || !mouse || !camera || !renderer) return;

    // Ne pas traiter les clics si le tutoriel est actif
    const tutorialOverlay = document.getElementById('tutorialOverlay');
    if (tutorialOverlay && !tutorialOverlay.classList.contains('hidden')) {
        return;
    }

    // Calculate mouse position in normalized device coordinates
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(dreamStars);

    if (intersects.length > 0) {
        const clickedStar = intersects[0].object;
        showDreamPopup(clickedStar.userData);
    }
}

function showDreamPopup(dream) {
    const dreamId = document.getElementById('dreamId');
    const dreamText = document.getElementById('dreamText');
    const dreamAuthor = document.getElementById('dreamAuthor');
    const dreamPopup = document.getElementById('dreamPopup');

    if (dreamId && dreamText && dreamAuthor && dreamPopup) {
        dreamId.textContent = `${labels[currentLanguage].dreamId || 'Rêve'} #${dream.id}`;
        dreamText.textContent = `"${dream.dream}"`;
        dreamAuthor.textContent = `— ${dream.author}`;
        dreamPopup.classList.remove('hidden');
    }
}

function hideDreamPopup() {
    const dreamPopup = document.getElementById('dreamPopup');
    if (dreamPopup) {
        dreamPopup.classList.add('hidden');
    }
}

function showDreamForm() {
    const dreamForm = document.getElementById('dreamForm');
    if (dreamForm) {
        dreamForm.classList.remove('hidden');
    }
}

function hideDreamForm() {
    const dreamForm = document.getElementById('dreamForm');
    const dreamSubmissionForm = document.getElementById('dreamSubmissionForm');

    if (dreamForm) {
        dreamForm.classList.add('hidden');
    }
    if (dreamSubmissionForm) {
        dreamSubmissionForm.reset();
    }
}

function handleDreamSubmission(event) {
    event.preventDefault();

    const dreamInput = document.getElementById('dreamInput');
    const authorInput = document.getElementById('authorInput');

    if (!dreamInput) return;

    const dreamText = dreamInput.value.trim();
    const authorName = authorInput ? (authorInput.value.trim() || labels[currentLanguage].anonymous || 'Anonyme') : 'Anonyme';

    if (!dreamText) return;

    // Hide form
    hideDreamForm();

    // Create new dream data
    const newDream = {
        id: dreamsData.length + 1,
        dream: dreamText,
        author: authorName,
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 8,
        z: (Math.random() - 0.5) * 8,
        color: getRandomColor()
    };

    // Add to dreams data
    dreamsData.push(newDream);

    // Create animated star (brighter and with particles)
    createDreamStar(newDream, true);

    // Show success message
    showSuccessMessage();

    // Log for debugging
    console.log('New dream submitted:', newDream);
}

function getRandomColor() {
    const colors = [
        '#FFD700', '#9370DB', '#00CED1', '#FF69B4', '#20B2AA',
        '#FFB347', '#E6E6FA', '#32CD32', '#FF6347', '#4169E1',
        '#8FBC8F', '#00FFFF', '#DDA0DD', '#98FB98', '#F0E68C'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.classList.remove('hidden');

        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 3000);
    }
}

function toggleLanguageDropdown() {
    const dropdown = document.getElementById('languageDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

function changeLanguage(lang) {
    const previousLanguage = currentLanguage;
    currentLanguage = lang;
    setStorageItem('dreamAtlasLanguage', lang);
    updateLanguageUI();

    const dropdown = document.getElementById('languageDropdown');
    const currentLangElement = document.getElementById('currentLanguage');

    if (dropdown) dropdown.classList.remove('show');
    if (currentLangElement) currentLangElement.textContent = lang.toUpperCase();

    // Show tutorial when language changes (but only if app is initialized)
    if (isInitialized && previousLanguage !== lang) {
        setTimeout(() => {
            showTutorial();
        }, 300);
    }
}

function updateLanguageUI() {
    // Update all text elements with the current language
    if (!labels[currentLanguage]) return;

    Object.keys(labels[currentLanguage]).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = labels[currentLanguage][key];
            } else {
                element.textContent = labels[currentLanguage][key];
            }
        }
    });
}

function showTutorial() {
    tutorialStep = 0;
    updateTutorialStep();
    const tutorialOverlay = document.getElementById('tutorialOverlay');
    if (tutorialOverlay) {
        tutorialOverlay.classList.remove('hidden');
    }
}

function updateTutorialStep() {
    const tutorialTitle = document.getElementById('tutorialTitle');
    const tutorialDescription = document.getElementById('tutorialDescription');
    const tutorialPage = document.getElementById('tutorialPage');
    const nextButton = document.getElementById('nextTutorialBtn');
    const tutorialCard = document.getElementById('tutorialCard');
    const tutorialOverlay = document.getElementById('tutorialOverlay');

    if (!tutorialTitle || !tutorialDescription || !tutorialPage || !nextButton || !tutorialCard) return;

    tutorialPage.textContent = `${tutorialStep + 1}/${tutorialSteps}`;

    // Effacer la mise en évidence précédente
    hideHighlight();

    // Réinitialiser la position de la carte
    tutorialCard.className = 'tutorial-card';

    // S'assurer que les contrôles ne sont pas bloqués pendant le tutoriel
    if (controls) {
        controls.enabled = true;
    }

    // S'assure que le canvas reste cliquable
    if (renderer && renderer.domElement) {
        renderer.domElement.style.pointerEvents = 'auto';
    }


    // Faire en sorte que l'overlay ne bloque pas les interactions 3D
    if (tutorialOverlay) {
        tutorialOverlay.style.pointerEvents = 'none';
        tutorialCard.style.pointerEvents = 'auto';
    }

    switch (tutorialStep) {
        case 0:
            tutorialTitle.textContent = labels[currentLanguage].tutorialTitle;
            tutorialDescription.textContent = labels[currentLanguage].tutorialDescription;
            break;
        case 1:
            tutorialTitle.textContent = labels[currentLanguage].tutorialStep2Title || "Ajouter un rêve";
            tutorialDescription.textContent = labels[currentLanguage].tutorialStep2Desc || "Cliquez sur le bouton 'Ajouter mon rêve' pour partager votre propre rêve avec la communauté.";
            highlightElement('#addDreamBtn');
            tutorialCard.classList.add('positioned-left');
            break;
        case 2:
            tutorialTitle.textContent = labels[currentLanguage].tutorialStep3Title || "Changer de langue";
            tutorialDescription.textContent = labels[currentLanguage].tutorialStep3Desc || "Utilisez ce bouton pour changer la langue de l'application selon vos préférences.";
            highlightElement('#languageBtn');
            tutorialCard.classList.add('positioned-left');
            break;
        case 3:
            tutorialTitle.textContent = labels[currentLanguage].tutorialStep4Title || "Navigation";
            tutorialDescription.textContent = labels[currentLanguage].tutorialStep4Desc || "Utilisez ces commandes pour naviguer dans l'univers des rêves et découvrir les étoiles.";
            highlightElement('#instructionsPanel');
            tutorialCard.classList.add('positioned-left');
            const nextButtonSpan = nextButton.querySelector('span');
            if (nextButtonSpan) {
                nextButtonSpan.textContent = labels[currentLanguage].finishTutorialText || "Terminer";
            }
            break;
    }
}

function highlightElement(selector) {
    const element = document.querySelector(selector);
    if (!element) return;

    const highlight = document.getElementById('tutorialHighlight');
    const spotlight = document.getElementById('tutorialSpotlight');
    if (!highlight || !spotlight) return;

    const rect = element.getBoundingClientRect();

    // Positionner le spotlight (découpe d'ombre)
    const padding = 10;
    spotlight.style.left = (rect.left - padding) + 'px';
    spotlight.style.top = (rect.top - padding) + 'px';
    spotlight.style.width = (rect.width + padding * 2) + 'px';
    spotlight.style.height = (rect.height + padding * 2) + 'px';
    spotlight.classList.remove('hidden');

    // Positionner le highlight (contour doré)
    highlight.style.left = (rect.left - 5) + 'px';
    highlight.style.top = (rect.top - 5) + 'px';
    highlight.style.width = (rect.width + 10) + 'px';
    highlight.style.height = (rect.height + 10) + 'px';
    highlight.classList.remove('hidden');

    currentHighlightedElement = element;

    // Ajouter un effet de brillance temporaire à l'élément
    element.style.boxShadow = '0 0 20px var(--stellar-gold)';
    element.style.transition = 'box-shadow 0.3s ease';
    element.style.zIndex = '104'; // Au-dessus du spotlight
    element.style.position = 'relative';

    setTimeout(() => {
        if (element.style) {
            element.style.boxShadow = '';
        }
    }, 3000);
}

function hideHighlight() {
    const highlight = document.getElementById('tutorialHighlight');
    const spotlight = document.getElementById('tutorialSpotlight');

    if (highlight) {
        highlight.classList.add('hidden');
    }
    if (spotlight) {
        spotlight.classList.add('hidden');
    }

    if (currentHighlightedElement && currentHighlightedElement.style) {
        currentHighlightedElement.style.boxShadow = '';
        currentHighlightedElement.style.zIndex = '';
        currentHighlightedElement.style.position = '';
        currentHighlightedElement = null;
    }
}

function nextTutorialStep() {
    tutorialStep++;

    if (tutorialStep >= tutorialSteps) {
        finishTutorial();
    } else {
        updateTutorialStep();
    }
}

function skipTutorial() {
    finishTutorial();
}

function finishTutorial() {
    const tutorialOverlay = document.getElementById('tutorialOverlay');
    if (tutorialOverlay) {
        tutorialOverlay.classList.add('hidden');
        tutorialOverlay.style.pointerEvents = 'none';
    }
    hideHighlight();
    setStorageItem('dreamAtlasTutorialSeen', 'true');

    // Ajout pour s'assurer que les contrôles sont réactivés
    if (controls) {
        controls.enabled = true;
    }
    if (renderer && renderer.domElement) {
        renderer.domElement.style.pointerEvents = 'auto';
    }
}


function onWindowResize() {
    if (!camera || !renderer) return;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (controls) {
        controls.update();
    }
}

function animate() {
    if (!isInitialized) return;
    requestAnimationFrame(animate);

    // Update controls
    if (controls) {
        controls.update();
    }

    // Animate dream stars
    const time = Date.now() * 0.001;
    dreamStars.forEach((star, index) => {
        if (!isAnimatingNewStar || star !== dreamStars[dreamStars.length - 1]) {
            // Make stars pulse
            const scale = 1 + Math.sin(time * 2 + index) * 0.1;
            star.scale.set(scale, scale, scale);

            // Make stars glow
            if (star.children[0] && star.children[0].material) {
                star.children[0].material.opacity = 0.5 + Math.sin(time * 3 + index) * 0.1;
            }
        }

        // Animate particles for new stars
        if (star.userData.particles) {
            animateParticles(star, time);
        }
    });

    // Animate background stars
    backgroundStars.forEach(stars => {
        stars.rotation.x += 0.0001;
        stars.rotation.y += 0.0002;
    });

    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

// Initialize the application when the page loads
window.addEventListener('load', init);