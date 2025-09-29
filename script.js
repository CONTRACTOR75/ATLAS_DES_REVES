// Atlas des Rêves - Main Script

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


//_________________________SUPABASE INTEGRATION______________________________
// --- CONFIGURATION SUPABASE ---
const SUPABASE_URL = 'https://adtoywryjsxykkzphspq.supabase.co'; // Ex: https://abcdefghijklmn.supabase.co
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkdG95d3J5anN4eWtrenBoc3BxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMDczNzIsImV4cCI6MjA3NDY4MzM3Mn0.wqJ-vqjQWUoY9GTa_tTpJsWKv2nLLQF5v9kO-uxnsio'; // Ex: eyJhbGc...
const supabase = window.supabase; // On l'initialise plus tard
// --- FIN CONFIGURATION SUPABASE ---

// --- [Clean Architecture] COUCHE SERVICE DE STOCKAGE ---

/**
 * Interface/Abstraction pour le stockage des rêves.
 * Tous les services concrets doivent implémenter ces méthodes.
 * Elles sont toutes asynchrones pour préparer l'intégration Supabase.
 */
class DreamStorageService {
    async getDreams() {
        throw new Error("La méthode 'getDreams()' doit être implémentée.");
    }

    async saveDream(dreamData) {
        throw new Error("La méthode 'saveDream()' doit être implémentée.");
    }

    async clearAllDreams() {
        throw new Error("La méthode 'clearAllDreams()' doit être implémentée.");
    }
}

/**
 * Implémentation concrète utilisant localStorage (pour maintenir la logique actuelle).
 * Ceci simule l'asynchronisme d'une requête API.
 */
class LocalDreamStorageService extends DreamStorageService {
    constructor(storageKey = 'dreams') {
        super();
        this.storageKey = storageKey;
    }

    async getDreams() {
        // Retourne une Promise pour simuler une requête API (préparation à Supabase)
        return new Promise(resolve => {
            const dreamsJson = localStorage.getItem(this.storageKey);
            const dreams = dreamsJson ? JSON.parse(dreamsJson) : [];
            resolve(dreams);
        });
    }

    async saveDream(dreamData) {
        return new Promise(async resolve => {
            const dreams = await this.getDreams();
            dreams.push(dreamData);
            localStorage.setItem(this.storageKey, JSON.stringify(dreams));
            // Simule la réponse d'un service externe
            resolve({ data: dreamData, success: true });
        });
    }

    async clearAllDreams() {
        return new Promise(resolve => {
            localStorage.removeItem(this.storageKey);
            resolve({ success: true });
        });
    }
}
/**
 * Implémentation concrète utilisant Supabase pour la persistance des données.
 * Ceci remplace LocalDreamStorageService une fois que le client est configuré.
 */
class SupabaseDreamStorageService extends DreamStorageService {
    constructor(url, anonKey, tableName = 'dreams') {
        super();
        this.supabase = supabase.createClient(url, anonKey);
        this.tableName = tableName;
    }

    async getDreams() {
        console.log("Fetching dreams from Supabase...");

        // Assure-toi que ces noms de colonnes sont exacts dans ta table Supabase !
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('id, dream_text, author_name, pos_x, pos_y, pos_z, star_color'); // <-- VÉRIFIE LES NOMS ICI

        if (error) {
            console.error('Supabase fetch error:', error);
            return [];
        }

        // MAPPING CRUCIAL : Transformation du format DB vers le format App
        const mappedDreams = data.map(dbDream => ({
            id: dbDream.id,
            text: dbDream.dream_text,
            author: dbDream.author_name,

            // C'est la LIGNE LA PLUS IMPORTANTE :
            color: dbDream.star_color, // La colonne DB star_color doit être mappée vers la propriété App 'color'

            position: {
                x: dbDream.pos_x,
                y: dbDream.pos_y,
                z: dbDream.pos_z,
            }
        }));

        return mappedDreams;
    }

    async saveDream(dreamData) {
        console.log("saveDream called !")
        console.log("Saving dream to Supabase...");
        console.log("Dream data to s:", dreamData);
        console.log("Dream color to send:", dreamData.color);

        // 1. Transformation du format de ton application vers le format Supabase
        const dbFormat = {
            dream_text: dreamData.text,
            author_name: dreamData.author,
            pos_x: dreamData.position.x,
            pos_y: dreamData.position.y,
            pos_z: dreamData.position.z,
            star_color: dreamData.color,
        };

        // 2. Insertion dans la table
        const { data, error } = await this.supabase
            .from(this.tableName)
            .insert([dbFormat])
            .select(); // On demande l'objet inséré en retour

        if (error) {
            console.error("Supabase insert error:", error);
            throw new Error(`Erreur d'enregistrement du rêve : ${error.message}`);
        }

        // On peut retourner les données insérées si besoin
        return data ? data[0] : null;
    }

    // Le clearing n'est généralement pas permis en production sur une base publique, 
    // mais on maintient la fonction pour l'interface :
    async clearAllDreams() {
        // Attention : Supabase RLS devrait empêcher cette opération pour un utilisateur public !
        // Pour des raisons de sécurité, cette fonction devrait être réservée à un admin.
        // Pour l'instant, on la laisse vide ou on renvoie une erreur si tu la laisses publique.
        console.warn("La fonction 'clearAllDreams' est désactivée pour des raisons de sécurité Supabase.");
        return { success: false, message: "Opération non autorisée." };
    }
}
// ----------------------------------------------------
// INSTANCIATION : C'EST LA SEULE LIGNE À CHANGER POUR PASSER À SUPABASE !
// ----------------------------------------------------
// Utilise le stockage local pour le moment
// NOUVELLE VERSION :
const dreamStorageService = new SupabaseDreamStorageService(SUPABASE_URL, SUPABASE_ANON_KEY, 'dreams');


/**
 * @TODO: Une fois Supabase configuré, tu remplaceras la ligne ci-dessus par :
 * const dreamStorageService = new SupabaseDreamStorageService(); 
 * (après avoir créé cette nouvelle classe d'implémentation, bien sûr !)
 */

// --- FIN: COUCHE SERVICE DE STOCKAGE ---
// Remplace l'ancienne implémentation
async function addDreamToAtlas(dreamText, authorName) {
    // ... (Le code existant pour générer la position, la couleur, etc. reste ici) ...
    // NOTE : Assure-toi que la variable 'dream' utilisée ci-dessous contient bien
    // toutes les données nécessaires (position, texte, auteur, etc.).

    // Exemple d'objet de rêve (à adapter selon ta structure actuelle)
    const dream = {
        text: dreamText,
        author: authorName || labels[currentLanguage].anonymous,

        x: (Math.random() - 0.5) * 8, // Génération de la position
        y: (Math.random() - 0.5) * 8,
        z: (Math.random() - 0.5) * 8,

        color: getRandomColor() // Génération de la couleur
    };

    try {
        const dreamForSupabase = {
            text: dream.text,
            author: dream.author,
            position: {
                x: dream.x,
                y: dream.y,
                z: dream.z
            },
            color: dream.color
        };

        await dreamStorageService.saveDream(dreamForSupabase);

        // Si l'enregistrement est un succès, continuer la logique THREE.js
        createDreamStar(dream, true);
        displaySuccessMessage();

    } catch (error) {
        // En cas d'erreur de connexion ou d'enregistrement
        console.error("Erreur lors de l'enregistrement du rêve:", error);
        // Tu peux ajouter ici une logique pour notifier l'utilisateur de l'échec
    }
}
// Remplace l'ancienne implémentation
async function loadDreams() {
    try {
        // !!! MODIFICATION CLÉ !!! : Utilisation du service asynchrone
        const dreams = await dreamStorageService.getDreams();

        // Le reste de ta logique de chargement reste intact.
        dreams.forEach(dream => {
            //createNewDreamStar(dream);
            const flatDream = {
                id: dream.id,
                dream: dream.text,  // Attention: createDreamStar utilise "dream", pas "text"
                author: dream.author,
                x: dream.position.x,
                y: dream.position.y,
                z: dream.position.z,
                color: dream.color
            };
            createDreamStar(flatDream);
        });

    } catch (error) {
        console.error("Erreur lors du chargement des rêves:", error);
    }
}
// Si tu as une fonction 'clearDreams' ou 'resetDreams' :
async function clearDreams() {
    try {
        await dreamStorageService.clearAllDreams();
        // ... (Logique existante pour supprimer les étoiles de la scène THREE.js) ...
    } catch (error) {
        console.error("Erreur lors de la suppression des rêves:", error);
    }
}
// DANS script.js (Ajoute ceci quelque part où elle sera globale)
function displaySuccessMessage() {
    const successOverlay = document.getElementById('successOverlay');
    if (successOverlay) {
        successOverlay.classList.remove('hidden');

        // Optionnel : masquer après quelques secondes
        setTimeout(() => {
            successOverlay.classList.add('hidden');
        }, 5000); // 5 secondes
    }
}

// Et assure-toi que ton gestionnaire d'événement pour le bouton "Réinitialiser la vue"
// appelle bien cette fonction de manière asynchrone si nécessaire.

//_________________________SUPABASE INTEGRATION______________________________

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
            if (['fr', 'en', 'de','sw', 'twi','min','ewe','wo','yo','bm','ig','ff','pt_br','it','es','zh','ja','ar'].includes(browserLang)) {
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

function toggleLanguageDropdown() {
    const dropdown = document.getElementById('languageDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
        
        // Détecter si le contenu déborde (pour l'indicateur)
        if (dropdown.classList.contains('show')) {
            setTimeout(() => {
                if (dropdown.scrollHeight > dropdown.clientHeight) {
                    dropdown.classList.add('has-scroll');
                } else {
                    dropdown.classList.remove('has-scroll');
                }
            }, 50);
        }
    }
}

async function createDreamStars() {
    //dreamsData.forEach((dream) => { createDreamStar(dream); });
    await loadDreams();
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
    // Dans setupEventListeners()
const aboutBtn = document.getElementById('aboutBtn');
const aboutBtnText = document.getElementById('aboutButtonHover');
if (aboutBtn) {
    aboutBtn.addEventListener('click', showAboutPanel);
    aboutBtn.addEventListener('mouseleave', hideAboutPanel);
}

function showAboutPanel() {
    const aboutPanel = document.getElementById('aboutPanel');
    if (aboutPanel) {
        aboutPanel.classList.remove('hidden');
        aboutBtnText.classList.add('hidden');
    }
}

function hideAboutPanel() {
    const aboutPanel = document.getElementById('aboutPanel');
    if (aboutPanel) {
        aboutPanel.classList.add('hidden');
        aboutBtnText.classList.remove('hidden');
    }
}
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

// Fonction pour forcer le panel à rester dans l'écran
function constrainPanelToScreen() {
    const instructionsPanel = document.getElementById('instructionsPanel');
    if (!instructionsPanel) return;

    const rect = instructionsPanel.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;

    let needsAdjustment = false;
    let newX = rect.left;
    let newY = rect.top;

    // Vérifier si le panel sort à droite
    if (rect.right > window.innerWidth) {
        newX = maxX - 16; // 16px de marge
        needsAdjustment = true;
    }

    // Vérifier si le panel sort en bas
    if (rect.bottom > window.innerHeight) {
        newY = maxY - 16;
        needsAdjustment = true;
    }

    // Vérifier si le panel sort à gauche
    if (rect.left < 0) {
        newX = 16;
        needsAdjustment = true;
    }

    // Vérifier si le panel sort en haut
    if (rect.top < 80) { // 80px pour éviter le header
        newY = 96; // 80px header + 16px marge
        needsAdjustment = true;
    }

    // Appliquer les corrections si nécessaire
    if (needsAdjustment) {
        instructionsPanel.style.left = newX + 'px';
        instructionsPanel.style.top = newY + 'px';
        instructionsPanel.style.right = 'auto';
        instructionsPanel.style.bottom = 'auto';
    }
}

// Ajouter un écouteur de redimensionnement
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        constrainPanelToScreen();
    }, 100);
});

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
    const activeElement = document.activeElement;
    const isInputActive = activeElement.tagName === 'TEXTAREA' || 
                        activeElement.tagName === 'INPUT';
    
    if (isInputActive) {
        return; // Laisser l'input gérer la touche normalement
    }
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

    if (!dreamInput || !dreamInput.value.trim()) return;

    const dreamText = dreamInput.value.trim();
    const authorName = authorInput ? (authorInput.value.trim() || labels[currentLanguage].anonymous || 'Anonyme') : 'Anonyme';

    // Hide form
    hideDreamForm();

    // Create new dream data

    ///    const newDream = {
    // id: dreamsData.length + 1,
    // dream: dreamText,
    // author: authorName,
    // x: (Math.random() - 0.5) * 8,
    // y: (Math.random() - 0.5) * 8,
    // z: (Math.random() - 0.5) * 8,
    // color: getRandomColor()
    // };
    addDreamToAtlas(dreamText, authorName);

    // Add to dreams data
    //dreamsData.push(newDream);

    // Create animated star (brighter and with particles)
    //createDreamStar(newDream, true);

    // Show success message
    showSuccessMessage();

    // Log for debugging
    console.log('New dream submission triggered for: ', dreamText);
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
        }, 5000);
        //Temps d'apparition du message de soumission de success
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

function disableAllButtonsExceptTutorial() {
    // Sélectionne tous les boutons sauf ceux du tutoriel
    document.querySelectorAll('button:not(.tutorial-btn)').forEach(btn => {
        btn.classList.add('button-disabled-during-tutorial');
    });
}

function enableAllButtons() {
    document.querySelectorAll('.button-disabled-during-tutorial').forEach(btn => {
        btn.classList.remove('button-disabled-during-tutorial');
    });
}

function showTutorial() {
    tutorialStep = 0;
    updateTutorialStep();
    const tutorialOverlay = document.getElementById('tutorialOverlay');
    if (tutorialOverlay) {
        tutorialOverlay.classList.remove('hidden');
    }
    disableAllButtonsExceptTutorial();
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

    const headerElement = document.querySelector('.header');
    if (headerElement) {
        headerElement.style.zIndex = '50'; // Retour à la valeur normale
    }

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

    // Réinitialise le z-index des instructions à chaque étape
    document.querySelectorAll('.instructions').forEach(el => {
        el.style.zIndex = '';
        //el.style.position = '';
    });

    switch (tutorialStep) {
        case 0:
            tutorialTitle.textContent = labels[currentLanguage].tutorialTitle;
            tutorialDescription.textContent = labels[currentLanguage].tutorialDescription;
            break;
        case 1:
            if (headerElement) {
                headerElement.style.zIndex = '105';
            }
            tutorialTitle.textContent = labels[currentLanguage].tutorialStep2Title || "Ajouter un rêve";
            tutorialDescription.textContent = labels[currentLanguage].tutorialStep2Desc || "Cliquez sur le bouton 'Ajouter mon rêve' pour partager votre propre rêve avec la communauté.";
            highlightElement('#addDreamBtn');
            tutorialCard.classList.add('positioned-left');
            break;
        case 2:
            if (headerElement) {
                headerElement.style.zIndex = '105';
            }
            tutorialTitle.textContent = labels[currentLanguage].tutorialStep3Title || "Changer de langue";
            tutorialDescription.textContent = labels[currentLanguage].tutorialStep3Desc || "Utilisez ce bouton pour changer la langue de l'application selon vos préférences.";
            highlightElement('#languageBtn');
            tutorialCard.classList.add('positioned-left');
            break;
        case 3:
            // Étape navigation : on met le z-index élevé sur les instructions
            document.querySelectorAll('.instructions').forEach(el => {
                el.style.zIndex = '105'; // au-dessus du spotlight (z-index: 101)
                //el.style.position = 'relative';
            });
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

    // Ajoute le trou noir autour du spotlight
    spotlight.style.boxShadow = '0 0 0 9999px rgba(0,0,0,0.8), 0 0 20px var(--stellar-gold)';

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

    element.style.zIndex = '105'; // Au-dessus du spotlight
    //element.style.position = 'relative';

    setTimeout(() => {
        if (element.style) {
            element.style.boxShadow = '';
        }
    }, 4000);
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
        //currentHighlightedElement.style.position = '';
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
    enableAllButtons();

    const headerElement = document.querySelector('.header');
    if (headerElement) {
        headerElement.style.zIndex = '50';
    }

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
    constrainPanelToScreen();
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