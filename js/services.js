
(function(){
  const cards = Array.from(document.querySelectorAll('.service-card'));
  const search = document.getElementById('service-search');
  const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));
  function applyFilters(){
    const q = (search && search.value || '').trim().toLowerCase();
    const activeBtn = document.querySelector('.filter-btn.active');
    const active = activeBtn ? activeBtn.dataset.filter : 'all';
    cards.forEach(card => {
      const text = ((card.querySelector('h2')?.textContent || '') + ' ' + (card.querySelector('p')?.textContent || '')).toLowerCase();
      const matchText = !q || text.includes(q);
      const matchCat = active === 'all' || card.dataset.category === active;
      card.style.display = (matchText && matchCat) ? '' : 'none';
    });
  }
  if (search) search.addEventListener('input', applyFilters);
  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilters();
  }));
  const details = {
    'oil-change': 'Includes filter replacement and up to 5L oil. Typical duration: 30–45 min.',
    'brake-inspection': 'Pad wear check, rotor measurement, fluid level. Typical duration: 30–60 min.',
    'tire-rotation': 'Cross-rotation pattern as per drivetrain. Typical duration: 20–30 min.',
    'engine-diagnostics': 'OBD-II scan, live data review. Typical duration: 45–90 min.',
    'ac-service': 'Leak test, refrigerant fill, performance check. Typical duration: 45–60 min.',
    'battery-replacement': 'Load test, terminal cleaning, memory saver. Typical duration: 20–40 min.',
    'detailing': 'Interior vacuum, exterior wash, wax. Typical duration: 60–120 min.',
    'wheel-alignment': 'Four-wheel alignment and road test. Typical duration: 45–75 min.'
  };
  document.addEventListener('click', function(e){
    const btn = e.target.closest('.details-btn');
    if (!btn) return;
    const card = btn.closest('.service-card');
    const key = card.dataset.key;
    const title = card.querySelector('h2')?.textContent || 'Service';
    const msg = details[key] || 'Details available during booking.';
    if (window.app && typeof app.notify === 'function') {
      app.notify(title + ': ' + msg, 'info');
    } else {
      alert(title + '\n' + msg);
    }
  });
})();