// Initialize Lucide icons
lucide.createIcons();

// Animate elements on page load
document.addEventListener('DOMContentLoaded', () => {
  // Animate header
  const header = document.getElementById('header');
  setTimeout(() => {
    header.classList.add('fade-in');
    header.style.transform = 'translateY(0)';
    header.style.opacity = '1';
  }, 100);

  // Animate projects
  const projects = document.getElementById('projects');
  setTimeout(() => {
    projects.classList.add('fade-in');
  }, 300);

  // Animate contact form
  const contact = document.getElementById('contact');
  setTimeout(() => {
    contact.classList.add('slide-up');
  }, 500);
});

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  
  // Here you would typically send the data to your backend
  console.log('Form submitted:', data);
  
  // Show success message
  alert('تم إرسال رسالتك بنجاح!');
  e.target.reset();
});