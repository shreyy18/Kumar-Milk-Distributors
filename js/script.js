function orderNow() {
    alert("Redirecting to the orders page...");
    window.location.href = "orders.html";
}


document.addEventListener("DOMContentLoaded", function () {
    // Highlight active page in navigation
    let currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll("nav ul li a").forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    // Testimonial Slider
    let index = 0;
    const testimonials = document.querySelectorAll(".testimonial");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    function showTestimonial(i) {
        testimonials.forEach(t => t.classList.remove("active"));
        testimonials[i].classList.add("active");
    }

    prevBtn.addEventListener("click", function () {
        index = (index - 1 + testimonials.length) % testimonials.length;
        showTestimonial(index);
    });

    nextBtn.addEventListener("click", function () {
        index = (index + 1) % testimonials.length;
        showTestimonial(index);
    });

    // Auto-slide every 3 seconds
    setInterval(() => {
        index = (index + 1) % testimonials.length;
        showTestimonial(index);
    }, 3000);

    // Initialize first testimonial
    showTestimonial(index);
});
