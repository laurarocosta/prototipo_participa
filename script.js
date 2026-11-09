/* ==========================================================
   Participa Maceió — protótipo da página inicial (versão 2, cores do brasão)
   ========================================================== */
(function () {
  'use strict';

  /* ========================================================
     CICLO: o que muda a cada ano. Troque só este bloco.
     situacao: 'aberta' | 'em-breve' | 'encerrada'
     etapas: true = aberta agora; false = fechada
     ======================================================== */
  var CICLO = {
    orcamento: 2027,                          // ano do orçamento em discussão
    ppa: '2026–2029',                         // período do Plano Plurianual em vigor
    situacao: 'encerrada',
    abertura: '',                             // ex.: '01/08/2027' (usado em 'em-breve')
    encerramento: '25/09/2026',               // último dia da consulta
    etapas: { inscreva: false, conheca: false, priorize: false, proponha: false },
    linkParticipar: '#',
    linkAta: '#',
    // Botões do painel. tipo 'etapa' abre e fecha com o ciclo; 'doc' é um documento do ciclo.
    acessos: [
      { tipo: 'etapa', id: 'inscreva', rotulo: 'Inscreva-se', sub: 'Crie seu cadastro', icone: 'inscreva', link: '#' },
      { tipo: 'etapa', id: 'conheca',  rotulo: 'Conheça',     sub: 'Veja as ações',      icone: 'conheca',  link: '#' },
      { tipo: 'etapa', id: 'priorize', rotulo: 'Priorize',    sub: 'Escolha prioridades', icone: 'priorize', link: '#' },
      { tipo: 'etapa', id: 'proponha', rotulo: 'Proponha',    sub: 'Envie uma ideia',    icone: 'proponha', link: '#' },
      { tipo: 'doc', rotulo: 'PPA', periodo: true, sub: 'Plano de quatro anos', icone: 'doc', link: '#' },
      { tipo: 'doc', rotulo: 'LDO', ano: true, sub: 'Diretrizes do orçamento', icone: 'doc', link: '#' },
      { tipo: 'doc', rotulo: 'PLOA', ano: true, sub: 'Proposta de orçamento', icone: 'doc', link: '#' },
      { tipo: 'doc', rotulo: 'Ata da consulta', sub: 'O que a população indicou', icone: 'doc', link: '#' },
      { tipo: 'doc', rotulo: 'Emenda Cidadã', sub: 'Ações vindas da população', icone: 'emenda', link: '#' },
      { tipo: 'doc', rotulo: 'Certificado', sub: 'Comprove sua participação', icone: 'certificado', link: '#' }
    ],
    // Resultado da consulta anterior (Mensagem do PLOA 2027)
    resultado: {
      ano: 2026,
      intro: 'Na consulta de 2026, as ações mais indicadas pelos participantes foram:',
      pedidos: [
        'Implantação do BRT',
        'Modernização e expansão da iluminação pública',
        'Mais arborização e espaços verdes',
        'Construção e modernização de áreas de esporte e lazer',
        'Pontos, abrigos e paradas do transporte coletivo'
      ],
      nota: '8 em cada 10 indicações vieram com justificativa. Os resultados mostram as prioridades de quem participou e não são uma pesquisa estatística da população.'
    },
    // Regiões administrativas e seus bairros (fonte: página "Regiões Administrativas" do Participa Maceió)
    regioes: [
      ['Poço', 'Jaraguá', 'Ponta da Terra', 'Pajuçara', 'Ponta Verde', 'Jatiúca', 'Mangabeiras'],
      ['Centro', 'Pontal da Barra', 'Trapiche da Barra', 'Prado', 'Ponta Grossa', 'Levada', 'Vergel do Lago'],
      ['Farol', 'Pitanguinha', 'Pinheiro', 'Gruta de Lourdes', 'Canaã', 'Santo Amaro', 'Jardim Petrópolis', 'Ouro Preto'],
      ['Bebedouro', 'Chã de Bebedouro', 'Chã da Jaqueira', 'Bom Parto', 'Petrópolis', 'Santa Amélia', 'Fernão Velho', 'Rio Novo', 'Mutange'],
      ['Jacintinho', 'Feitosa', 'Barro Duro', 'Serraria', 'São Jorge'],
      ['Benedito Bentes', 'Antares'],
      ['Santos Dumont', 'Clima Bom', 'Cidade Universitária', 'Santa Lúcia', 'Tabuleiro do Martins'],
      ['Jacarecica', 'Guaxuma', 'Garça Torta', 'Cruz das Almas', 'Riacho Doce', 'Pescaria', 'Ipioca']
    ]
  };

  /* Para demonstração: index.html?estado=aberta | em-breve | encerrada mostra a página em cada situação */
  (function () {
    var m = /[?&]estado=([a-z-]+)/.exec(location.search);
    if (!m) return;
    CICLO.situacao = m[1];
    var abre = m[1] === 'aberta';
    Object.keys(CICLO.etapas).forEach(function (k) { CICLO.etapas[k] = abre || (m[1] === 'em-breve' && k === 'inscreva'); });
    if (m[1] === 'em-breve' && !CICLO.abertura) CICLO.abertura = 'agosto';
  })();

  var $ = function (id) { return document.getElementById(id); };
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  /* ---------- Situação do ciclo ---------- */
  var SITUACAO = {
    'aberta':    { rotulo: 'Consulta aberta', classe: 'ciclo__status--aberta',
                   texto: 'Indique as ações que você considera prioritárias para Maceió em ' + CICLO.orcamento + '.',
                   prazo: CICLO.encerramento ? 'Participe até <strong>' + CICLO.encerramento + '</strong>' : '',
                   botao: 'Participar agora', link: CICLO.linkParticipar },
    'em-breve':  { rotulo: 'Em breve', classe: 'ciclo__status--breve',
                   texto: 'A consulta do orçamento de ' + CICLO.orcamento + ' vai abrir. Faça sua inscrição para ser avisado.',
                   prazo: CICLO.abertura ? 'Abre em <strong>' + CICLO.abertura + '</strong>' : '',
                   botao: 'Fazer inscrição', link: '#acessos' },
    'encerrada': { rotulo: 'Consulta encerrada', classe: 'ciclo__status--encerrada',
                   texto: 'Obrigado a quem participou! As prioridades indicadas ajudaram a montar a proposta de orçamento de ' + CICLO.orcamento + '.',
                   prazo: CICLO.encerramento ? 'Encerrada em ' + CICLO.encerramento + '. A próxima consulta abre no próximo ciclo.' : '',
                   botao: 'Ver o resultado', link: '#resultado' }
  };
  var s = SITUACAO[CICLO.situacao] || SITUACAO['encerrada'];
  $('ciclo-status').textContent = s.rotulo;
  $('ciclo-status').classList.add(s.classe);
  $('ciclo-ano').textContent = 'Orçamento ' + CICLO.orcamento;
  $('ciclo-titulo').textContent = 'Consulta pública';
  $('ciclo-texto').textContent = s.texto;
  $('ciclo-prazo').innerHTML = s.prazo;
  $('ciclo-botao').textContent = s.botao;
  $('ciclo-botao').setAttribute('href', s.link);
  var chamada = $('chamada-botao'); if (chamada && CICLO.situacao === 'aberta') chamada.setAttribute('href', CICLO.linkParticipar);

  /* ---------- Painel de acessos ---------- */
  var ICONES = {
    inscreva: '<rect x="8" y="6" width="26" height="36" rx="4"/><path d="M14 16h14M14 23h14M14 30h8"/><path d="M33 30l9-9 3 3-9 9h-3z"/>',
    conheca: '<rect x="6" y="6" width="26" height="34" rx="4"/><path d="M12 15h14M12 22h10"/><circle cx="32" cy="30" r="8"/><path d="M38 36l6 6"/>',
    priorize: '<rect x="6" y="28" width="10" height="14" rx="2"/><rect x="19" y="18" width="10" height="24" rx="2"/><rect x="32" y="8" width="10" height="34" rx="2"/><path d="M24 6v6M21 9l3-3 3 3"/>',
    proponha: '<path d="M24 6a10 10 0 0 0-6 18v4h12v-4a10 10 0 0 0-6-18z"/><path d="M19 33h10M21 38h6"/>',
    doc: '<path d="M28 6H14a4 4 0 0 0-4 4v28a4 4 0 0 0 4 4h20a4 4 0 0 0 4-4V16z"/><path d="M28 6v10h10"/><path d="M18 30l4 4 8-8"/>',
    emenda: '<path d="M28 6H14a4 4 0 0 0-4 4v28a4 4 0 0 0 4 4h20a4 4 0 0 0 4-4V16z"/><path d="M28 6v10h10"/><path d="M20 31a3.5 3.5 0 0 1 0-5l2-2a3.5 3.5 0 0 1 5 0M28 27a3.5 3.5 0 0 1 0 5l-2 2a3.5 3.5 0 0 1-5 0"/>',
    certificado: '<rect x="5" y="9" width="38" height="26" rx="3"/><path d="M12 17h24M12 23h14"/><circle cx="33" cy="33" r="5"/><path d="M30 37l-1 6 4-2 4 2-1-6"/>'
  };
  CICLO.acessos.forEach(function (a) {
    var aberto = a.tipo !== 'etapa' || !!CICLO.etapas[a.id];
    var link = el('a', 'acesso acesso--' + a.tipo + (aberto ? '' : ' acesso--fechado'));
    link.href = a.link;
    var selo = a.tipo === 'etapa'
      ? '<span class="acesso__selo ' + (aberto ? 'acesso__selo--aberto' : '') + '">' + (aberto ? 'Aberto' : 'Fechado') + '</span>'
      : (a.ano ? '<span class="acesso__selo acesso__selo--ano">' + CICLO.orcamento + '</span>' : (a.periodo ? '<span class="acesso__selo acesso__selo--ano">' + CICLO.ppa + '</span>' : ''));
    link.innerHTML = selo + '<svg class="acesso__icone" viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONES[a.icone] + '</svg>' +
      '<span class="acesso__rotulo">' + a.rotulo + '</span><span class="acesso__sub">' + (aberto || a.tipo !== 'etapa' ? a.sub : 'Abre no próximo ciclo') + '</span>';
    if (!aberto) {
      link.setAttribute('aria-disabled', 'true');
      link.setAttribute('aria-label', a.rotulo + ': fechado. Abre no próximo ciclo.');
      link.addEventListener('click', function (e) { e.preventDefault(); });
    }
    $('acessos').appendChild(link);
  });

  /* ---------- Resultado do último ciclo ---------- */
  var r = CICLO.resultado;
  if (r && r.pedidos && r.pedidos.length) {
    $('resultado-intro').textContent = r.intro;
    r.pedidos.forEach(function (t, i) { $('pedidos').appendChild(el('li', 'pedido', '<span class="pedido__num">' + (i + 1) + '</span><span>' + t + '</span>')); });
    $('resultado-nota').textContent = r.nota;
  } else { $('resultado').hidden = true; }

  /* ---------- Regiões: toque numa RA para ver os bairros ---------- */
  var semAcento = function (t) { return t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); };
  var painelRA = $('regiao-painel'), cartoes = [], aberta = -1;
  function abrirRA(i, destaque) {
    cartoes.forEach(function (c, k) { c.setAttribute('aria-expanded', k === i ? 'true' : 'false'); c.classList.toggle('regiao--ativa', k === i); });
    aberta = i;
    if (i < 0) { painelRA.hidden = true; return; }
    var bairros = CICLO.regioes[i], n = i + 1;
    painelRA.innerHTML = '<div class="regiao-painel__grade"><div class="regiao-painel__info">' +
      '<div class="regiao-painel__topo"><span class="regiao-painel__ra">RA ' + n + '</span>' +
      '<h3>Região Administrativa ' + n + '</h3><span class="regiao-painel__qtd">' + qtd(bairros) + '</span>' +
      '<button type="button" class="regiao-painel__fechar" aria-label="Fechar">×</button></div>' +
      '<ul class="bairros">' + bairros.map(function (b) {
        return '<li class="bairro' + (destaque && semAcento(b).indexOf(destaque) > -1 ? ' bairro--achou' : '') + '">' + b + '</li>'; }).join('') + '</ul></div>' +
      '<button type="button" class="regiao-mapa" aria-label="Ampliar o mapa da RA ' + n + '">' +
        '<img src="mapas/ra-' + n + '.jpg" alt="' + altMapa(i) + '">' +
        '<span class="regiao-mapa__zoom" aria-hidden="true"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.6-4.6M10.5 7.5v6M7.5 10.5h6"/></svg>Ampliar mapa</span>' +
      '</button></div>';
    painelRA.hidden = false;
    painelRA.querySelector('.regiao-painel__fechar').addEventListener('click', function () { abrirRA(-1); cartoes[i].focus(); });
    painelRA.querySelector('.regiao-mapa').addEventListener('click', function () { abrirMapa(i, this); });
    var r = painelRA.getBoundingClientRect();
    if (r.bottom > innerHeight || r.top < 80) painelRA.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  function qtd(b) { return b.length + (b.length === 1 ? ' bairro' : ' bairros'); }
  function altMapa(i) { return 'Mapa da Região Administrativa ' + (i + 1) + ', com os bairros ' + CICLO.regioes[i].join(', ') + '.'; }

  /* Mapa ampliado (janela sobre a página). Fecha no ×, no Esc ou tocando fora. */
  var modal = $('mapa-modal'), modalAtual = 0, origem = null;
  function mostrarMapa(i) {
    modalAtual = (i + CICLO.regioes.length) % CICLO.regioes.length;
    var n = modalAtual + 1, bs = CICLO.regioes[modalAtual], total = CICLO.regioes.length;
    $('mapa-modal-ra').textContent = 'RA ' + n;
    $('mapa-modal-titulo').textContent = 'Região Administrativa ' + n;
    $('mapa-modal-qtd').textContent = qtd(bs);
    var img = $('mapa-modal-img'); img.src = 'mapas/ra-' + n + '.jpg'; img.alt = altMapa(modalAtual);
    $('mapa-modal-bairros').innerHTML = bs.map(function (b) { return '<li class="bairro">' + b + '</li>'; }).join('');
    $('mapa-anterior').textContent = '← RA ' + ((modalAtual - 1 + total) % total + 1);
    $('mapa-proxima').textContent = 'RA ' + ((modalAtual + 1) % total + 1) + ' →';
  }
  function abrirMapa(i, botao) {
    origem = botao; mostrarMapa(i);
    if (modal.showModal) modal.showModal(); else modal.setAttribute('open', '');
    document.documentElement.classList.add('sem-rolagem');
  }
  function fecharMapa() { if (modal.open) modal.close(); }
  modal.addEventListener('close', function () {
    document.documentElement.classList.remove('sem-rolagem');
    if (modalAtual !== aberta) abrirRA(modalAtual);   // o painel acompanha a RA vista por último
    var alvo = painelRA.querySelector('.regiao-mapa') || origem; if (alvo) alvo.focus();
  });
  $('mapa-modal-fechar').addEventListener('click', fecharMapa);
  modal.addEventListener('click', function (e) { if (e.target === modal) fecharMapa(); });
  $('mapa-anterior').addEventListener('click', function () { mostrarMapa(modalAtual - 1); });
  $('mapa-proxima').addEventListener('click', function () { mostrarMapa(modalAtual + 1); });
  modal.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') mostrarMapa(modalAtual - 1);
    if (e.key === 'ArrowRight') mostrarMapa(modalAtual + 1);
  });
  /* pré-carrega os mapas depois que a página abre, para a troca ser instantânea */
  window.addEventListener('load', function () { setTimeout(function () { CICLO.regioes.forEach(function (_, i) { new Image().src = 'mapas/ra-' + (i + 1) + '.jpg'; }); }, 2500); });

  CICLO.regioes.forEach(function (bairros, i) {
    var b = el('button', 'regiao', '<span class="regiao__sigla">RA</span><strong>' + (i + 1) + '</strong><span class="regiao__txt">' + bairros.length + (bairros.length === 1 ? ' bairro' : ' bairros') + '</span>');
    b.type = 'button'; b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-controls', 'regiao-painel');
    b.setAttribute('aria-label', 'Região administrativa ' + (i + 1) + ', ' + bairros.length + ' bairros. Ver quais são.');
    b.addEventListener('click', function () { $('busca-bairro').value = ''; limparBusca(); abrirRA(aberta === i ? -1 : i); });
    $('regioes-lista').appendChild(b); cartoes.push(b);
  });
  /* Busca pelo nome do bairro */
  function limparBusca() { cartoes.forEach(function (c) { c.classList.remove('regiao--achou'); }); $('busca-resposta').textContent = ''; }
  $('busca-bairro').addEventListener('input', function () {
    var q = semAcento(this.value.trim()); limparBusca();
    if (q.length < 2) { if (!q) abrirRA(-1); return; }
    var achou = [];
    CICLO.regioes.forEach(function (bs, i) { bs.forEach(function (b) { if (semAcento(b).indexOf(q) > -1) achou.push([i, b]); }); });
    if (!achou.length) { abrirRA(-1); $('busca-resposta').textContent = 'Não encontramos esse bairro. Confira o nome ou toque nas regiões acima.'; return; }
    var ras = achou.map(function (x) { return x[0]; }).filter(function (v, k, a) { return a.indexOf(v) === k; });
    ras.forEach(function (i) { cartoes[i].classList.add('regiao--achou'); });
    $('busca-resposta').textContent = achou.length === 1 ? achou[0][1] + ' fica na RA ' + (achou[0][0] + 1) + '.'
      : achou.map(function (x) { return x[1] + ' (RA ' + (x[0] + 1) + ')'; }).join(', ');
    abrirRA(ras[0], q);
  });

  /* ---------- Alto contraste (fica lembrado neste aparelho) ---------- */
  var botaoContraste = $('contraste');
  function aplicarContraste(sim) { document.documentElement.classList.toggle('alto-contraste', sim); botaoContraste.setAttribute('aria-pressed', sim ? 'true' : 'false'); }
  try { aplicarContraste(localStorage.getItem('participa-contraste') === '1'); } catch (e) {}
  botaoContraste.addEventListener('click', function () {
    var sim = !document.documentElement.classList.contains('alto-contraste'); aplicarContraste(sim);
    try { localStorage.setItem('participa-contraste', sim ? '1' : '0'); } catch (e) {}
  });

  /* ---------- Carrossel de fotos (seção Mais vozes) ---------- */
  (function () {
    var box = $('carrossel'); if (!box) return;
    var itens = [].slice.call(box.querySelectorAll('.carrossel__item')), atual = 0, timer = null;
    var pausado = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;  // quem pede menos movimento não vê troca automática
    var pausaBtn = $('carrossel-pausa'), pontos = [];
    function mostrar(i) {
      itens[atual].classList.remove('ativo'); itens[atual].setAttribute('aria-hidden', 'true'); pontos[atual].removeAttribute('aria-current');
      atual = (i + itens.length) % itens.length;
      carregar(atual); carregar(atual + 1);
      itens[atual].classList.add('ativo'); itens[atual].removeAttribute('aria-hidden'); pontos[atual].setAttribute('aria-current', 'true');
    }
    function carregar(i) { var img = itens[(i + itens.length) % itens.length].querySelector('img'); if (img.dataset.src && !img.getAttribute('src')) img.src = img.dataset.src; }
    function iniciar() { parar(); if (!pausado) timer = setInterval(function () { mostrar(atual + 1); }, 5000); }
    function parar() { if (timer) { clearInterval(timer); timer = null; } }
    itens.forEach(function (it, i) {
      var b = el('button', 'carrossel__ponto'); b.type = 'button'; b.setAttribute('aria-label', 'Ver foto ' + (i + 1) + ' de ' + itens.length);
      if (i === 0) b.setAttribute('aria-current', 'true');
      b.addEventListener('click', function () { mostrar(i); iniciar(); });
      $('carrossel-pontos').appendChild(b); pontos.push(b);
    });
    function atualizaBotao() { box.classList.toggle('parado', pausado); pausaBtn.setAttribute('aria-label', pausado ? 'Continuar as fotos' : 'Pausar as fotos'); }
    pausaBtn.addEventListener('click', function () { pausado = !pausado; atualizaBotao(); pausado ? parar() : iniciar(); });
    box.addEventListener('mouseenter', parar); box.addEventListener('mouseleave', iniciar);
    box.addEventListener('focusin', parar); box.addEventListener('focusout', iniciar);
    /* arrastar o dedo para o lado troca a foto no celular */
    var x0 = null;
    box.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) { mostrar(atual + (dx < 0 ? 1 : -1)); iniciar(); } x0 = null; });
    /* as fotos 3 em diante só carregam quando chega a vez delas (página mais leve no celular) */
    window.addEventListener('load', function () { carregar(1); carregar(2); });
    atualizaBotao(); iniciar();
  })();

  /* ---------- Menu do celular ---------- */
  var botao = $('menu-botao'), menu = $('menu-celular');
  botao.addEventListener('click', function () {
    var abrir = menu.hidden; menu.hidden = !abrir; botao.setAttribute('aria-expanded', abrir ? 'true' : 'false');
    botao.setAttribute('aria-label', abrir ? 'Fechar o menu' : 'Abrir o menu');
  });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) { menu.hidden = true; botao.setAttribute('aria-expanded', 'false'); } });
})();
