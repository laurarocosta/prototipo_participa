/* ==========================================================
   PALAVRAS DIFÍCEIS · Participa Maceió
   ----------------------------------------------------------
   Este arquivo alimenta os balões que aparecem ao tocar (celular)
   ou passar o mouse (computador) nas palavras sublinhadas.
   As definições seguem as do OP MCZ, para os dois sites explicarem igual.

   Como editar (sem mexer no resto do código):
     id        → identificador único, sem espaço nem acento.
     nome      → título do balão (nome técnico primeiro).
     falar     → como o termo é lido em voz alta (siglas por extenso).
     variantes → formas como o termo aparece no texto. O site marca sozinho
                 a primeira vez que cada termo aparece em cada seção.
                 Maiúsculas e minúsculas não importam.
     def       → explicação em até duas frases, com palavras do dia a dia.

   Revisão técnica: [NOME DA PESSOA / SETOR] · [DATA DA REVISÃO]
   ========================================================== */
window.GLOSSARIO = [
  { id: 'orcamento-publico', nome: 'Orçamento público', falar: 'Orçamento público',
    variantes: ['orçamento público', 'orçamento', 'orçamentos'],
    def: 'O planejamento de quanto dinheiro a Prefeitura espera arrecadar no ano e de como vai usar esse dinheiro. É aprovado por lei e vale por um ano.' },

  { id: 'ppa', nome: 'PPA · Plano Plurianual', falar: 'Plano Plurianual',
    variantes: ['PPA', 'Plano Plurianual'],
    def: 'O plano da cidade para quatro anos, com os programas e objetivos da gestão. Os orçamentos de cada ano seguem esse plano.' },

  { id: 'ldo', nome: 'LDO · Lei de Diretrizes Orçamentárias', falar: 'Lei de Diretrizes Orçamentárias',
    variantes: ['LDO', 'Lei de Diretrizes Orçamentárias'],
    def: 'A lei que define as metas, as prioridades e as regras para montar o orçamento do ano seguinte.' },

  { id: 'ploa', nome: 'PLOA · Projeto de Lei Orçamentária Anual', falar: 'Projeto de Lei Orçamentária Anual',
    variantes: ['PLOA', 'Projeto de Lei Orçamentária Anual', 'proposta de orçamento'],
    def: 'A proposta de orçamento que a Prefeitura envia à Câmara Municipal. Os vereadores analisam, podem fazer mudanças e votam.' },

  { id: 'consulta-publica', nome: 'Consulta pública', falar: 'Consulta pública',
    variantes: ['consulta pública', 'consulta'],
    def: 'O período em que o Participa fica aberto para a população conhecer as ações e indicar o que é prioridade. Acontece antes de a Prefeitura enviar a proposta de orçamento à Câmara.' },

  { id: 'ata', nome: 'Ata da consulta', falar: 'Ata da consulta',
    variantes: ['ata da consulta', 'ata'],
    def: 'O documento oficial que registra o resultado da consulta pública, com as ações mais indicadas pela população.' },

  { id: 'consolidacao', nome: 'Consolidação', falar: 'Consolidação',
    variantes: ['consolidação'],
    def: 'A etapa em que a Prefeitura junta e organiza todas as indicações recebidas, para ver o que a população mais pediu.' },

  { id: 'camara', nome: 'Câmara Municipal', falar: 'Câmara Municipal',
    variantes: ['Câmara Municipal', 'Câmara'],
    def: 'Onde trabalham os vereadores de Maceió. É ela que analisa, muda e vota a proposta de orçamento da Prefeitura.' },

  { id: 'emendas-cidadas', nome: 'Emenda Cidadã', falar: 'Emenda Cidadã',
    variantes: ['Emendas Cidadãs', 'Emenda Cidadã'],
    def: 'Ações incluídas no orçamento ligadas às prioridades indicadas pela população.' },

  { id: 'ra', nome: 'RA · Região Administrativa', falar: 'Região Administrativa',
    variantes: ['regiões administrativas', 'região administrativa', 'RA'],
    def: 'Cada uma das 8 partes em que Maceió é dividida para organizar o planejamento e os serviços. Cada RA reúne bairros vizinhos.' },

  { id: 'competencia', nome: 'Competência do Município', falar: 'Competência do Município',
    variantes: ['competência do Município'],
    def: 'O que a lei diz que é responsabilidade da Prefeitura, como creches, postos de saúde e limpeza urbana. Outras coisas, como a polícia, cabem ao governo do Estado.' },

  { id: 'execucao', nome: 'Execução do orçamento', falar: 'Execução do orçamento',
    variantes: ['execução orçamentária', 'execução do orçamento', 'execução'],
    def: 'O orçamento saindo do papel ao longo do ano: quanto do que foi planejado está, de fato, sendo gasto.' },

  { id: 'portal-transparencia', nome: 'Portal da Transparência', falar: 'Portal da Transparência',
    variantes: ['Portal da Transparência'],
    def: 'O site da Prefeitura onde qualquer pessoa pode ver quanto foi arrecadado e gasto, com detalhes de contratos e pagamentos.' },

  { id: 'empenho', nome: 'Empenho', falar: 'Empenho',
    variantes: ['empenho', 'empenhado', 'empenhada'],
    def: 'O primeiro passo para gastar: a Prefeitura reserva uma parte do orçamento para pagar uma compra ou um serviço específico.' },

  { id: 'liquidacao', nome: 'Liquidação', falar: 'Liquidação',
    variantes: ['liquidação', 'liquidado', 'liquidada'],
    def: 'A conferência de que o serviço foi feito ou o produto foi entregue. Só depois disso a Prefeitura pode pagar.' },

  { id: 'demonstrativo', nome: 'Demonstrativo', falar: 'Demonstrativo',
    variantes: ['demonstrativos', 'demonstrativo'],
    def: 'Uma tabela que separa, dentro do orçamento, quanto vai para um público específico, como crianças e adolescentes, pessoas idosas ou população em situação de rua.' },

  { id: 'participacao-social', nome: 'Participação social', falar: 'Participação social',
    variantes: ['participação social'],
    def: 'Quando a população ajuda a decidir e acompanhar o que o governo faz, por exemplo indicando prioridades para o orçamento.' }
];
