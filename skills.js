(() => {
  const registry = window.SKILLS_REGISTRY;
  const skills = registry.skills;
  const metrics = document.getElementById('heroMetrics');
  const grid = document.getElementById('skillsGrid');
  const search = document.getElementById('skillSearch');
  const statusFilter = document.getElementById('statusFilter');
  const domainFilter = document.getElementById('domainFilter');
  const summary = document.getElementById('registrySummary');
  const dialog = document.getElementById('skillDialog');
  const dialogContent = document.getElementById('dialogContent');
  const dialogClose = document.getElementById('dialogClose');
  const architectureGroups = document.getElementById('architectureGroups');

  metrics.innerHTML = `
    <div class="metric-card"><strong>${registry.counts.total}</strong><span>GOVERNED SKILLS</span></div>
    <div class="metric-card active"><strong>${registry.counts.active}</strong><span>ACTIVE</span></div>
    <div class="metric-card testing"><strong>${registry.counts.testing}</strong><span>TESTING</span></div>
    <div class="metric-card"><strong>v1.x</strong><span>VERSIONED CAPABILITY LAYER</span></div>`;

  document.getElementById('snapshotDate').textContent = registry.generatedAt;

  const domains = [...new Set(skills.map(s => s.domain))].sort();
  domainFilter.insertAdjacentHTML('beforeend', domains.map(d => `<option value="${escapeAttr(d)}">${escapeHtml(d)}</option>`).join(''));

  const featuredGroups = [
    ['Semantic Foundation','Canonical meaning, source reconciliation, provenance, metrics, and scoped context.'],
    ['Reasoning & Intelligence','Research, requirements, verification, comparison, gap analysis, decisions, and documents.'],
    ['Career Intelligence','Opportunity evaluation, career evidence, interview preparation, and truthful ATS tailoring.'],
    ['Operations & Execution','Meeting actions, next actions, plans, operational risk, and controlled execution.'],
    ['Project & Portfolio','Project audits and verified capability-to-evidence mapping.'],
    ['Analytics & Data Science','Data pipeline validation and evidence-aware analytical workflows.'],
    ['Software Engineering','Code review and GitHub governance before publication or merge.'],
    ['Architecture & AI Governance','Architecture review, AI risk, output evaluation, and autonomy controls.'],
    ['Orchestration & Control Plane','Intent routing to the minimum correct skill sequence with lifecycle controls.'],
    ['Knowledge Ingestion','Video and playlist learning with media-access disclosure, verification, and skill mining.'],
    ['Continuous Improvement','Controlled propose-test-verify-revise loops for improving agents and workflows.'],
    ['Transition & Benefits','Evidence-grounded transition requirements, IDES procedure, and benefit scenarios.']
  ];
  architectureGroups.innerHTML = featuredGroups.map(([name,desc]) => {
    const count = skills.filter(s => s.domain === name).length;
    return `<article class="cap-group"><h3>${escapeHtml(name)}</h3><p>${escapeHtml(desc)}</p><span class="group-count">${count || 'CROSS'} SKILL${count === 1 ? '' : 'S'}</span></article>`;
  }).join('');

  function render() {
    const q = search.value.trim().toLowerCase();
    const status = statusFilter.value;
    const domain = domainFilter.value;
    const filtered = skills.filter(skill => {
      const haystack = `${skill.id} ${skill.name} ${skill.domain} ${skill.purpose} ${skill.evaluation}`.toLowerCase();
      return (!q || haystack.includes(q)) && (status === 'all' || skill.status === status) && (domain === 'all' || skill.domain === domain);
    });
    summary.textContent = `${filtered.length} of ${skills.length} skills shown · ${filtered.filter(s=>s.status==='Active').length} Active · ${filtered.filter(s=>s.status==='Testing').length} Testing`;
    grid.innerHTML = filtered.map(skill => `
      <article class="skill-card" tabindex="0" role="button" data-skill="${skill.id}" aria-label="Open ${escapeAttr(skill.name)} details">
        <div class="topline"><span class="skill-id">${skill.id} · v${skill.version}</span><span class="skill-status ${skill.status}">${skill.status.toUpperCase()}</span></div>
        <h3>${escapeHtml(skill.name)}</h3>
        <div class="domain">${escapeHtml(skill.domain)}</div>
        <p>${escapeHtml(skill.purpose)}</p>
        <footer><span>GOVERNED CONTRACT</span><span>VIEW DETAILS →</span></footer>
      </article>`).join('') || `<p class="registry-summary">No skills match the current filters.</p>`;
    grid.querySelectorAll('.skill-card').forEach(card => {
      card.addEventListener('click', () => openSkill(card.dataset.skill));
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSkill(card.dataset.skill); } });
    });
  }

  function openSkill(id) {
    const skill = skills.find(s => s.id === id);
    if (!skill) return;
    dialogContent.innerHTML = `
      <span class="dialog-kicker">${skill.id} · GOVERNED SKILL</span>
      <h2>${escapeHtml(skill.name)}</h2>
      <div class="dialog-meta"><span>v${escapeHtml(skill.version)}</span><span>${escapeHtml(skill.status)}</span><span>${escapeHtml(skill.domain)}</span></div>
      <div class="dialog-section"><b>PURPOSE</b><p>${escapeHtml(skill.purpose)}</p></div>
      <div class="dialog-section"><b>EVALUATION CONTRACT</b><p>${escapeHtml(skill.evaluation)}</p></div>
      <div class="dialog-section"><b>PORTFOLIO INTERPRETATION</b><p>${skill.status === 'Active' ? 'Representative validation has passed and the capability is production-eligible within its existing permission and approval boundaries.' : 'The specification is executable and under governed validation. Testing status is intentionally visible rather than presented as production maturity.'}</p></div>`;
    dialog.showModal();
  }

  [search,statusFilter,domainFilter].forEach(el => el.addEventListener(el === search ? 'input' : 'change', render));
  dialogClose.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  render();

  function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
  function escapeAttr(value) { return escapeHtml(value); }
})();