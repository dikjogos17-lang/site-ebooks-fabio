export interface MindMapPoint {
  topic: string;
  references: string;
  details: string;
}

export interface MindMap {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  author: string;
  category: string;
  verses: string[];
  summary: string;
  points: MindMapPoint[];
}

export const mindMaps: MindMap[] = [
  {
    id: "70-semanas-daniel-escatologia",
    title: "As 70 Semanas de Daniel e a Linha do Tempo Escatológica",
    subtitle: "Do Decreto de Artaxerxes ao Reino Milenar de Cristo",
    image: "/capas/mapa-mental-70-semanas.jpg",
    author: "Pr. Fabio Russo",
    category: "Escatologia Profética",
    verses: [
      "Daniel 9.24-27",
      "Levítico 23.1-44",
      "Mateus 24.15-34",
      "1 Tessalonicenses 4.16,17",
      "Romanos 11.25,26",
      "Apocalipse 19.7-21"
    ],
    summary: "Panorama visual cronológico completo das 70 semanas proféticas de Daniel. Demonstra a divisão das 69 semanas até a morte de Cristo, a destruição do Templo em 70 d.C., o mistério do parêntese da Igreja, o renascimento milagroso de Israel em 1948, o Arrebatamento, o Tribunal de Cristo (Bema), a Grande Tribulação (70ª semana) e o triunfo de Cristo no Milênio.",
    points: [
      {
        topic: "1. O Propósito Exclusivo das 70 Semanas",
        references: "Daniel 9.24 / Daniel 10.14",
        details: "As setenta semanas foram determinadas sobre o povo judeu e sobre Jerusalém para cessar a transgressão e trazer a justiça eterna. Não são destinadas à Igreja gentílica, o que fundamenta o arrebatamento pré-tribulacional."
      },
      {
        topic: "2. Festas da Primavera e a Colheita de Almas",
        references: "Levítico 23 / João 4.35,38 / Mateus 27.52 / Efésios 4.8,9",
        details: "Páscoa, Pães Asmos e Primícias: cumpridas na vida, morte e ressurreição de Cristo. Shavuot/Pentecostes dá início à colheita de almas pela Igreja através do Espírito Santo."
      },
      {
        topic: "3. O Relógio das 69 Semanas (483 anos)",
        references: "Neemias 2.1-8 / Daniel 9.25,26",
        details: "7 semanas (49 anos) para a reconstrução de Jerusalém + 62 semanas (434 anos) até o Messias ser cortado. Total: 483 anos de uma profecia de 490 anos, restando a última semana de 7 anos."
      },
      {
        topic: "4. Destruição do Templo e a Diáspora (70 d.C.)",
        references: "Lucas 19.41-44 / Mateus 23.38 / Romanos 11.11,25",
        details: "Cumprimento exato da profecia: não ficou pedra sobre pedra. Deus interrompeu o relógio profético de Israel e abriu a porta da Graça para todos os povos enquanto a Igreja peregrina."
      },
      {
        topic: "5. O Retorno Profético de Israel (1948)",
        references: "Oseias 6.2 / Ezequiel 36.24; 37.1-13 / Mateus 24.32,34",
        details: "Após quase 2000 anos, a figueira floresce com o renascimento do Estado de Israel em 1948. A geração que vê este milagre não passará sem que os eventos finais se cumpram."
      },
      {
        topic: "6. O Arrebatamento e o Tribunal de Cristo (Bema)",
        references: "1 Ts 4.16,17 / 1 Co 15.52 / 2 Co 5.10 / Apocalipse 3.10",
        details: "A Igreja é retirada antes da ira de Deus (Festa das Trombetas). No Céu ocorre o galardoamento no Tribunal de Cristo e as Bodas do Cordeiro, enquanto a Terra entra no juízo."
      },
      {
        topic: "7. A Septuagésima Semana (Grande Tribulação - 7 anos)",
        references: "Daniel 9.27; 12.7 / Mateus 24.15,21 / Apocalipse 6 a 18",
        details: "Dividida em 3,5 anos + 3,5 anos (1260 dias / 42 meses). O Anticristo (666) quebra a aliança de paz, profana o Terceiro Templo e os juízos de Deus são derramados. Israel é guardado e se converte."
      },
      {
        topic: "8. A Festa da Expiação, a Segunda Vinda e o Milênio",
        references: "Zacarias 12.10; 14.4 / Mateus 23.39 / Apocalipse 19.7-21; 20.4-6",
        details: "Israel reconhece o Messias ferido. Cristo desce visivelmente no Monte das Oliveiras com Sua Igreja triunfante para destruir o Anticristo e reinar por mil anos de paz sobre a Terra."
      }
    ]
  },
  {
    id: "carreira-crista-da-graca-a-salvacao",
    title: "A Carreira Cristã: Da Graça Soberana à Salvação Eterna",
    subtitle: "O Itinerário Bíblico da Vocação, Perseverança e Glorificação",
    image: "/capas/mapa-mental-carreira-crista.jpg",
    author: "Pr. Fabio Russo",
    category: "Soteriologia & Vida Cristã",
    verses: [
      "Colossenses 1.20",
      "Efésios 2.8-10",
      "2 Pedro 1.4-11",
      "Hebreus 3.1,14; 6.4-6",
      "Mateus 24.13",
      "2 Timóteo 4.7,8"
    ],
    summary: "Esquema doutrinário e pastoral detalhando toda a caminhada do salvo. Apresenta a Graça incondicional como raiz de toda regeneração e vocação, as ferramentas de segurança fornecidas pela Escritura, as advertências imperativas contra o desvio apóstata e a promessa da coroa aos que perseverarem até o fim.",
    points: [
      {
        topic: "1. O Ponto de Partida: A Graça Soberana de Deus",
        references: "Colossenses 1.20 / Efésios 2.8,9 / Romanos 9.15,16; 5.18",
        details: "Regeneração, Eleição, Vocação e Salvação são possíveis unicamente por causa da Graça de Deus manifestada na Cruz. Não há mérito humano: a Cruz de Cristo é a única base salvífica."
      },
      {
        topic: "2. O Chamado à Conversão e a Vocação Celestial",
        references: "Atos 17.30 / João 3.18; 5.24 / Efésios 1.4",
        details: "Deus notifica a todos os homens que se arrependam. Os que creem são introduzidos na Vocação Celestial e na Eleição que está em Cristo Jesus para louvor da Sua glória."
      },
      {
        topic: "3. Alicerces de Segurança para a Caminhada",
        references: "Efésios 1.17,18 / Hebreus 3.1,14; 6.4 / 2 Pedro 1.3,4",
        details: "Pleno conhecimento de Cristo, olhos do coração iluminados, participantes do Espírito Santo e participantes da natureza divina através de Suas preciosas promessas."
      },
      {
        topic: "4. As Obras e o Frutificar Diário",
        references: "Efésios 2.10 / 2 Pedro 1.5-8 / João 15.1-8",
        details: "Fomos criados para as boas obras que Deus preparou de antemão. O crente acrescenta à sua fé virtude, conhecimento, domínio próprio, perseverança e amor fraternal."
      },
      {
        topic: "5. Advertências Solenes Contra a Queda e Apostasia",
        references: "Hebreus 2.1; 6.4-6; 10.26-29 / 1 Timóteo 1.19,20 / Gálatas 5.4",
        details: "A Escritura adverte exaustivamente sobre o perigo de provar a verdade e deliberadamente voltar atrás, pisando o Filho de Deus e caindo da graça."
      },
      {
        topic: "6. Confirmando a Vocação e Eleição (2 Pedro 1.10)",
        references: "2 Pedro 1.10 / Hebreus 12.14 / 2 Timóteo 2.10",
        details: "Vocação é o convite; Eleição é o propósito em Cristo. O crente diligente confirma sua fé na santificação prática: 'procedendo assim, nunca jamais tropeçareis'."
      },
      {
        topic: "7. O Final da Carreira: A Coroa ao Vencedor",
        references: "Mateus 24.13 / Apocalipse 2 e 3 / 2 Timóteo 4.7,8",
        details: "'Aquele, porém, que perseverar até o fim, esse será salvo'. A carreira cristã culmina na recompensa eterna, nas promessas ao vencedor e na glorificação na presença de Deus."
      }
    ]
  },
  {
    id: "korba-karov-katara-evangelho-reconciliacao",
    title: "Korbã, Karôv e Katará: O Evangelho da Reconciliação",
    subtitle: "A Balança da Justiça de Deus e a Tríade do Sacrifício Redentor",
    image: "/capas/mapa-mental-korba-reconciliacao.jpg",
    author: "Pr. Fabio Russo",
    category: "Doutrina & Teologia",
    verses: [
      "Provérbios 11.1",
      "Romanos 3.23; 5.18; 6.23",
      "2 Coríntios 5.18,19",
      "Colossenses 1.20",
      "João 1.14,29",
      "Hebreus 9.22"
    ],
    summary: "Esquematização profunda do coração do Evangelho bíblico. Contrasta a balança inegociável da Justiça de Deus que exige a morte do transgressor com o infinito Amor sacrificial demonstrado na tríade hebraica do tabernáculo: Korbã (o Sacrifício Substituto), Karôv (o Chamado de Aproximação) e Katará (a Remissão definitiva de pecados em Cristo).",
    points: [
      {
        topic: "1. A Queda e o Veredito Universal",
        references: "Gênesis 2.16,17 / Romanos 3.23; 5.18; 11.32",
        details: "'No dia em que dela comeres certamente morrerás'. Todos pecaram e destituídos estão da glória de Deus. Por uma só ofensa veio juízo sobre todos para condenação."
      },
      {
        topic: "2. A Balança Justa de Deus",
        references: "Provérbios 11.1 / Romanos 1.17; 6.23",
        details: "'Balança enganosa é abominação para o Senhor, mas o peso justo é o Seu prazer'. A santidade divina não anula a Lei: o salário do pecado é a morte e exige expiação plena."
      },
      {
        topic: "3. KORBÃ — O Sacrifício Substituto",
        references: "João 1.29 / 1 Pedro 1.18,19 / Hebreus 9.22",
        details: "O Verbo se fez carne. Jesus é o Cordeiro sem mancha nem defeito ofertado na Cruz. Sem derramamento de sangue substitutivo não há remissão de pecados."
      },
      {
        topic: "4. KARÔV — A Aproximação e o Chamado",
        references: "Efésios 2.13 / Atos 17.30 / João 5.24",
        details: "O sacrifício abre o caminho para os que estavam distantes se aproximarem do Santo dos Santos pelo sangue de Cristo através da resposta da fé."
      },
      {
        topic: "5. KATARÁ — A Conversão e a Remissão",
        references: "Colossenses 1.20 / 2 Coríntios 5.18,19",
        details: "Deus estava em Cristo reconciliando consigo o mundo, cancelando as transgressões e selando a paz duradoura sobre a terra e nos céus."
      },
      {
        topic: "6. A Definição Final do Pecado no Evangelho",
        references: "João 3.18,19; 16.8,11",
        details: "Sob a luz da Cruz, o pecado que sela a condenação eterna é rejeitar a oferta amorosa de Cristo: 'Aquele que crê não é condenado; quem não crê já está condenado, porquanto não crê no Unigênito de Deus'."
      }
    ]
  }
];
