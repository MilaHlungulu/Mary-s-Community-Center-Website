document.addEventListener('DOMContentLoaded', function() {
// Navigation functionality
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
    
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        navLinks.forEach(l => l.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        
        this.classList.add('active');

        const sectionId = this.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');
            
        if (sectionId === 'home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            window.scrollTo({
                top: document.getElementById(sectionId).offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
    
// Button hover effects
const buttons = document.querySelectorAll('.btn');
    
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        });
    });
});