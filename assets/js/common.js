// Shared utilities for all PDF tools

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function showStatus(msg, type) {
  const el = document.getElementById('status');
  if (!el) return;
  el.className = 'status ' + (type || 'info');
  el.textContent = msg;
  el.classList.remove('hidden');
}

function hideStatus() {
  const el = document.getElementById('status');
  if (el) el.classList.add('hidden');
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function setupDropzone(dropzoneEl, fileInputEl, onFiles, accept) {
  dropzoneEl.addEventListener('click', () => fileInputEl.click());

  dropzoneEl.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzoneEl.classList.add('dragover');
  });

  dropzoneEl.addEventListener('dragleave', () => {
    dropzoneEl.classList.remove('dragover');
  });

  dropzoneEl.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzoneEl.classList.remove('dragover');
    const files = Array.from(e.dataTransfer.files).filter(f =>
      !accept || f.type === accept || f.name.toLowerCase().endsWith('.pdf')
    );
    if (files.length) onFiles(files);
  });

  fileInputEl.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    if (files.length) onFiles(files);
    fileInputEl.value = '';
  });
}

function renderFileItem(file, index, onRemove, onMoveUp, onMoveDown) {
  const item = document.createElement('div');
  item.className = 'file-item';
  item.innerHTML = `
    <div class="file-icon">PDF</div>
    <div class="file-info">
      <div class="file-name"></div>
      <div class="file-size"></div>
    </div>
    <div class="file-actions"></div>
  `;
  item.querySelector('.file-name').textContent = file.name;
  item.querySelector('.file-size').textContent = formatBytes(file.size);

  const actions = item.querySelector('.file-actions');
  if (onMoveUp) {
    const up = document.createElement('button');
    up.className = 'icon-btn';
    up.textContent = '↑';
    up.title = 'Move up';
    up.onclick = () => onMoveUp(index);
    actions.appendChild(up);
  }
  if (onMoveDown) {
    const down = document.createElement('button');
    down.className = 'icon-btn';
    down.textContent = '↓';
    down.title = 'Move down';
    down.onclick = () => onMoveDown(index);
    actions.appendChild(down);
  }
  if (onRemove) {
    const rm = document.createElement('button');
    rm.className = 'icon-btn';
    rm.textContent = '×';
    rm.title = 'Remove';
    rm.onclick = () => onRemove(index);
    actions.appendChild(rm);
  }
  return item;
}
