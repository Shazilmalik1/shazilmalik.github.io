/* =========================================
   SHAZIL MALIK PORTFOLIO
   EDITED JAVASCRIPT
========================================= */


/* =========================================
   LOADER
========================================= */

window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.querySelector(".loader");

        if (loader) {
            loader.classList.add("hide");
        }
    }, 900);
});


/* =========================================
   THREE.JS 3D BACKGROUND
   SUBTLE + LIGHTWEIGHT
========================================= */

const canvas = document.getElementById("bg-canvas");

if (canvas && typeof THREE !== "undefined") {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
    );

    camera.position.z = 650;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 1.5)
    );

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    /* =========================================
       PARTICLES
    ========================================= */

    const particleCount = window.innerWidth < 768 ? 350 : 600;

    const particleGeometry = new THREE.BufferGeometry();

    const positions = new Float32Array(
        particleCount * 3
    );

    for (
        let i = 0;
        i < particleCount * 3;
        i += 3
    ) {

        positions[i] =
            (Math.random() - 0.5) * 1800;

        positions[i + 1] =
            (Math.random() - 0.5) * 1200;

        positions[i + 2] =
            (Math.random() - 0.5) * 1000;
    }

    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );


    const particleMaterial =
        new THREE.PointsMaterial({

            color: 0x00d9ff,

            size:
                window.innerWidth < 768
                    ? 1.5
                    : 2,

            transparent: true,

            opacity: 0.45,

            depthWrite: false
        });


    const particles =
        new THREE.Points(
            particleGeometry,
            particleMaterial
        );

    scene.add(particles);


    /* =========================================
       SUBTLE WIREFRAME OBJECTS
    ========================================= */

    const shapes = [];


    function createShape(
        geometry,
        x,
        y,
        z,
        scale
    ) {

        const material =
            new THREE.MeshBasicMaterial({

                color: 0x00d9ff,

                wireframe: true,

                transparent: true,

                opacity: 0.10
            });


        const mesh =
            new THREE.Mesh(
                geometry,
                material
            );


        mesh.position.set(
            x,
            y,
            z
        );


        mesh.scale.set(
            scale,
            scale,
            scale
        );


        mesh.rotation.x =
            Math.random() * Math.PI;

        mesh.rotation.y =
            Math.random() * Math.PI;

        mesh.rotation.z =
            Math.random() * Math.PI;


        scene.add(mesh);

        shapes.push(mesh);
    }


    /* Only a few objects so background
       doesn't become too heavy */

    createShape(
        new THREE.IcosahedronGeometry(70, 1),
        -450,
        180,
        -120,
        1
    );


    createShape(
        new THREE.OctahedronGeometry(55, 1),
        430,
        -160,
        -180,
        1
    );


    createShape(
        new THREE.TorusGeometry(
            65,
            1.5,
            16,
            80
        ),
        0,
        300,
        -250,
        1
    );


    /* =========================================
       MOUSE PARALLAX
    ========================================= */

    let mouseX = 0;
    let mouseY = 0;

    let targetMouseX = 0;
    let targetMouseY = 0;


    window.addEventListener(
        "mousemove",
        (event) => {

            targetMouseX =
                (event.clientX /
                    window.innerWidth -
                    0.5) * 2;

            targetMouseY =
                (event.clientY /
                    window.innerHeight -
                    0.5) * 2;
        }
    );


    /* =========================================
       ANIMATION
    ========================================= */

    function animateBackground() {

        requestAnimationFrame(
            animateBackground
        );


        mouseX +=
            (targetMouseX - mouseX) * 0.03;

        mouseY +=
            (targetMouseY - mouseY) * 0.03;


        particles.rotation.y += 0.00025;

        particles.rotation.x += 0.00008;


        particles.position.x =
            mouseX * 10;

        particles.position.y =
            -mouseY * 8;


        shapes.forEach(
            (shape, index) => {

                shape.rotation.x +=
                    0.0008 + index * 0.00015;

                shape.rotation.y +=
                    0.001 + index * 0.00015;

                shape.position.x +=
                    mouseX * 0.015;

                shape.position.y +=
                    -mouseY * 0.01;
            }
        );


        camera.position.x +=
            (mouseX * 18 -
                camera.position.x) * 0.02;

        camera.position.y +=
            (-mouseY * 12 -
                camera.position.y) * 0.02;


        renderer.render(
            scene,
            camera
        );
    }


    animateBackground();


    /* =========================================
       RESIZE
    ========================================= */

    window.addEventListener(
        "resize",
        () => {

            camera.aspect =
                window.innerWidth /
                window.innerHeight;

            camera.updateProjectionMatrix();


            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );


            renderer.setPixelRatio(
                Math.min(
                    window.devicePixelRatio,
                    1.5
                )
            );
        }
    );
}


/* =========================================
   CUSTOM CURSOR
========================================= */

const cursor =
    document.querySelector(".cursor");

const cursorFollower =
    document.querySelector(
        ".cursor-follower"
    );


let cursorX = 0;
let cursorY = 0;

let followerX = 0;
let followerY = 0;


if (cursor && cursorFollower) {

    window.addEventListener(
        "mousemove",
        (event) => {

            cursorX = event.clientX;
            cursorY = event.clientY;

            cursor.style.transform =
                `translate3d(
                    ${cursorX}px,
                    ${cursorY}px,
                    0
                )`;
        }
    );


    function animateCursor() {

        followerX +=
            (cursorX - followerX) * 0.12;

        followerY +=
            (cursorY - followerY) * 0.12;


        cursorFollower.style.transform =
            `translate3d(
                ${followerX}px,
                ${followerY}px,
                0
            )`;


        requestAnimationFrame(
            animateCursor
        );
    }


    animateCursor();


    const hoverElements =
        document.querySelectorAll(
            "a, button, input, textarea, .gallery-item, .skill-card"
        );


    hoverElements.forEach(
        (element) => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursorFollower.classList.add(
                        "cursor-hover"
                    );
                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    cursorFollower.classList.remove(
                        "cursor-hover"
                    );
                }
            );
        }
    );
}


/* =========================================
   SCROLL REVEAL
   DOWN = FLY IN
   UP = REVERSE
========================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


revealElements.forEach(
    (element, index) => {

        if (index % 3 === 0) {

            element.style.setProperty(
                "--reveal-x",
                "-70px"
            );

            element.style.setProperty(
                "--reveal-rotate",
                "-7deg"
            );

        } else if (index % 3 === 1) {

            element.style.setProperty(
                "--reveal-x",
                "70px"
            );

            element.style.setProperty(
                "--reveal-rotate",
                "7deg"
            );

        } else {

            element.style.setProperty(
                "--reveal-x",
                "0px"
            );

            element.style.setProperty(
                "--reveal-rotate",
                "0deg"
            );
        }
    }
);


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "active"
                        );

                    } else {

                        /*
                         * Remove active when
                         * element leaves viewport.
                         *
                         * This makes animation
                         * happen again when
                         * scrolling back.
                         */

                        entry.target.classList.remove(
                            "active"
                        );
                    }
                }
            );
        },
        {
            threshold: 0.12,

            rootMargin:
                "0px 0px -70px 0px"
        }
    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );
    }
);


/* =========================================
   NAVBAR ACTIVE LINK
========================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


function updateActiveNav() {

    let currentSection = "";

    const scrollPosition =
        window.scrollY + 200;


    sections.forEach(
        (section) => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;


            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute(
                        "id"
                    );
            }
        }
    );


    navLinks.forEach(
        (link) => {

            link.classList.remove(
                "active"
            );


            if (
                link.getAttribute(
                    "href"
                ) === `#${currentSection}`
            ) {

                link.classList.add(
                    "active"
                );
            }
        }
    );
}


window.addEventListener(
    "scroll",
    updateActiveNav
);


updateActiveNav();


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn =
    document.getElementById(
        "menuBtn"
    );

const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


if (menuBtn && mobileMenu) {

    menuBtn.addEventListener(
        "click",
        () => {

            menuBtn.classList.toggle(
                "active"
            );

            mobileMenu.classList.toggle(
                "active"
            );
        }
    );


    const mobileLinks =
        mobileMenu.querySelectorAll(
            "a"
        );


    mobileLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                () => {

                    menuBtn.classList.remove(
                        "active"
                    );

                    mobileMenu.classList.remove(
                        "active"
                    );
                }
            );
        }
    );
}


/* =========================================
   3D PROFILE TILT
========================================= */

const profileCard =
    document.getElementById(
        "profileCard"
    );


if (profileCard) {

    profileCard.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                profileCard.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateY =
                (x - centerX) /
                18;


            const rotateX =
                (centerY - y) /
                18;


            profileCard.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;
        }
    );


    profileCard.addEventListener(
        "mouseleave",
        () => {

            profileCard.style.transform =
                "";
        }
    );
}


/* =========================================
   PROJECT CARD TILT
========================================= */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


projectCards.forEach(
    (card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateY =
                    (x - centerX) / 35;


                const rotateX =
                    (centerY - y) / 35;


                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;
            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";
            }
        );
    }
);


/* =========================================
   GALLERY LIGHTBOX
========================================= */

const galleryItems =
    document.querySelectorAll(
        ".gallery-item"
    );

const lightbox =
    document.getElementById(
        "lightbox"
    );

const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );

const lightboxClose =
    document.getElementById(
        "lightboxClose"
    );


if (
    galleryItems.length &&
    lightbox &&
    lightboxImage
) {

    galleryItems.forEach(
        (item) => {

            item.addEventListener(
                "click",
                () => {

                    const image =
                        item.getAttribute(
                            "data-image"
                        );


                    if (!image) return;


                    lightboxImage.src =
                        image;


                    lightbox.classList.add(
                        "active"
                    );


                    document.body.style.overflow =
                        "hidden";
                }
            );
        }
    );
}


/* =========================================
   CLOSE LIGHTBOX
========================================= */

function closeLightbox() {

    if (!lightbox) return;


    lightbox.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";
}


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );
}


if (lightbox) {

    lightbox.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                lightbox
            ) {

                closeLightbox();
            }
        }
    );
}


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closeLightbox();
        }
    }
);


/* =========================================
   BACK TO TOP
========================================= */

const backTop =
    document.getElementById(
        "backTop"
    );


if (backTop) {

    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 500
            ) {

                backTop.classList.add(
                    "show"
                );

            } else {

                backTop.classList.remove(
                    "show"
                );
            }
        }
    );


    backTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    );
}


/* =========================================
   CONTACT FORM
   SEND TO:
   shazilm824@gmail.com
========================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );

const formMessage =
    document.getElementById(
        "formMessage"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const submitButton =
                contactForm.querySelector(
                    "button[type='submit']"
                );


            const originalButtonText =
                submitButton
                    ? submitButton.innerHTML
                    : "";


            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.innerHTML =
                    `Sending...
                     <i class="fa-solid fa-spinner fa-spin"></i>`;
            }


            if (formMessage) {

                formMessage.textContent =
                    "";

                formMessage.className =
                    "form-message";
            }


            const formData =
                new FormData(
                    contactForm
                );


            /*
             * FormSubmit AJAX
             *
             * Recipient:
             * shazilm824@gmail.com
             */

            try {

                const response =
                    await fetch(
                        "https://formsubmit.co/ajax/shazilm824@gmail.com",
                        {
                            method: "POST",

                            body: formData,

                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                const data =
                    await response.json();


                if (
                    response.ok &&
                    data.success
                ) {

                    if (formMessage) {

                        formMessage.textContent =
                            "Message sent successfully! Thank you.";

                        formMessage.classList.add(
                            "success"
                        );
                    }


                    contactForm.reset();


                } else {

                    throw new Error(
                        "Message could not be sent."
                    );
                }


            } catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );


                if (formMessage) {

                    formMessage.textContent =
                        "Something went wrong. Please try again.";

                    formMessage.classList.add(
                        "error"
                    );
                }

            } finally {

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.innerHTML =
                        originalButtonText;
                }
            }
        }
    );
}


/* =========================================
   YEAR
========================================= */

const yearElement =
    document.getElementById(
        "year"
    );


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();
}


/* =========================================
   SMOOTH SCROLL
========================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(
    (link) => {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute(
                        "href"
                    );


                if (
                    targetId === "#" ||
                    targetId.length <= 1
                ) {

                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                const navbar =
                    document.querySelector(
                        ".navbar"
                    );


                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.pageYOffset -
                    navbarHeight;


                window.scrollTo({

                    top:
                        targetPosition,

                    behavior:
                        "smooth"
                });
            }
        );
    }
);


/* =========================================
   REDUCED MOTION SUPPORT
========================================= */

if (
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches
) {

    document.documentElement.style.setProperty(
        "scroll-behavior",
        "auto"
    );
}