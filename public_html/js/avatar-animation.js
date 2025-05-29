document.addEventListener('DOMContentLoaded', function() {
    const avatar = document.querySelector('.linkedin-avatar');
    const links = document.querySelectorAll('.icon-links a');

    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const url = this.href;

        avatar.classList.add('spin-off');

        setTimeout(() => {
          window.open(url, '_blank');
          avatar.classList.remove('spin-off');
        }, 1000);
      });
    });
  });
