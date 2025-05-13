mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  themeVariables: {
    primaryColor: '#e3f2fd',
    primaryBorderColor: '#90caf9',
    primaryTextColor: '#0d47a1',
    lineColor: '#64b5f6',
    textColor: '#1a237e',
    fontSize: '16px',
    fontFamily: 'Arial'
  },
  flowchart: {
    useMaxWidth: false,
    curve: 'basis'
  },
  layout: 'elk'
});

const container = document.getElementById('container');
const diagram = document.getElementById('diagram');

let scale = 1;
let offsetX = 0, offsetY = 0;
let isDragging = false;
let startX = 0, startY = 0;

function updateTransform() {
  diagram.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
}

container.addEventListener('wheel', (e) => {
  e.preventDefault();

  const zoomSpeed = 0.1;
  const zoomDelta = -e.deltaY * zoomSpeed;

  const newScale = scale * (1 + zoomDelta);
  const rect = diagram.getBoundingClientRect();

  const cursorX = e.clientX - rect.left;
  const cursorY = e.clientY - rect.top;

  offsetX -= cursorX * (newScale - scale) / scale;
  offsetY -= cursorY * (newScale - scale) / scale;

  scale = newScale;

  updateTransform();
}, { passive: false });

container.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  container.style.cursor = 'grabbing';
});

container.addEventListener('mouseup', () => {
  isDragging = false;
  container.style.cursor = 'grab';
});

container.addEventListener('mouseleave', () => {
  isDragging = false;
  container.style.cursor = 'grab';
});

container.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  offsetX += dx;
  offsetY += dy;
  startX = e.clientX;
  startY = e.clientY;
  updateTransform();
});

updateTransform();
