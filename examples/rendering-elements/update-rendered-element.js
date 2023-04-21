const root = ReactDOM.createRoot(
  document.getElementById('root')
);

function tick() {
  const element = (
    <div>
      <h1>Salam Dünya!</h1>
      <h2>Saat: {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  // highlight-next-line
  root.render(element);
}

setInterval(tick, 1000);
