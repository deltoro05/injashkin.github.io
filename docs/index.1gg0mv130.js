(function () {
  'use strict';

  const theme = function () {
    function applyTheme(theme) {
      const header = document.querySelector('.header');
      const footer = document.querySelector('.footer');
      const menu = document.querySelector('.menu');

      document.body.classList.remove('theme-auto', 'theme-light', 'theme-dark');
      document.body.classList.add(`theme-${theme}`);

      header.classList.remove('theme-auto', 'theme-light', 'theme-dark');
      header.classList.add(`theme-${theme}`);
      footer.classList.remove('theme-auto', 'theme-light', 'theme-dark');
      footer.classList.add(`theme-${theme}`);
      menu.classList.remove('theme-auto', 'theme-light', 'theme-dark');
      menu.classList.add(`theme-${theme}`);
    }

    const savedTheme = localStorage.getItem('theme') || 'auto';

    applyTheme(savedTheme);

    for (const optionElement of document.querySelectorAll('#theme option')) {
      optionElement.selected = savedTheme === optionElement.value;
    }

    document.querySelector('#theme').addEventListener('change', function () {
      localStorage.setItem('theme', this.value);
      applyTheme(this.value);
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    theme();
  });

})();
