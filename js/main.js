//Stats
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".stats__block-number");
    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ""), 10);
            const speed = target / 150;

            let count = 0;

            const updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.textContent = Math.ceil(count) + (counter.textContent.includes('%') ? '%' : '');
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = target + (counter.textContent.includes('%') ? '%' : '');
                }
            };
            updateCount();
        });
    }
    animateCounters();
});

// Swiper
document.addEventListener("DOMContentLoaded", function() {
    new Swiper(".swiper", {
        slidesPerView: 4,
        spaceBetween: 20,
        loop: false,
        scrollbar: {
            el: ".swiper-scrollbar",
            draggable: true,
            hide: false
        },
        watchOverflow: true,
        breakpoints: {
            0: {
                slidesPerView: 1,
                width: 299,
                height: 208,
                spaceBetween: 0
            },
            599: {
                slidesPerView: 4,
                spaceBetween: 20
            },
        }
    });
});

//Accordion
document.addEventListener("DOMContentLoaded", () => {
    const headers = document.querySelectorAll(".accordion-header");
    const firstHeader = headers[0];
    const firstContent = firstHeader.nextElementSibling;
    const firstIcon = firstHeader.querySelector(".accordion-icon");
    firstHeader.classList.add("active");
    firstContent.classList.add("active");
    firstContent.style.display = "block";
    firstIcon.classList.add("rotated");
    headers.forEach(header => {
        header.addEventListener("click", () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector(".accordion-icon");
            const isActive = content.classList.contains("active");
            document.querySelectorAll(".accordion-content").forEach(item => {
                item.classList.remove("active");
                item.style.display = "none";
            });
            document.querySelectorAll(".accordion-icon").forEach(icon => {
                icon.classList.remove("rotated");
            });
            document.querySelectorAll(".accordion-header").forEach(header => {
                header.classList.remove("active");
            });
            if (!isActive) {
                content.classList.add("active");
                content.style.display = "block";
                icon.classList.add("rotated");
                header.classList.add("active");
            }
        });
    });
});

//Form
document.addEventListener("DOMContentLoaded", function () {
    const formButton = document.querySelector(".button__form");
    const emailInput = document.querySelector(".head__email-form");
    const messageBlock = document.querySelector(".form-message");

    formButton.addEventListener("click", function (event) {
        event.preventDefault();
        const email = emailInput.value.trim();
        if (!email) {
            messageBlock.textContent = "Введите e-mail!";
            messageBlock.style.color = "red";
            return;
        }
        fetch("send.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `email=${encodeURIComponent(email)}`
        })
            .then(response => response.text())
            .then(result => {
                if (result === "success") {
                    messageBlock.textContent = "Заявка отправлена";
                    messageBlock.style.color = "green";
                    emailInput.value = "";
                } else if (result === "invalid") {
                    messageBlock.textContent = "Неверный e-mail";
                    messageBlock.style.color = "red";
                } else {
                    messageBlock.textContent = "Ошибка";
                    messageBlock.style.color = "red";
                }
            })
            .catch(error => {
                messageBlock.textContent = "Ошибка";
                messageBlock.style.color = "red";
            });
    });
});

//Burger
const burgerMenu = document.querySelector('.burger__menu');
const navList = document.querySelector('.nav__list');
burgerMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
    burgerMenu.classList.toggle('active');
});



