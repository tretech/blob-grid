const grid = document.getElementById('grid');
const search = document.getElementById('search');

function renderGrid(filter = '') {
  grid.innerHTML = '';
  terms.filter(entry => entry.term.toLowerCase().includes(filter.toLowerCase())).forEach((entry) => {
    const blob = document.createElement('div');
    blob.className = 'blob';
    blob.innerHTML = `<div class="term">${entry.term}</div><div class="definition">${entry.definitions[0]}</div>`;

    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy Definition';
    copyBtn.className = 'copy-btn';
    copyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const def = blob.querySelector('.definition').textContent;
      navigator.clipboard.writeText(def).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = 'Copy Definition', 1000);
      });
    });
    blob.appendChild(copyBtn);

    let defIndex = 0;
    let interval = null;

    blob.addEventListener('click', () => {
      document.querySelectorAll('.blob').forEach(b => b.classList.remove('active'));
      blob.classList.add('active');
    });

    blob.addEventListener('mousedown', () => {
      interval = setInterval(() => {
        defIndex = (defIndex + 1) % entry.definitions.length;
        blob.querySelector('.definition').textContent = entry.definitions[defIndex];
      }, 1000);
    });

    blob.addEventListener('mouseup', () => {
      clearInterval(interval);
      defIndex = 0;
      blob.querySelector('.definition').textContent = entry.definitions[0];
    });

    grid.appendChild(blob);
  });
}

renderGrid();

search.addEventListener('input', () => {
  renderGrid(search.value);
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.blob')) {
    document.querySelectorAll('.blob').forEach(b => b.classList.remove('active'));
  }
});
