import { MigrationInterface, QueryRunner } from 'typeorm'

const aecoTable = 'aecos'
const pageTable = 'pages'

const pages = [
  {
    id: 1,
    name: 'Home',
    metadata: {
      background: 'home_background.png',
      logoLang: {
        path: '/images/language_icon.png',
        alt: 'Language icon',
      },
      logoHelp: {
        path: '/images/Help_icon.png',
        alt: 'Help icon',
      },
      logoUp: {
        path: '/images/aeco.png',
        alt: 'AECO Logo up',
      },
      logoDown: {
        path: '/images/reciclaygana.png',
        alt: 'Recicla y Gana Logo down',
      },
      button: {
        label: 'INICIAR',
        bgColor: 'pink',
        url: '/conditions',
        textColor: 'white',
        borderRadious: 'full',
        fontSize: 'xl8',
      },
    },
  },
  {
    id: 2,
    name: 'Language',
    metadata: {
      background: 'language_background.png',
      button: {
        background: 'language_background.png',
        button: {
          labelEs: 'ACEPTAR',
          labelEn: 'AGREE',
          bgColor: 'white',
          url: '/home',
          textColor: 'black',
          borderRadious: 'xl3',
          fontSize: 'xl6',
        },
      },
    },
  },
  {
    id: 3,
    name: 'Help',
    metadata: {
      background: 'help_background.png',
      textCenter: {
        title: 'Soporte',
        description: 'Cualquier duda o aclaración estamos para escucharte.',
        phoneText: 'Envíanos WhatsApp',
      },
      textDown: {
        phone: '+52 999 888 7777',
        description: '¡Gracias por tu colaboración!',
      },
    },
  },
  {
    id: 4,
    name: 'Conditions',
    metadata: {
      background: 'shrubbery.png',
      title: 'Recompensas Disponibles',
      description:
        'Tus envases deben estar en las siguientes condiciones para poder ser reciclados:',
      button: {
        label: '¡Entendido!',
        bgColor: 'white',
        url: '/example',
        textColor: 'black',
        borderRadious: 'xl3',
        fontSize: 'xl6',
      },
      lists: [
        {
          title: 'Envases de PET',
          icon: '/images/bottle.png',
          items: ['Sin aplastar.', 'Con etiqueta.', 'Sin residuos.'],
        },
        {
          title: 'Latas de Aluminio',
          icon: '/images/can.png',
          items: [
            'Sin aplastar.',
            'Código de barras visible.',
            'Sin residuos.',
          ],
        },
      ],
    },
  },
  {
    id: 5,
    name: 'Example',
    metadata: {
      background: 'leafBackground.png',
      description: 'Inserta tu envase con el código de barras hacia arriba',
      centerImage: '/images/example.png',
      button: {
        label: '¡Estoy listo!',
        bgColor: 'white',
        url: '/insert',
        textColor: 'black',
        borderRadious: 'xl3',
        fontSize: 'xl6',
      },
    },
  },
  {
    id: 6,
    name: 'Insert',
    metadata: {
      background: 'leafBackground.png',
      title: 'INSERTAR ENVASE',
      description: 'EL RECICLAJE COMIENZA AQUÍ',
      centerImage: '/images/containers.png',
    },
  },
  {
    id: 7,
    name: 'Scanning',
    metadata: {
      background: 'leafBackground.png',
      title: 'LEYENDO',
      description: 'ESTAMOS TRABAJANDO PARA TI',
      centerImage: '/images/containers.png',
    },
  },
  {
    id: 8,
    name: 'Accepted',
    metadata: {
      background: 'backgroundAccepted.png',
      title: 'ENVASE ACEPTADO',
      centerImage: '/images/bottleAccepted.png',
      buttonUp: {
        label: 'INGRESAR OTRO ENVASE',
        bgColor: 'green',
        url: '/insert',
        textColor: 'white',
        borderRadious: 'xl3',
        fontSize: 'xl6',
      },
      buttonDown: {
        label: 'FINALIZAR',
        bgColor: 'pink',
        url: '/rewards',
        textColor: 'pink',
        borderRadious: 'xl3',
        fontSize: 'xl6',
      },
    },
  },
  {
    id: 9,
    name: 'Rejected',
    metadata: {
      background: 'leafBackground.png',
      title: 'ENVASE RECHAZADO',
      centerImage: '/images/rejected.png',
      buttonUp: {
        label: 'INTENTAR CON OTRO ENVASE',
        bgColor: 'green',
        url: '/insert',
        textColor: 'white',
        borderRadious: 'xl3',
        fontSize: 'xl6',
      },
      buttonDown: {
        label: 'FINALIZAR',
        bgColor: 'pink',
        url: '/rewards',
        textColor: 'pink',
        borderRadious: 'xl3',
        fontSize: 'xl6',
      },
      modalRight: {
        title: 'AÑADIR CODIGO DE BARRAS',
        url: '/add_barcode',
        fintSize: 'xl6',
      },
    },
  },
  {
    id: 10,
    name: 'Unidentified',
    metadata: {
      background: 'leafBackground.png',
      title: 'ENVASE NO IDENTIFICADO',
      buttonUp: {
        label: '¡INTENTAR DE NUEVO!',
        bgColor: 'green',
        url: '/insert',
        textColor: 'white',
        borderRadious: 'xl3',
        fontSize: 'xl6',
      },
      buttonDown: {
        label: 'FINALIZAR',
        bgColor: 'pink',
        url: '/rewards',
        textColor: 'pink',
        borderRadious: 'xl3',
        fontSize: 'xl6',
      },
    },
  },
  {
    id: 11,
    name: 'AddBarcode',
    metadata: {
      background: 'leafBackground.png',
      textCenter: {
        title: 'AÑADIR CÓDIGO DE BARRAS',
        description:
          'Envianos a este whatsapp una foto del envase con la etiqueta y el código de barras VISIBLE',
      },
      textDown: {
        phone: '+52 999 888 7777',
        description: '¡Gracias por tu colaboración!',
      },
    },
  },
]

export class CreatePagesSeeder1728066087563 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const getAeco = await queryRunner.query(
      `SELECT * FROM ${aecoTable} WHERE name = 'AECO Main' LIMIT 1`,
    )

    const aecoId = getAeco[0]?.id

    if (!aecoId) console.error('AECO not found')

    await queryRunner.query(
      `INSERT INTO ${pageTable} (name, metadata, "aecoId") 
            VALUES ${pages
              .map(
                (page) =>
                  `('${page.name}', '${JSON.stringify(page.metadata)}', ${aecoId})`,
              )
              .join(',')}`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const getAeco = await queryRunner.query(
      `SELECT * FROM ${aecoTable} WHERE name = 'AECO Main' LIMIT 1`,
    )

    const aecoId = getAeco[0]?.id

    if (!aecoId) console.error('AECO not found')

    await queryRunner.query(
      `DELETE FROM ${pageTable} WHERE "aecoId" = ${aecoId}`,
    )
  }
}
