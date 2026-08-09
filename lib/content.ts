// Conteúdo central do casamento — edite aqui se algo mudar.

export const WEDDING = {
  noivos: {
    ela: "Áviny Rhanik",
    ele: "Állan Patrick",
  },
  data: {
    diaSemanaExtenso: "26 de setembro de 2026",
    horario: "19:30",
    prazoConfirmacao: "10 de julho de 2026",
  },
  padrinhosDela: {
    nomes: ["Cláudia de Moura Pires", "Áureo Prego"],
  },
  padrinhosDele: {
    nomes: ["Antônia Leite de Siqueira", "Johnathan Lopes de Araújo Souza"],
  },
  cerimonia: {
    nome: "Capela Divina Misericórdia",
    endereco: "Rua Guimarães Lima, Qd.06 Lt.06-07 - Vila Rosa, Goiânia",
    link: "https://share.google/k8HOr8neuc1rNvPFj",
  },
  recepcao: {
    nome: "Espaço ON",
    link: "https://share.google/PjdEoYzSMhOGgavC6",
  },
  dressCode:
    "Traje esporte fino. Pedimos, por gentileza, que as convidadas evitem o branco — cor reservada à noiva.",
  presentes: [
    {
      id: "lua-de-mel",
      nome: "Cota para a Lua de Mel",
      descricao: "Ajude a construir a viagem dos sonhos do casal.",
    },
    {
      id: "jogo-panelas",
      nome: "Jogo de panelas",
      descricao: "Para os primeiros pratos da nova casa.",
    },
    {
      id: "jogo-cama",
      nome: "Jogo de cama casal",
      descricao: "Conforto para as noites em casa.",
    },
    {
      id: "eletro-cozinha",
      nome: "Eletrodomésticos de cozinha",
      descricao: "Liquidificador, air fryer, cafeteira e afins.",
    },
    {
      id: "enxoval-banheiro",
      nome: "Enxoval de banheiro",
      descricao: "Toalhas e itens para o banheiro novo.",
    },
    {
      id: "vale-presente",
      nome: "Vale-presente livre",
      descricao: "Qualquer valor ajuda — o carinho é o que importa.",
    },
  ],

  // Nova versão, estruturada por categoria — vai substituir a lista simples
  // acima assim que o layout novo (Open Design) for implementado.
  presentesInfo: {
    intro:
      "Como já moramos juntos, nossa casa já está montada, então preparamos uma lista com alguns itens que ainda precisamos ou gostaríamos de renovar. Caso prefiram, também ficaremos muito felizes com um presente em dinheiro via Pix, que será utilizado para nosso lar e para essa nova fase da nossa família.",
    categorias: [
      {
        id: "cama-mesa-banho",
        nome: "Cama, mesa e banho",
        itens: [
          "Jogo de lençol Queen (100% algodão)",
          "Edredom Queen",
          "Manta para cama Queen",
          "Jogo de toalhas de banho",
          "Toalhas de rosto",
          "Tapete para banheiro",
        ],
      },
      {
        id: "cozinha",
        nome: "Cozinha",
        itens: [
          "Jogo de panelas",
          "Frigideira antiaderente",
          "Panela de pressão",
          "Jogo de talheres",
          "Jogo de facas",
          "Faqueiro para churrasco",
          "Jogo de pratos",
          "Jogo de taças",
          "Travessas de vidro",
          "Assadeiras",
          "Potes herméticos para mantimentos",
          "Jogo de potes de vidro",
          "Escorredor de louças",
        ],
      },
      {
        id: "eletroportateis",
        nome: "Eletroportáteis",
        itens: ["Air Fryer", "Cafeteira", "Mixer", "Chaleira elétrica"],
      },
    ],
    pix: {
      // TODO(Allan): colar a chave Pix real aqui (CPF, e-mail, telefone ou
      // chave aleatória) e o nome do favorecido como aparece no banco.
      chave: "PIX_KEY_AQUI",
      nomeFavorecido: "Áviny Rhanik / Állan Patrick",
      // Caminho da imagem do QR Code (gerar e colocar em /public quando a
      // chave definitiva estiver confirmada).
      qrCodeSrc: "/pix-qrcode.png",
    },
  },

  // Regra prática sobre acompanhante extra / convite individual.
  convidadoExtra:
    "Quer levar um acompanhante extra? Essa opção é exclusiva para namorado(a) ainda não informado(a) aos noivos. Nesse caso, avise diretamente Áviny e Állan com antecedência — a festa é só com convite individual, e sem ele não é possível entrar.",
} as const;