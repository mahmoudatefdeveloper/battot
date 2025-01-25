// Initialize Lucide icons
lucide.createIcons();

// Animate elements on page load
document.addEventListener('DOMContentLoaded', () => {
  // Animate header
  const header = document.getElementById('header');
  setTimeout(() => {
    header.classList.add('fade-in');
  }, 100);

  // Animate gallery if it exists
  const gallery = document.getElementById('gallery');
  if (gallery) {
    setTimeout(() => {
      gallery.classList.add('fade-in');
    }, 300);
  }

  // Animate contact form if it exists
  const contact = document.getElementById('contact');
  if (contact) {
    setTimeout(() => {
      contact.classList.add('slide-up');
    }, 500);
  }
});

// Handle form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('تم إرسال رسالتك بنجاح!');
    e.target.reset();
  });
}