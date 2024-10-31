
class TxtRotate {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.isDeleting = false;
        this.tick();
    }

    tick() {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.querySelector('.wrap').textContent = this.txt;

        let delta = 300 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(() => this.tick(), delta);
    }
}

window.onload = function() {
    const elements = document.getElementsByClassName('txt-rotate');
    for (let i = 0; i < elements.length; i++) {
        const toRotate = elements[i].getAttribute('data-rotate');
        const period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
};
// Obtenez les éléments
const modal = document.getElementById('cvModal');
const cvThumbnail = document.getElementById('cvThumbnail');
const modalImg = document.getElementById('modalCv');
const captionText = document.getElementById('caption');
const closeBtn = document.getElementsByClassName('close')[0];

// Lorsque l'utilisateur clique sur l'image, ouvrez le modal
cvThumbnail.onclick = function(event) {
    event.preventDefault(); // Empêche la redirection par défaut
    modal.style.display = 'block';
    modalImg.src = this.href; // Met à jour la source de l'image
    captionText.innerHTML = this.children[0].alt; // Utilise l'alt de l'image pour la légende
}

// Fermer le modal lorsqu'on clique sur la croix
closeBtn.onclick = function() {
    modal.style.display = 'none';
}

// Fermer le modal si l'utilisateur clique à l'extérieur de l'image
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

// Fonction pour afficher le prochain élément du carousel
function showNextItem() {
    // Réinitialiser toutes les classes actives
    items.forEach(item => item.classList.remove('active'));

    // Calculer l'index suivant
    currentIndex = (currentIndex + 1) % totalItems;

    // Ajouter la classe 'active' à l'élément courant
    items[currentIndex].classList.add('active');

    // Appliquer le défilement horizontal
    document.querySelector('.carousel').style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Défilement automatique toutes les 6 secondes
setInterval(showNextItem, 6000);

// Activer la première citation par défaut
items[0].classList.add('active');

// Afficher le bouton après un certain défilement
window.onscroll = function () {
    const backToTopButton = document.getElementById("backToTop");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};
document.addEventListener("DOMContentLoaded", function () {
    const skillBars = document.querySelectorAll(".skill-bar-chargement");

    // Fonction de remplissage des barres
    function fillBars(entries, observer) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Définissez les largeurs cibles et les valeurs de pourcentage
                const skillLevels = {
                    ".html_skill": 85,
                    ".css_skill": 80,
                    ".javascript_skill": 75
                };

                // Applique les largeurs et anime les pourcentages
                Object.keys(skillLevels).forEach(selector => {
                    const bar = document.querySelector(selector);
                    const targetWidth = skillLevels[selector];
                    bar.style.width = `${targetWidth}%`;

                    // Animation du texte de pourcentage
                    let currentPercentage = 0;
                    const interval = setInterval(() => {
                        if (currentPercentage >= targetWidth) {
                            clearInterval(interval);
                        } else {
                            currentPercentage++;
                            bar.setAttribute("data-percentage", `${currentPercentage}%`);
                            bar.style.setProperty("--percentage", `${currentPercentage}%`);
                        }
                    }, 15);
                });

                // Arrête d'observer une fois l'animation lancée
                observer.unobserve(entry.target);
            }
        });
    }

    // Création de l'observateur
    const observer = new IntersectionObserver(fillBars, {
        threshold: 0.5, // Déclenche l'animation quand 50% de l'élément est visible
    });

    // Observer chaque barre de compétence
    skillBars.forEach((bar) => observer.observe(bar));
});
