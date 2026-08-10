// Conteúdo central do casamento — edite aqui se algo mudar.

export const WEDDING = {
  noivos: {
    ela: "Áviny Rhanik",
    ele: "Állan Patrick",
  },
  data: {
    diaSemanaExtenso: "26 de setembro de 2026",
    horario: "19:30",
    prazoConfirmacao: "25 de agosto de 2026",
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
      {
        id: "sala-moveis",
        nome: "Sala e móveis",
        itens: [
          "TV",
          "Sofá",
          "Poltrona",
          "Cadeira",
          "Rack ou painel para TV",
          "Mesa de centro",
          "Tapete para sala",
          "Luminária de chão ou abajur",
        ],
      },
    ],
    pix: {
      // TODO(Allan): colar a chave Pix real aqui (CPF, e-mail, telefone ou
      // chave aleatória) e o nome do favorecido como aparece no banco.
      chave: "62 9 8213-8297",
      nomeFavorecido: "Áviny Rhanik / Állan Patrick",
      // Caminho da imagem do QR Code (gerar e colocar em /public quando a
      // chave definitiva estiver confirmada).
      qrCodeSrc: "/pix-qrcode.png",
    },
  },

  // Regra prática sobre acompanhante extra / convite individual.
  convidadoExtra:
    "Quer levar um acompanhante extra? Essa opção é exclusiva para namorado(a) ainda não informado(a) aos noivos. Nesse caso, avise diretamente Áviny e Állan com antecedência — a festa é só com convite individual, e sem ele não é possível entrar.",

  // Texto do modal que aparece quando o convidado marca que vai levar acompanhante.
  acompanhanteModal: {
    titulo: "Sobre o seu acompanhante",
    mensagem:
      "Cada convite é individual — então, pra conseguirmos receber bem cada pessoa, qualquer acompanhante precisa ser combinado com a gente antes da festa. Não é falta de vontade de ter vocês por perto: é que esse é um momento que queremos viver de pertinho com quem fez parte da nossa jornada até aqui. Escreve o nome de quem vai com você aí embaixo, e não deixa de nos chamar pra combinarmos os detalhes, tá bom?",
    campoLabel: "Nome do acompanhante",
    botaoConfirmar: "Combinado, continuar",
  },

  // Mensagens finais do fluxo de RSVP, depois do envio.
  rsvpResultado: {
    simTitulo: "Presença confirmada!",
    simMensagem:
      "Ficamos muito felizes com a sua confirmação — mal podemos esperar pra celebrar esse dia com você. 💛",
    simPresenteConvite:
      "Se quiser nos ajudar a começar essa nova fase, preparamos uma listinha de presentes com carinho. Mas o que mais importa mesmo é ter você com a gente nesse dia.",

    naoTitulo: "Sentiremos sua falta",
    naoMensagem: "Que pena que você não vai poder estar com a gente — mas obrigado por nos avisar. 💛",
    naoSiteAtivo:
      "O site vai continuar no ar até o dia do casamento. Se alguma coisa mudar e você conseguir vir, é só voltar aqui e atualizar sua confirmação.",
    naoPresenteConvite:
      "Mesmo não podendo vir, se quiser nos presentear, ficaríamos muito felizes — dá uma olhadinha na nossa lista de presentes mais abaixo.",

    naoEnviadoTitulo: "Recebido, obrigado!",
    naoEnviadoMensagem: "Sua mensagem chegou até a gente. 💛",
  },
} as const;