document.querySelectorAll('.accordion_trigger').forEach((trigger) => {
  const parentItem = trigger.closest('.header_container_nav_item');
  const menu = parentItem.querySelector('.accordion_menu');

  // クリックで開閉
  trigger.addEventListener('click', (e) => {
    e.preventDefault();

    if (parentItem.classList.contains('is-open')) {
      const currentHeight = menu.scrollHeight;
      menu.style.height = `${currentHeight}px`;
      requestAnimationFrame(() => {
        menu.style.height = '0px';
        parentItem.classList.remove('is-open');
      });
    } else {
      menu.style.display = 'flex';
      menu.style.height = 'auto';
      const fullHeight = menu.scrollHeight;
      menu.style.height = '0px';
      parentItem.classList.add('is-open');
      requestAnimationFrame(() => {
        menu.style.height = `${fullHeight}px`;
      });
    }

    menu.addEventListener(
      'transitionend',
      () => {
        if (parentItem.classList.contains('is-open')) {
          menu.style.height = 'auto';
        } else {
          menu.style.display = 'none';
        }
      },
      { once: true }
    );
  });

  // --- 追加：ホバーで開閉 ---
  parentItem.addEventListener('mouseenter', () => {
    if (!parentItem.classList.contains('is-open')) {
      menu.style.display = 'flex';
      menu.style.height = 'auto';
      const fullHeight = menu.scrollHeight;
      menu.style.height = '0px';
      parentItem.classList.add('is-open');
      requestAnimationFrame(() => {
        menu.style.height = `${fullHeight}px`;
      });
    }
  });

  parentItem.addEventListener('mouseleave', () => {
    if (parentItem.classList.contains('is-open')) {
      const currentHeight = menu.scrollHeight;
      menu.style.height = `${currentHeight}px`;
      requestAnimationFrame(() => {
        menu.style.height = '0px';
        parentItem.classList.remove('is-open');
      });

      menu.addEventListener(
        'transitionend',
        () => {
          menu.style.display = 'none';
        },
        { once: true }
      );
    }
  });
});
