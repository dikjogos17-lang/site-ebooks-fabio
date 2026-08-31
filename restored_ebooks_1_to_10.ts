export interface Ebook {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  fullDescription: string;
  rating: number;
  pages: number;
  coverImage: string;
  language: string;
  format: string;
  publishDate: string;
  views: number;
  featured?: boolean;
}

export const categories = [
  "Teologia",
  "Bíblia",
  "Profecias",
  "Escatologia",
  "Doutrina",
  "História Cristã",
  "Estudos Bíblicos",
  "Fé Cristã"
];

export const ebooks: Ebook[] = [
  {
    id: "1",
    title: "A Compreensão dos Dois Templos e a Tribulação",
    author: "Fabio Russo",
    category: "Escatologia",
    description: "Um estudo profundo sobre os dois templos judaicos, as setenta semanas de Daniel, o retorno de Israel e os eventos proféticos da tribulação. Uma análise bíblica detalhada que distingue os templos de Mateus 23 e 24, abrangendo desde a profecia de Daniel até o cumprimento escatológico.",
    fullDescription: `O templo judeu foi destruído em torno do período em que foi cortado o Ungido (Daniel 9.26), período de "uma geração" (70 anos, e aproximadamente 40 anos após a morte e ressurreição de Cristo), tempo em que Deus corta (momentaneamente) o Seu povo por causa de sua incredulidade (Mt 23.38/24.1,2/ Lucas 19.41,44/Rm 11.20), este tempo profético abrange desde a saída para edificar Jerusalém, o templo e os muros a partir do decreto relatado em Neemias 2.1,8 até a morte de Cristo, na semana da morte relatada em Mateus 21 (483 anos de uma profecia de 490 anos, restando 7 anos).

O objetivo das setenta semanas de Daniel bem como o seu funcionamento está explícito nos versículos Daniel 9.24,25,26 e 27. E o povo a quem foram destinadas as setenta semanas (Daniel 9.19,24 - 10.14). Templo destruído e a igreja começa a andar pela terra (Atos 2.1,4/1 Pe 2.5,9).

O povo judeu andou disperso (após a diáspora) por dois mil anos (aproximadamente), e retorna de forma milagrosa em 1947/48 (Isaías 35/ 66.8/Jeremias 30.19/31.35,36/Ezequiel 37.1,13), e começa a cumprir várias profecias bíblicas (na realidade começou a retornar em 1917. Vinte e nove mil judeus estavam na haartez Ysrael, e hoje são mais de nove milhões, em crescimento).

A compreensão está na distinção dos templos de Mateus 23.38/24.1,2 com Mateus 24.15, existe um espaço de quase dois mil anos entre estes templos, e portanto entre os versículos 26 e 27 de Daniel 9.

O templo judeu foi destruído em 70 d.C e permanece em ruínas (hoje é mais conhecido como o "muro das lamentações", ou a parte ocidental de onde fica hoje a mesquita muçulmana, Mesquita de Omar ou Domo da rocha). Jesus profetiza sobre a destruição e devastação de Jerusalém e do templo (a vossa casa vos ficará deserta e não ficará aqui pedra sobre pedra que não seja derribada).

Já em Mateus 24.15 ou textos similares como 2 Ts 2.4/Daniel 8.14/Apocalipse 13.5, e até sobre esse período de 3,5 anos finais de um total de 7 anos, como Apocalipse 11.3/12.6...16, não fala de Jerusalém ou templo destruído, mas profanados, em que os judeus serão guardados por Deus (talvez em Petra), e destruirá as tropas do anticristo bem como todo exército, cavalaria e até mesmo os ataques marítimos com o maior Maremoto da história (Ezequiel 38.19/Zacarias 14.4,15).

Jesus disse para os judeus: "E não Me vereis mais até..." (Mateus 23.39). Isto denota uma restauração espiritual da nação judaica (Atos 1.6/15.16/Romanos 11.26,28).

O templo profanado deve ser reconstruído por um motivo básico, pois o próprio Senhor disse que ele seria profanado, e Cristo não estava se referindo a Antíoco Epifânio, embora este tenha profanado o templo oferecendo um porco no Santuário de Deus, mas só que Antíoco vivera 150 anos antes de Cristo, e portanto Cristo faz uma prospecção (quando, pois, virdes o abominável...).

Ora, este templo não fora reconstruído, e portanto ainda não chegou este tempo, embora esteja muito próximo, pois a geração do retorno está chegando ao fim e Jesus disse: "E não passará esta geração..." (Mt 24.34).

E como sabemos que a geração de 1948 é essa a qual o Senhor Se referiu? Porque Israel frutificou após 2 mil anos a partir de 1948, em que esteve seca desde 70 d.C. Figueira amaldiçoada na diáspora (Lucas 19.41,44/Mateus 23.38/24.1,2), Figueira frutificando após o retorno (Jeremias 30.19/Ezequiel 37.1,13/Mateus 24.32,34..."Assim também vós, quando virdes a restauração...).

Enquanto o templo estava de pé a igreja ainda não havia nascido, pois Deus passou a viver em cada crente que compõe a igreja, sendo individualmente templos de Deus (1 Co 3.10,17), embora somente unidos são igreja (Mateus 16.16,18/18.20/Cl 4.15).

Quando o templo judaico for reconstruído, Deus volta a tratar com Israel, e isto se dará quando na entrada dos gentios no arrebatamento da igreja (1 Ts 4.16,17/1 Co 15.52/Lucas 24.21/Romanos 11.25/Atos 15.14,16).

Acredito que conseguimos perceber o caráter estritamente judaico da tribulação, pois se nos versículos 25 e 26 vemos todas as coisas ligadas aos judeus e a cidade de Jerusalém, o versículo 27 também o será.

Não vemos a igreja nas primeiras sessenta e nove semanas, não vemos a igreja na septuagésima semana de Daniel, que compreende um período de sete anos, em que o alvo será a profanação do templo.

Este período será a ira de Deus sendo derramada sobre a terra, não são tribulações naturais da vida, mas a ira de Deus, e a palavra diz que não houve nem haverá dias como esses (Mateus 24.21,22), e Jesus nos livra desta ira vindoura (1 Ts 1.10/Apocalipse 3.8,11). "Da" ira, e não "Na" ira.`,
    rating: 5.0,
    pages: 4,
    coverImage: "/templo.png",
    language: "Português",
    format: "PDF, EPUB",
    publishDate: "2024-01-01",
    views: 1200,
    featured: true
  },
  {
    id: "2",
    title: "O Bem e o Pecado (Tiago 4.17)",
    author: "Fabio Russo",
    category: "Estudos Bíblicos",
    description: "Uma reflexão baseada em Tiago 4.17 sobre a natureza do pecado de omissão, o sacrifício de Cristo e o que significa viver de acordo com a vontade de Deus.",
    fullDescription: `Aquele que sabe o bem que deve fazer e não faz, nisto está pecando (Tiago 4.17)

Como podemos encarar esse texto?
Ora, sabemos que o "bem" feito, diz respeito a Cristo, na Cruz:
"Glória a Deus nas maiores alturas, e paz na terra entre os homens, a quem Ele quer bem" (Lucas 2.14)

Deus Se reconciliou com a Sua condenação estipulada no Éden e agora chama os homens à conversão. Quando creio neste "bem", creio no que Cristo fez em meu lugar, recebendo a punição do castigo do inferno, da ira de Deus, da maldição. Jesus disse que "o pecado é não crer no sacrifício de Deus" (João 16.8,11).

O chamado é para buscar esse bem, com o convite que nos foi feito (Filipenses 3.12,16): "Buscai o bem e não o mal, para que vivais; e, assim, o Senhor, o Deus dos Exércitos, estará convosco, como dizeis" (Amós 5.14). O bem (vida, Vida Eterna), o mal (morte, segunda morte); isto é proposto (João 3.18,19).

Como sei que estou enquadrado neste ministério da reconciliação?
• Como sei que sou de Deus? João 8.47
• Como sei que Deus olha para mim? Isaías 66.1,2
• Como sei que sou liberto? João 8.32 e 36
• Como sei que o meu interior está limpo? João 15.3 - 1 Pedro 1.22
• Como sei que serei salvo? João 12.46,48 - Romanos 10.6,7,9,17`,
    rating: 5.0,
    pages: 2,
    coverImage: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&q=80&w=400&h=600",
    language: "Português",
    format: "PDF, EPUB",
    publishDate: "2024-02-15",
    views: 850,
    featured: false
  },
  {
    id: "3",
    title: "A INCOERENTE DOUTRINA CALVINISTA!",
    author: "Fabio Russo",
    category: "Teologia",
    description: "Uma análise bíblica sobre o livre arbítrio, a queda e a soberania de Deus, contrastando a doutrina calvinista com textos bíblicos essenciais.",
    fullDescription: `A INCOERENTE DOUTRINA CALVINISTA!

Os calvinistas afirmam que apenas "antes" da queda existiu o livre arbítrio, pelo menos no que diz respeito ao "infralapsarianismo" (vertente calvinista que diz que após a queda Deus escolheu quem Ele quis, para a eleição em Cristo, e já que todos caíram, Deus não estaria sendo injusto. O que já é um pouco confuso, pois a morte e ressurreição do Senhor torna-se um tanto quanto secundária, obsoleto...).

Secundária porque nesta doutrina não vemos aquela Doxologia, que exclama:
"Levantai, ó portas, as vossas cabeças; levantai-vos ó portais eternos, para que entre O Rei da Glória. Quem é esse Rei da Glória? O Senhor dos exércitos, Ele é O Rei da Glória" (Salmo 24.9,10). Isto quando na Sua ascensão.

Paulo exclamou em Sua encarnação:
"Vindo, porém, a plenitude do tempo, Deus enviou Seu Filho" (Gálatas 4.4).

Além de confuso também se torna estranha às Escrituras, já que Deus "odeia a balança enganosa" (Provérbios 11.1), aquela que usa "dois pesos e duas medidas"!

"Todos pecaram", disse Paulo. Pedro disse que é "O Justo pelos injustos" (Romanos 3.23 - 1 Pedro 3.18).
Paulo também escreveu que a "ofensa de Adão trouxe juízo para condenação sobre todos" e o "ato de justiça de Cristo, na Cruz, trouxe Graça sobre todos (no tocante a todos poderem ter acesso por meio da fé, através da pregação). Paulo continua: "Graça sobre todos PARA a justificação que dá vida" (Romanos 5.18).

Pois bem, temos este livre arbítrio para escolher entre crer ou rejeitar a mensagem do Evangelho, para que pela Graça possamos ser justificados para a vida?
Iniciamos esta abordagem falando sobre o livre arbítrio ter ou não, cessado após a queda.

Quando lemos a conversa de Deus com Caim, não há a possibilidade de que ele (Caim) não possa ter agido livremente, pois Deus havia posto diante dele o "caminho do bem e do mal, da morte e da vida".
Vejamos: Caim estava prestes a conceber em seu coração matar a seu irmão; Deus falou com ele:
"Por que andas irado, e por que descaiu o teu semblante"?

Observe como O Senhor faz Caim pensar no que está premeditando.
O Senhor continua: "Se procederes bem, não é certo que SERÁS aceito".
Observe que a conjugação está no futuro. Deus está dizendo: "Mude a sua postura, faça como o seu irmão"!

Deus o avisa do perigo que está a sua espreita, para o matar espiritualmente:
"Se, todavia, procederes mal, eis que o pecado jaz (morte) à porta".
Deus novamente o alerta:
"O seu desejo será contra ti".

Com a declaração do Senhor que virá a seguir, vemos a quinta demonstração do Amor de Deus (pois não há amor verdadeiro sem liberdade):
"Mas a ti cumpre dominá-lo". (poderia agir de forma diferente, mas não quis. Não foi a ação de Deus quem fez com que ele pecasse, mesmo que Deus o tivesse alertado por cinco vezes).

Caim ignora a voz do Senhor e mata seu irmão.
Vemos algumas características em Caim que mostra a ação daqueles que se afastam do Senhor para a perdição:
1 - Não admite a culpa (Gênesis 4.9).
2 - Se volta contra a voz do Senhor, escarnecendo do Senhor Deus (Gênesis 4.9).

Deus faz uma declaração do pesado pecado de Caim:
"A voz do teu irmão clama da terra a Mim" (Gênesis 4.10).
Observe que só pós uma insistente desobediência, Deus condena Caim:
"És agora, pois, maldito por sobre a terra" (Gênesis 4.11).
"Caim tornou-se do maligno"!

Caim percebeu a gravidade do pecado (Gênesis 4.13), mas não se arrependeu, pensando apenas em sua integridade física e não em sua vida diante de Deus:
1 - Me lanças da face da terra.
2 - Hei de esconder-me de Tua presença.
3 - Serei fugitivo e errante.
4 - Quem me encontrar vai me matar.

Não, eu me recuso a crer que a DOUTRINA CALVINISTA está correta ao afirmar que todas as coisas foram preordenadas por Deus, até mesmo os pecados, ou que Deus já tenha os Seus eleitos, pois, quando lemos cada texto bíblico, podemos claramente perceber que sim, as consequências para cada ação humana já tem quem as julgue: "A própria Palavra de Deus"!

Sendo assim, Deus é Soberano mesmo quando permite que a História se desenrole sem perder o controle dos Seus planos.`,
    rating: 4.9,
    pages: 3,
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400&h=600",
    language: "Português",
    format: "PDF, EPUB",
    publishDate: "2024-03-10",
    views: 950,
    featured: false
  },
  {
    id: "4",
    title: "Por preço fostes comprados (1 Coríntios 7.23)",
    author: "Fabio Russo",
    category: "Doutrina",
    description: "Um estudo sobre a liberdade em Cristo, os perigos da escravidão espiritual e a perseverança necessária para a salvação da alma.",
    fullDescription: `Por preço fostes comprados; não vos torneis escravos de homens" (1 Coríntios 7.23).

É possível alguém que foi liberto pela verdade, tornar-se escravo novamente, e em "potencial", perder a Salvação?
Sim (Gálatas 5.1,4,7,8 - 4.8,9 - 1 Pedro 1.13,14 - Hebreus 12.15).

Pode deixar o seu próprio arbítrio (1 Coríntios 7.37), tornar-se escravo do:
- Arbítrio dos homens (Colossenses 2.18).
- Da vontade de satanás (2 Timóteo 2.25,26)
- Da vontade dos homens (1 Pedro 4.1,3). 
- E do Arbítrio de Cristo (Colossenses 3.15), que significa andar nas obras que Deus de antemão preparou para que andássemos nelas (Efésios 2.10), que é o objetivo da Eleição e vocação celestial (Efésios 1.4 - 1 Pedro 1.2), mediante a fé no recebimento da Graça (1 Pedro 1.2), mediante a fé guardados pelo poder de Deus para a Salvação que Há de ser revelada no último tempo (1 Pedro 1.5), mediante a fé refinada pelo calor das perseguições (1 Pedro 1.7), para alcançar o objetivo final da fé (1 Pedro 1.9), a Salvação das vossas almas.

Isto é confirmar a eleição e vocação celestial (2 Pedro 1.10 - 2 Timóteo 1.12,14 - 2.10,12 - 4.6,8 - Atos 20.24 - Hebreus 12.1,3,14).

O Eleito não é salvo incondicionalmente, mas através da perseverança em permanecer em Cristo (Gálatas 5.1 - João 15.2 e 6 - 2 Timóteo 2.10 - Hebreus 2.1,3 - 3.1,6,12,14 - 2 Pedro 3.13,14,17 - Hebreus 10.10,14,23,25,26,35,36,38,39 - Colossenses 1.23).

A Eleição está em Cristo (Ef 1.4).
A Vocação está em Cristo (Hebreus 3.1).
A Salvação está em Cristo (2 Tm 2.10).
A Vida Eterna está em Cristo (1 João 5.10,12).

Permaneça em Cristo, pois não podemos desconsiderar a Severidade de Deus (Romanos 2.4 - 11.22).
Alguns são entregues ao seu próprio "conselho" (Salmo 81.8,12), porém agora com o agravante da apostasia (Tito 3.10,11 - Salmo 9.17 - Jeremias 2.1,4,11,19 - 7.13 - Apocalipse 3.1,3).

É possível se desligar de Cristo (Gálatas 5.4), e isto significa maldição (Romanos 9.3).`,
    rating: 5.0,
    pages: 2,
    coverImage: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=400&h=600",
    language: "Português",
    format: "PDF, EPUB",
    publishDate: "2024-04-05",
    views: 750,
    featured: false
  },
  {
    id: "5",
    title: "O Ministério da Reconciliação",
    author: "Fabio Russo",
    category: "Teologia",
    description: "O centro da pregação do Evangelho: o sacrifício de Cristo na cruz, a salvação através da fé e a necessidade de uma igreja verdadeiramente bíblica.",
    fullDescription: `O ministério da reconciliação é o centro da pregação do Evangelho e se uma igreja não tem como objetivo levar as pessoas a essa compreensão, não é uma igreja bíblica.

Quando João exclamou "eis o Cordeiro de Deus que tira o pecado do mundo", o que ele estava dizendo, não significava tirar cada pecado indiscriminadamente das pessoas, mas que Deus havia Se reconciliado com Ele próprio, na Cruz, por meio de Sua encarnação, sofrendo a imputação da ofensa de Adão: "No dia em que dela comerdes certamente morrerás" (Gênesis 2.16,17).

Se o ser humano pecou, o ser humano devia morrer, e esta era uma morte espiritual; destituídos da Glória de Deus - Romanos 3.23. Toda a raça humana - Romanos 5.12,14.
A morte física era o meio para a morte espiritual; inimigos de Deus, em direção à ira de Deus - Efésios 2.1,5.
Esse é o salário do pecado, a morte - Romanos 6.23.

Quando Cristo morreu na Cruz, houve uma reconciliação de Deus com aquela condenação no Éden: "Deus estava em Cristo reconciliando consigo o mundo, não imputando aos homens as suas transgressões" - 2 Coríntios 5.18,19.

Agora, a justiça de Deus (morte e condenação eternas) se revela no Evangelho (Vida Eterna) - Romanos 6.23.
Por meio de Adão, a morte reinou por causa do pecado; a morte é o juízo para a condenação - Romanos 5.18.
Pelo ato de justiça (morte) de Jesus, Graça sobre todos, "para" a justificação que dá Vida - Romanos 5.18.

Percebe que "por meio da reconciliação", Deus não mais iria imputar aos homens as suas transgressões oriundas da queda de Adão, mas que "o pecado" passa a ser a "rebeldia em crer neste ministério reconciliador"?
"Do pecado, porque não creem em Mim" - João 16.9.

Cristo provou a morte por todo homem - Hebreus 2.9.
Chama aos homens que todos, em todo lugar, se arrependam - Atos 17.30,31.
Se arrepender do que?
Das obras mortas, da natureza adâmica, de ter vivido até então de acordo com os pensamentos obscurecidos - Efésios 4.17,19 - 1 Pedro 1.13,19.

Como esse pecador pode se arrepender?
Por meio da pregação do Evangelho:
"Agora, porém, notifica aos homens" - Atos 17.30.

Observe que a obra de Deus é Soberana e unilateral:
"Ninguém subiu ao Céu e trouxe do Alto a Cristo, ninguém desceu ao abismo e O ressuscitou dentre os mortos" - Romanos 10.6,7.
Como podemos ver, a aproximação também foi por uma iniciativa Divina, pois "Ele notifica aos homens".

Quem crer não será condenado e quem não crê já está condenado - João 3.18,19.
A pregação do Evangelho é algo simples e poderoso, ela põe diante do pecador o caminho do "bem e do mal, da morte e da vida", e este pecador é orientado a dar ouvidos à voz de Deus:
"Desperta ó tu que dormes" - Efésios 5.14.

Essa é uma iluminação prévia, porém progressiva, "Até que o dia clareie e a Estrela da alva nasça em vossos corações" - 2 Pedro 1.19 - Provérbios 4.18.

A pessoa pode ser iluminada pela "Verdadeira Luz" que traz essa iluminação prévia através da pregação do Evangelho e ser reconduzida à vida, pelo milagre do novo nascimento (Efésios 2.1,5 - João 12.46), ou pode permanecer morto por sua própria rebelião:
"Contudo, não quereis vir a Mim para terdes vida" - João 5.40.
Mas é uma verdade bíblica que o morto pode escutar a voz do Espírito e mesmo assim, não querer sair do estado em que está.

Portanto, a pregação do Evangelho nas denominações está completamente em oposição ao que realmente deve ser:
1 - A Escritura fala de Cristo e não dos anseios humanos - Lucas 24.27.
2 - O nome de Jesus deve ser pregado para arrependimento para a remissão dos pecados - Lucas 24.47.
3 - Cristo abre o entendimento dos que se chegam a Ele - Lucas 24.45; daí a revelação prévia e progressiva.

Não é de se admirar que Jesus não está do lado de dentro de Laodicéia, que representa o último estágio espiritual da igreja na terra, não há mais pregação bíblica na grande maioria das igrejas evangélicas no Brasil, nem sabem o que significa uma pregação bíblica.

Volte-se ao primeiro amor, volte-se para o único modelo de igreja que temos, a igreja primitiva e no decorrer dos séculos ao modelo daqueles que lutaram por preservar a doutrina cristã nos corações dos que a ouvem.`,
    rating: 5.0,
    pages: 3,
    coverImage: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=400&h=600",
    language: "Português",
    format: "PDF, EPUB",
    publishDate: "2024-05-15",
    views: 1100,
    featured: false
  },
  {
    id: "6",
    title: "Cristo, Rocha Eternal",
    author: "Fabio Russo",
    category: "Bíblia",
    description: "Uma explicação direta baseada em Mateus 16.13,20 de que Cristo é a única Pedra de sustentação da igreja e da Salvação humana.",
    fullDescription: `Cristo, Rocha Eternal.

Uma simples leitura em Mateus 16.13,20, deixa claro que "Cristo é a Pedra"!
No Antigo testamento a pedra já estava prefigurando Cristo (1 Coríntios 10.4), e Pedro escreveu sobre a sustentação da igreja (1 Pedro 2.4,8), e não só da igreja, mas da Salvação para a humanidade que depende desta Pedra (Atos 4.11,12).

Cristo sendo a Pedra de sustentação, não foi para Pedro, um dos pontos difíceis de entender, nas cartas de Paulo (Efésios 1.4,21,22).
Não é de admirar que Pedro, por duas vezes, diz que "Cristo é a Pedra".

A perícope de Mateus 16.13,20, não está em Pedro, mas em Cristo:
"Que diz o povo ser o Filho do homem"?
- João Batista, Elias, Jeremias ou alguns dos profetas! Disseram os discípulos.
E vós, quem dizeis que Sou?

A centralidade é o Filho do homem, assim como a própria Escritura Sagrada (Lucas 24.27 - Atos 28.23).
Pedro disse:
"Tu és O Cristo, O Filho do Deus Vivo".
Jesus exclama, dizendo que do Alto veio a revelação a Pedro.

Jesus continua: "Também te digo que tu és Pedro (reconhecido como apóstolo) e sobre esta Pedra (sobre a revelação que Pedro teve, sobre o Cristo, o Filho do Deus Vivo) edificarei a Minha igreja".
As portas do inferno (a ira de Deus estipulada no Éden) não prevalecerão contra ela.

O ministério da reconciliação foi feito em Cristo (2 Coríntios 5.18,19 - Colossenses 1.20 - Romanos 8.3); Deus fez as pazes com a Sua própria condenação (Gênesis 2.16,17).
Portanto tem paz com Deus (Romanos 5.1/8.1) todo aquele que recebe a mensagem da Pedra de sustentação: "Cristo, e mais ninguém"!`,
    rating: 5.0,
    pages: 2,
    coverImage: "/rocha_eternal.png",
    language: "Português",
    format: "PDF, EPUB",
    publishDate: "2024-06-10",
    views: 890,
    featured: false
  },
  {
    id: "7",
    title: "Quando ouvires a Sua voz, não endureçam o coração",
    author: "Fabio Russo",
    category: "Teologia",
    description: "Uma reflexão sobre a misericórdia de Deus, a importância do arrependimento e os riscos da resistência em voltar à presença do Senhor após o pecado.",
    fullDescription: `Quando ouvires a Sua voz, não endureçam o coração.

O que você fará de Jesus chamado "o Cristo", continuará com Ele?
À igreja de Tiatira, Ele advertiu:
"Dei-lhe tempo para que se arrependesse; ela, todavia, não quer arrepender-se de sua prostituição"
(Apocalipse 2.21).
Pense na Misericórdia de Deus, ao dizer para Moisés mandar os filhos de Israel "lavarem as vestes, purificar as vestes (As vestes representam o nosso estado espiritual - Apocalipse 3.2,5 - 19.7,8 - Eclesiastes 9.8), eles deveriam fazer isso no "primeiro e no segundo dia", pois, ao terceiro dia, o Senhor desceria até o cume do Monte Sinai para encontrar-Se com o Seu povo, e aqueles que estivessem com as vestes purificadas, iam subir ao encontro do Senhor (Êxodo 19.1,20).

Podemos imaginar que o objetivo de ir cada um para a sua tenda, não foi propriamente dito "lavar uma peça de roupa", mas a reflexão espiritual sobre o peso do pecado e rebeldia contra Deus.
O texto à igreja de Tiatira diz: "Dei-lhe tempo para que se arrependesse".
Já pensou na Misericórdia de Deus, dando tempo para que os filhos de Israel parassem para pensar enquanto lavavam as vestes?

Assim é com cada um de nós no individual. 
Corremos o risco de não subir, de não sermos aprovados?
Sim, pois o povo não subiu, e dos que foram rebeldes, Deus não permitiu que aquela geração entrasse na terra prometida, haja vista que não creram em Sua Salvação, nem quiseram ouvir o Seu Conselho (Salmo 78.22 - 81.8,12).
Podemos fazer um paralelo sobre quem vai subir no Arrebatamento da igreja (Êxodo 19.10,11 - 1 Tessalonicensses 4.16,17).

À igreja de Éfeso, Ele disse: "Arrepende-te, pois, e volta à prática das primeiras obras" (Apocalipse 2.4,5).

À igreja de Sardes, Ele disse:
"Lembra-te, pois, do que tens recebido e ouvido, guarda-o e arrepende-te"
(Apocalipse 3.2,3).

Observe que o pecado em si não pode trazer prejuízos as vezes "irreversíveis" à sua comunhão com Deus, mas sim a sua resistência em voltar à Presença Dele, pois a Bíblia diz que "se confessarmos os nossos pecados, Ele é Fiel e Justo para nos perdoar os pecados e nos purificar de toda injustiça" (1 João 1.9).

A purificação que procede do Perdão de Deus, te restaura pelo Sangue de Jesus, e se alguém te condenar por conta do pecado confessado, saiba que nada nem ninguém tem autoridade espiritual para te condenar, pois "quem intentará acusação contra os eleitos de Deus? É Deus quem os justifica". (Romanos 8.33).
Justificação e purificação. 
A justificação te traz "Paz" (Romanos 5.1), e a Purificação te dá condições de "Caminhar em paz" ("As coisas que nos conduzem à Vida e à Piedade, nos foram doadas" - 2 Pedro 1.3,4).
Agora você está limpo do teu pecado.

Quando Paulo diz que nada poderá nos separar do amor de Deus que está em Cristo (Romanos 8.35,39), ele fala sobre tudo que está fora do raio de ação humana:
Morte
Vida 
Potestade 
Principado 
Altura 
Profundidade 
Anjos
Presente
Por vir
Qualquer criatura...

"Em todas estas coisas somos mais que vencedores, por meio Daquele que nos amou" (Romanos 8.37).
O texto aos Romanos vem seguindo a "justificação pela fé", fé essa que reconhece a dependência do sacrifício de Cristo:
"Quem me livrará do corpo desta morte? Graças a Deus por Jesus Cristo" (Romanos 7.24,25).

Nada pode te separar?
Depende, pois Paulo não citou a "resistência em voltar para Deus" após o pecado cometido.
Veja o que o profeta Jeremias escreveu:
"E, depois de ela ter feito tudo isso, Eu pensei que ela voltaria para Mim, mas não voltou" (Jeremias 3.7).
Mais abaixo ele escreveu:
"Somente reconhece a tua iniquidade, reconhece que transgrediste contra o Senhor, teu Deus" (Jeremias 3.13).

A malícia em abandonar a Deus por causa do pecado, destruirá os que insistem em manter-se distante do Senhor (Jeremias 2.1,4,11,19 - 17.13).
Paulo disse que aqueles que não aceitam a instrução, por eles mesmos estão condenados (Tito 3.10,11).
Pedro disse que muitos "estão sendo conduzidos pelos erros dos insubmissos" (2 Pedro 3.17), e portanto não serão "encontrados por Cristo, nesta Paz" (2 Pedro 3.13,14), na Paz da "Justificação e Purificação" (Romanos 5.1).

A voz que Pedro ouviu do Alto, disse:
"Não tornes tu, comum, ao que Deus purificou" (Atos 10.15).
Ora, Deus quer te purificar de sua imundícia, mas será que você quer?
(Ezequiel 24.13).

Portanto, permanecerá sem a Purificação, e Deus poderá entregar-te a um estado mental reprovável (Romanos 1.28 - 2 Tessalonicensses 2.10,12), e o estágio final do pecado, que é endurecer o coração através do engano, te afastará sim, do amor de Deus, do amor salvífico. 
Cuidado, apenas volte para Deus, volte quantas vezes forem necessárias, volte com fé, pois Ele endireitará o seu caminho (2 Samuel 22.33), pois Jesus disse que é "na vossa perseverança que salvareis as vossas almas" (Lucas 21.19 - Hebreus 10.38,39).

Apenas permaneça na Presença de Deus, mesmo que as suas vestes ainda estejam sujas, mas permaneça lutando, não pare.

Deus abençoe a todos. 
Fabio Russo.`,
    rating: 5.0,
    pages: 4,
    coverImage: "/coracao_duro.jpg",
    language: "Português",
    format: "PDF, EPUB",
    publishDate: "2024-07-20",
    views: 1050,
    featured: false
  },
  {
    id: "8",
    title: "Qual a compreensão bíblica de Atos 4.27,28?",
    author: "Fabio Russo",
    category: "Teologia",
    description: "Uma análise bíblica aprofundada sobre Atos 4.27-28, desconstruindo a interpretação calvinista sobre a predestinação e a morte de Cristo.",
    fullDescription: `Qual a compreensão bíblica de Atos 4.27,28?
Texto preferido dos calvinistas.

O interessante é que o propósito e pre determinação de Deus, não foi usar alguém para a morte de Cristo, haja vista que Ele próprio disse que tinha Poder para dar e tornar a tomar a Sua vida (João 18.10), ou seja, não precisaria de uma ajudinha externa, incluindo Judas (João 13.27 - Atos 1.25).
Outro fator relevante é que Pilatos estava prestes a soltar a Jesus (Atos 3.13).

Pedro disse que eles (judeus) mataram o Autor da Vida (Atos 3.15), junto com as autoridades e gentes de Israel, que pelo desígnio de Deus, deveria ser morto (Atos 2.23 - 3.18), mas por presciência sabia que muitos iriam "se meter nos negócios desse Justo" (Mateus 27.19).
Deus sabe o que pessoas farão (Êxodo 3.19 - João 6.64), mas não determina todas as coisas (Jeremias 32.35), embora tenha estabelecido o parâmetro para juízo (Deuteronômio 30.15 e 19).

A grande questão é:
Se Deus predestinou Pilatos, as autoridades e os judeus, à perdição, e por isso foram predestinados a fazer isto, então por que Pedro disse que "fizeram por ignorância" (Atos 3.17), e os estava chamando ao arrependimento e conversão (Atos 3.19)?

Aí sim, após a expiação, todo aquele que, ao ouvir a mensagem da reconciliação (Romanos 5.18 - 11.32 - 2 Coríntios 5.18,19 - Colossenses 1.20), viesse a endurecer o coração, permaneceria no estado de condenação (Atos 3.23 - João 3.18,19,36 - 12.46,48 - 1 João 5.6,8,10).

Pois o pecado é não crer em Cristo, no sacrifício de Cristo (João 16.9).`,
    rating: 5.0,
    pages: 2,
    coverImage: "/compreensao_atos.png",
    language: "Português",
    format: "PDF, EPUB",
    publishDate: "2024-08-01",
    views: 1300,
    featured: false
  },
  {
    id: "9",
    title: "Graça e Perdão, Amor e Justiça",
    author: "Fabio Russo",
    category: "Estudos Bíblicos",
    description: "Um estudo sobre a universalidade da expiação, o significado real da Graça, e como o perdão e a justiça de Deus se manifestaram na cruz.",
    fullDescription: `Graça e Perdão, Amor e Justiça. 

Deus amou ao "mundo" de tal maneira que deu o Seu Filho Unigênito (para que, pela Graça de Deus, "provasse a morte por todo homem", Hebreus 2.9), para que todo o que Nele crê (Ora, Deus não "levou em conta" os tempos da ignorância; agora, porém, notifica aos homens que "todos", em toda parte, se arrependam, Atos 17.30), não pereça (Eu vim como Luz ao mundo a fim de que todo aquele que crê em Mim não PERMANEÇA em trevas, não pereça, João 12.46), mas tenha a Vida Eterna (e esta Vida está no Seu Filho, 1 João 5.10,12. Quem dá crédito ao Filho, tem o testemunho em si mesmo). João 3.16.

Quem foi chamado ao arrependimento?
Todos, em toda parte.
Por quem Cristo provou a morte?
Por todo homem.
Por que Ele não levou em conta os tempos da ignorância?
Porque a morte passou a todos os homens, porque todos pecaram...mesmo sobre aqueles que não pecaram à semelhança da transgressão de Adão (Romanos 5.12,14).

E quem não pecou à semelhança da transgressão de Adão?
Todos.
Sobre quem veio juízo para a condenação?
Sobre todos (Romanos 5.18).
E a Graça que justifica para a Vida, pelo ato de justiça do último Adão?
Sobre todos (Romanos 5.18).

Como isto se deu?
Deus condenou a transgressão de Adão no corpo físico de Cristo (Romanos 8.3).
Quem havia pecado?
Adão, o homem que rompeu a aliança (Gênesis 2.16,17/Oséias 6.7).
Então quem devia morrer?
Aquele que pecou, e como toda raça humana descende deste, todos pecaram (Romanos 5.12,14).
Como Deus resolveu esta questão?
Condenando essa transgressão sendo Ele próprio, na Sua encarnação, a oferta pelo pecado do primeiro Adão (Romanos 8.3/Isaías 53.10).
A vida de toda carne está no sangue, e sem derramamento de sangue não há remissão de pecados (Levítico 17.11/Hebreus 9.22).

Mas a Graça não é eficaz, como pode ter sido por todos os homens, mas não salvar a todos?
A Bíblia diz que a Graça é o único meio pelo qual o homem pode ser salvo (Atos 4.11,12), mas não diz que vai salvar indiscriminadamente o indivíduo, apenas diz que "pela Graça", por intermédio da Graça é que o homem é salvo (Efésios 2.8,9).

O texto diz que Deus teve misericórdia de todos, e por isso trouxe Graça, quando resolve a questão da ira de Deus, em que, em seu primeiro ato reconciliador, morre na Cruz, tornando-Se maldito de Deus (Deuteronômio 21.22,23/Gálatas 3.13/1 Coríntios 15.52).
Ele acertou as contas com a Sua própria Condenação estipulada no Éden (Colossenses 1.20/2 Coríntios 5.18,19), e chama a todos para que, ao dar crédito a essa mensagem, possam entrar na Aliança da reconciliação. 

Graça sobre significa que todos são chamados na Graça e no Evangelho (através da pregação, Romanos 10.17), a isto o homem deve responder com fé.
Mas como Deus teve misericórdia de todos, a Bíblia diz que Ele tem misericórdia de quem quer, e que não depende de quem quer ou de quem corre (Romanos 9.15,16)?
Na realidade o texto segue dizendo que isto diz respeito à unilateralidade da Graça, quando não dependeu do ser humano caído "subir ao Céu e trazer do Alto a Cristo, nem descer ao Abismo e ressuscitá-Lo dentre os mortos" (Romanos 10.6,7), mas que, pela misericórdia de Deus, que para trazer essa Graça, encerrou a todos debaixo da desobediência (todos culpados), para com todos usar de misericórdia (Romanos 11.32), e que para a pregação desta fé que havia de ser revelada após a encarnação de Cristo (Gálatas 3.23,24/Hebreus 2.3/Mateus 4.17), então seria salvo todo aquele que acreditasse (Romanos 10.9).

Na realidade Paulo já vem discorrendo sobre o Evangelho (Karôv/pregação/aproximação), sendo o Poder de Deus para a Salvação, pois a justiça (Romanos 6.23), a morte de Cristo (que provou a morte por todo homem, Hebreus 2.9), Se revelou nas boas novas (Romanos 1.16,17).

O recebimento da Graça é condicionado à fé (Efésios 2.8,9, "para que todo aquele que Nele crê", João 3.16):
"Quem crê não é julgado, o que não crê já está julgado" (permanece em trevas, João 12.46/5.40/Efésios 5.14), João 3.18,19.
Primariamente, o pecado passa a ser "não crer na expiação":
"Do pecado, porque não creem em Mim" (João 16.8,11).
E depois porque há o acúmulo de ira (Romanos 2.5), pois agora este impenitente permanece julgado pelo pecado de Adão, e por se manter em rebelião contra a encarnação do próprio Deus (João 3.36), ignorando a Bondade de Deus (Romanos 2.4), que por meio da Graça, nos conduz ao arrependimento para remissão de pecados (Katará).

Até agora, vimos uma parte da ação da Graça, e a aplicação da mesma será na vida dos que creem. 
A possibilidade de Salvação se dá a todos (observe que a Graça é "para a justificação que dá Vida"), por conta da justiça de Deus (Provérbios 11.1/16.11/20.10/Deuteronômio 25.13,16), que em hipótese alguma, traria Vida a uns, em detrimento de outros em que ambos tem o mesmo pecado (isto está fora de cogitação).

A condicionalidade permanece, quando vemos às advertências a que permaneçam em fé, aqueles que um dia foram chamados na Graça e no Evangelho, a que não se afastem da Esperança do Evangelho (Hebreus 2.1,3/3.1,6,12,14/Gálatas 1.6/5.7,8/5.1/Colossenses 1.23/2 Pedro 3.13,14,17/1 João 2.24,25/3.3).`,
    rating: 5.0,
    pages: 4,
    coverImage: "/graca_amor.png",
    language: "Português",
    format: "PDF, EPUB",
    publishDate: "2024-08-10",
    views: 1150,
    featured: true
  }
];