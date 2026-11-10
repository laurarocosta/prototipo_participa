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
      intro: 'Na consulta de 2026, para o orçamento de 2027, a sociedade priorizou:',
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

  /* ---------- Lupa: aumenta a letra em 2 níveis e volta ao normal (fica lembrado neste aparelho) ---------- */
  var botaoLupa = $('lupa'), ROTULO = ['Aumentar letra', 'Aumentar mais', 'Letra normal'],
      FALA = ['Aumentar o tamanho do texto', 'Aumentar mais o tamanho do texto', 'Voltar o texto ao tamanho normal'];
  function aplicarLetra(n) {
    var h = document.documentElement; h.classList.remove('letra-1', 'letra-2'); if (n) h.classList.add('letra-' + n);
    botaoLupa.querySelector('.lupa__texto').textContent = ROTULO[n];
    botaoLupa.setAttribute('aria-label', FALA[n]); botaoLupa.setAttribute('aria-pressed', n ? 'true' : 'false');
    botaoLupa.classList.toggle('lupa--max', n === 2);
  }
  var nivelLetra = 0;
  try { nivelLetra = parseInt(localStorage.getItem('participa-letra'), 10) || 0; } catch (e) {}
  aplicarLetra(nivelLetra);
  botaoLupa.addEventListener('click', function () {
    nivelLetra = (nivelLetra + 1) % 3; aplicarLetra(nivelLetra);
    try { localStorage.setItem('participa-letra', String(nivelLetra)); } catch (e) {}
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
  /* ==========================================================
     PALAVRAS DIFÍCEIS — balão com explicação e leitura em voz alta
     Os termos vêm de glossario.js. O site sublinha a 1ª vez que cada um
     aparece em cada seção. Toque (celular), mouse (computador) ou teclado abrem.
     ========================================================== */
  (function () {
    var GLOSS = window.GLOSSARIO || []; if (!GLOSS.length) return;
    var POR_ID = {}; GLOSS.forEach(function (t) { POR_ID[t.id] = t; });
    function novo(tag, cls, txt, attrs) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; for (var k in (attrs || {})) e.setAttribute(k, attrs[k]); return e; }
    function rotuloCurto(t) { return t.nome.split(' · ')[0]; }
    function ehCelular() { return window.matchMedia('(max-width: 720px)').matches; }
    function zoomBody() { return parseFloat(getComputedStyle(document.body).zoom) || 1; }   // a lupa usa zoom

    /* ---------- Leitura em voz alta (voz do próprio aparelho) ---------- */
    var VELOCIDADE_VOZ = 1.25;   // 1 = normal; aumente para ler mais rápido, diminua para ler mais devagar
    var falaOk = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window, vozPt = null, falando = null;
    function escolherVoz() {
      var v = window.speechSynthesis.getVoices();
      vozPt = v.filter(function (x) { return /^pt(-|_)BR/i.test(x.lang); })[0] || v.filter(function (x) { return /^pt/i.test(x.lang); })[0] || null;
    }
    if (falaOk) { escolherVoz(); window.speechSynthesis.addEventListener('voiceschanged', escolherVoz); }
    function marcar(btn, sim) { if (!btn) return; btn.setAttribute('aria-pressed', sim ? 'true' : 'false'); btn.querySelector('.ouvir__txt').textContent = sim ? 'Parar' : 'Ouvir'; }
    function pararFala() { if (!falaOk) return; window.speechSynthesis.cancel(); marcar(falando, false); falando = null; }
    function falar(t, btn) {
      if (falando === btn) { pararFala(); return; }
      pararFala();
      var u = new SpeechSynthesisUtterance((t.falar || t.nome) + '. ' + t.def);
      u.lang = 'pt-BR'; if (vozPt) u.voice = vozPt; u.rate = VELOCIDADE_VOZ;
      u.onend = u.onerror = function () { if (falando === btn) { marcar(btn, false); falando = null; } };
      falando = btn; marcar(btn, true); window.speechSynthesis.speak(u);
    }
    var ICONE_SOM = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg>';
    function botaoOuvir(t) {
      if (!falaOk) return null;
      var b = novo('button', 'ouvir', null, { type: 'button', 'aria-pressed': 'false', 'aria-label': 'Ouvir a explicação de ' + rotuloCurto(t) });
      b.innerHTML = ICONE_SOM; b.appendChild(novo('span', 'ouvir__txt', 'Ouvir'));
      b.addEventListener('click', function (e) { e.stopPropagation(); falar(t, b); });
      return b;
    }

    /* ---------- Marca os termos no texto ---------- */
    var NAO_MARCAR = 'a, button, h1, h2, summary, label, script, style, svg, input, textarea, select, figcaption, .termo-tecnico, .glossario-pop, ' +
                     '.aviso-prototipo, .barra-topo, .cabecalho, .menu-celular, .sobretitulo, .acessos, .ciclo__topo, .fluxo__quem, .carrossel, ' +
                     '.regioes, .regiao-painel, .mapa-modal, .busca-bairro, .rodape, #dicionario';
    var mapa = {}, lista = [];
    GLOSS.forEach(function (t) { (t.variantes || [t.nome]).forEach(function (v) { mapa[v.toLowerCase()] = t.id; lista.push(v); }); });
    lista.sort(function (a, b) { return b.length - a.length; });   // as formas mais longas primeiro
    var re = new RegExp('(?<![\\p{L}\\p{N}])(' + lista.map(function (v) { return v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|') + ')(?![\\p{L}\\p{N}])', 'giu');
    function escopoDe(n) { var e = n.nodeType === 1 ? n : n.parentElement; return (e && e.closest('section, details, footer')) || document.body; }
    function marcarTermos(raiz) {
      var w = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, { acceptNode: function (n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        return (!n.parentElement || n.parentElement.closest(NAO_MARCAR)) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; } });
      var nos = []; while (w.nextNode()) nos.push(w.currentNode);
      nos.forEach(function (n) {
        var txt = n.nodeValue, esc = escopoDe(n), ped = [], m; re.lastIndex = 0;
        while ((m = re.exec(txt))) {
          var id = mapa[m[0].toLowerCase()];
          if (!id || esc.querySelector('.termo-tecnico[data-termo="' + id + '"]') || ped.some(function (p) { return p.id === id; })) continue;
          ped.push({ id: id, ini: m.index, fim: m.index + m[0].length });
        }
        if (!ped.length) return;
        var frag = document.createDocumentFragment(), ult = 0;
        ped.forEach(function (p) {
          if (p.ini > ult) frag.appendChild(document.createTextNode(txt.slice(ult, p.ini)));
          var btn = novo('button', 'termo-tecnico', txt.slice(p.ini, p.fim),
            { type: 'button', 'data-termo': p.id, 'aria-expanded': 'false', 'aria-haspopup': 'dialog' });
          ult = p.fim;
          var pont = /^[.,;:!?)]+/.exec(txt.slice(ult));   // a pontuação fica grudada na palavra (não pula de linha sozinha)
          if (pont) { var junto = novo('span', 'termo-junto'); junto.appendChild(btn); junto.appendChild(document.createTextNode(pont[0])); frag.appendChild(junto); ult += pont[0].length; }
          else frag.appendChild(btn);
        });
        if (ult < txt.length) frag.appendChild(document.createTextNode(txt.slice(ult)));
        n.parentNode.replaceChild(frag, n);
      });
    }

    /* ---------- O balão (no celular, uma folha que sobe de baixo) ---------- */
    var pop = novo('div', 'glossario-pop', null, { role: 'dialog', 'aria-modal': 'false', hidden: '' });
    var fundo = novo('div', 'glossario-fundo', null, { hidden: '' });
    document.body.appendChild(fundo); document.body.appendChild(pop);
    var atual = null, fixo = false, tFechar = null, tAbrir = null;
    var temMouse = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    function posicionar() {
      if (!atual || pop.hidden) return;
      if (ehCelular()) { pop.style.left = ''; pop.style.top = ''; return; }
      var z = zoomBody(), r = atual.getBoundingClientRect(), mg = 12, vw = window.innerWidth, vh = window.innerHeight;
      var pw = pop.offsetWidth * z, ph = pop.offsetHeight * z;
      var left = Math.min(Math.max(mg, r.left + r.width / 2 - pw / 2), vw - pw - mg), top = r.bottom + 10, acima = false;
      if (top + ph > vh - mg && r.top - ph - 10 > mg) { top = r.top - ph - 10; acima = true; }
      pop.style.left = (left / z) + 'px'; pop.style.top = (top / z) + 'px';
      pop.classList.toggle('glossario-pop--acima', acima);
      pop.style.setProperty('--seta-x', (Math.min(Math.max(18 * z, r.left + r.width / 2 - left), pw - 18 * z) / z) + 'px');
    }
    function abrir(el, fixar, focar) {
      var t = POR_ID[el.getAttribute('data-termo')]; if (!t) return;
      clearTimeout(tFechar);
      if (atual && atual !== el) atual.setAttribute('aria-expanded', 'false');
      pararFala(); atual = el; fixo = !!fixar;
      pop.innerHTML = ''; pop.setAttribute('aria-label', 'Explicação: ' + rotuloCurto(t));
      var fechar = novo('button', 'glossario-pop__fechar', '×', { type: 'button', 'aria-label': 'Fechar explicação' });
      fechar.addEventListener('click', function () { fecharPop(true); });
      var acoes = novo('div', 'glossario-pop__acoes');
      var ouvir = botaoOuvir(t); if (ouvir) acoes.appendChild(ouvir);
      var verDic = novo('button', 'glossario-pop__link', 'Ver no dicionário', { type: 'button' });
      verDic.addEventListener('click', function () { fecharPop(false); mostrarNoDicionario(t.id); });
      acoes.appendChild(verDic);
      pop.appendChild(fechar);
      pop.appendChild(novo('div', 'glossario-pop__nome', t.nome));
      pop.appendChild(novo('p', 'glossario-pop__def', t.def));
      pop.appendChild(acoes);
      pop.classList.toggle('glossario-pop--folha', ehCelular());
      pop.hidden = false; fundo.hidden = !ehCelular();
      el.setAttribute('aria-expanded', 'true'); posicionar();
      if (focar) fechar.focus({ preventScroll: true });
    }
    function fecharPop(devolver) {
      clearTimeout(tFechar); clearTimeout(tAbrir);
      if (pop.hidden) return;
      pararFala(); pop.hidden = true; fundo.hidden = true;
      if (atual) { atual.setAttribute('aria-expanded', 'false'); if (devolver) atual.focus({ preventScroll: true }); }
      atual = null; fixo = false;
    }
    document.addEventListener('click', function (e) {
      var termo = e.target.closest && e.target.closest('.termo-tecnico');
      if (termo) {
        e.preventDefault(); e.stopPropagation();
        var teclado = e.detail === 0;
        if (atual === termo && fixo) fecharPop(teclado); else abrir(termo, true, teclado);
        return;
      }
      if (!pop.hidden && !pop.contains(e.target)) fecharPop(false);
    }, true);
    if (temMouse) {
      document.addEventListener('mouseover', function (e) {
        var termo = e.target.closest && e.target.closest('.termo-tecnico');
        if (termo) { clearTimeout(tFechar); if (atual !== termo) { clearTimeout(tAbrir); tAbrir = setTimeout(function () { abrir(termo, false, false); }, 120); } }
        else if (pop.contains(e.target)) clearTimeout(tFechar);
      });
      document.addEventListener('mouseout', function (e) {
        var de = e.target.closest && (e.target.closest('.termo-tecnico') || (pop.contains(e.target) ? pop : null)); if (!de) return;
        var para = e.relatedTarget;
        if (para && (pop.contains(para) || (atual && atual.contains(para)))) return;
        clearTimeout(tAbrir); if (!fixo) tFechar = setTimeout(function () { fecharPop(false); }, 250);
      });
    }
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !pop.hidden) { e.preventDefault(); fecharPop(true); } });
    window.addEventListener('scroll', function () { if (!pop.hidden) posicionar(); }, { passive: true });
    window.addEventListener('resize', function () { if (!pop.hidden) posicionar(); });

    /* ---------- Dicionário: lista em ordem alfabética, busca e letras ---------- */
    var lista = document.getElementById('dic-lista'), busca = document.getElementById('busca-termo'), letrasBox = document.getElementById('dic-letras');
    var semAc = function (x) { return x.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); };
    var TERMOS = GLOSS.slice().sort(function (a, b) { return a.nome.localeCompare(b.nome, 'pt'); });
    var INICIAIS = 8, todos = false, aberto = null, letra = '';
    function inicial(t) { return semAc(t.nome).charAt(0).toUpperCase(); }
    function desenhar() {
      if (!lista) return;
      var q = busca ? semAc(busca.value.trim()) : '', achados = TERMOS.filter(function (t) {
        if (letra && inicial(t) !== letra) return false;
        return !q || semAc(t.nome + ' ' + (t.variantes || []).join(' ') + ' ' + t.def).indexOf(q) > -1;
      });
      var limite = (q || letra || todos) ? achados.length : INICIAIS;
      lista.innerHTML = '';
      achados.slice(0, limite).forEach(function (t) {
        var ab = aberto === t.id, idp = 'dic-' + t.id;
        var li = novo('li', 'dic__item' + (ab ? ' dic__item--aberto' : ''));
        var cab = novo('button', 'dic__termo', null, { type: 'button', 'aria-expanded': ab ? 'true' : 'false', 'aria-controls': idp });
        var nomes = t.nome.split(' · ');
        cab.appendChild(novo('span', 'dic__nome', nomes[0]));
        if (nomes[1]) cab.appendChild(novo('span', 'dic__extenso', nomes[1]));
        cab.appendChild(novo('span', 'dic__seta', ab ? '−' : '+', { 'aria-hidden': 'true' }));
        cab.addEventListener('click', function () { aberto = ab ? null : t.id; pararFala(); desenhar(); var bt = lista.querySelector('[aria-controls="' + idp + '"]'); if (bt) bt.focus({ preventScroll: true }); });
        var painel = novo('div', 'dic__def', null, { id: idp }); painel.hidden = !ab;
        painel.appendChild(novo('p', null, t.def));
        var ouvir = botaoOuvir(t); if (ouvir) painel.appendChild(ouvir);
        li.appendChild(cab); li.appendChild(painel); lista.appendChild(li);
      });
      document.getElementById('dic-vazio').hidden = achados.length > 0;
      var mais = document.getElementById('dic-mais');
      mais.hidden = achados.length <= limite;
      mais.textContent = 'Ver todas as ' + achados.length + ' palavras';
      document.getElementById('dic-contagem').textContent = (q || letra) ? (achados.length + (achados.length === 1 ? ' palavra encontrada' : ' palavras encontradas')) : '';
    }
    if (lista) {
      /* letras: só as que têm palavra */
      var usadas = []; TERMOS.forEach(function (t) { var l = inicial(t); if (usadas.indexOf(l) < 0) usadas.push(l); });
      ['Todas'].concat(usadas).forEach(function (l) {
        var b = novo('button', 'dic__letra', l, { type: 'button', 'aria-pressed': l === 'Todas' ? 'true' : 'false', 'aria-label': l === 'Todas' ? 'Todas as letras' : 'Palavras com a letra ' + l });
        b.addEventListener('click', function () {
          letra = l === 'Todas' ? '' : l; aberto = null; if (busca) busca.value = '';
          [].forEach.call(letrasBox.children, function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
          desenhar();
        });
        letrasBox.appendChild(b);
      });
      if (busca) busca.addEventListener('input', function () {
        aberto = null; letra = ''; [].forEach.call(letrasBox.children, function (x, i) { x.setAttribute('aria-pressed', i === 0 ? 'true' : 'false'); }); desenhar();
      });
      document.getElementById('dic-mais').addEventListener('click', function () { todos = true; desenhar(); });
      desenhar();
    }
    function mostrarNoDicionario(id) {
      if (!lista || !POR_ID[id]) return;
      if (busca) busca.value = ''; letra = ''; todos = true; aberto = id;
      [].forEach.call(letrasBox.children, function (x, i) { x.setAttribute('aria-pressed', i === 0 ? 'true' : 'false'); });
      desenhar();
      var bt = lista.querySelector('[aria-controls="dic-' + id + '"]');
      if (bt) { bt.parentElement.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' }); bt.focus({ preventScroll: true }); }
    }

    var principal = document.querySelector('main') || document.body;
    marcarTermos(principal);
    /* textos que mudam com os cliques (situação da consulta, resultado) também ganham os balões */
    var agendado = false;
    new MutationObserver(function () { if (agendado) return; agendado = true; requestAnimationFrame(function () { agendado = false; marcarTermos(principal); }); })
      .observe(principal, { childList: true, subtree: true, characterData: true });
  })();
})();
