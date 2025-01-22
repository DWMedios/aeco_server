import { MigrationInterface, QueryRunner } from 'typeorm'

const aecoTable = 'aecos'
const pageTable = 'pages'

const pages = [
  {
    id: 1,
    name: 'Home',
    metadata: {
      imgBg: 'home_imageBg.png',
      logoLang: {
        imgLang: '/images/language_icon.png',
        alt: 'Language icon',
      },
      logoHelp: {
        imgHelp: '/images/Help_icon.png',
        alt: 'Help icon',
      },
      logoUp: {
        imgUp: '/images/aeco.png',
        alt: 'AECO Logo up',
      },
      logoDown: {
        imgDown: '/images/reciclaygana.png',
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
      imgBg: 'language_imageBg.png',
      button: {
        imgBg: 'language_imageBg.png',
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
      imgBg: 'help_imageBg.png',
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
      imgBg: 'shrubbery.png',
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
      imgBg: 'leafimageBg.png',
      description: 'Inserta tu envase con el código de barras hacia arriba',
      imgCenter: '/images/example.png',
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
      imgBg: 'leafimageBg.png',
      title: 'INSERTAR ENVASE',
      description: 'EL RECICLAJE COMIENZA AQUÍ',
      imgCenter: '/images/containers.png',
    },
  },
  {
    id: 7,
    name: 'Scanning',
    metadata: {
      imgBg: 'leafimageBg.png',
      title: 'LEYENDO',
      description: 'ESTAMOS TRABAJANDO PARA TI',
      imgCenter: '/images/containers.png',
    },
  },
  {
    id: 8,
    name: 'Accepted',
    metadata: {
      imgBg: 'imageBgAccepted.png',
      title: 'ENVASE ACEPTADO',
      imgCenter: '/images/bottleAccepted.png',
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
      imgBg: 'leafimageBg.png',
      title: 'ENVASE RECHAZADO',
      imgCenter: '/images/rejected.png',
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
      imgBg: 'leafimageBg.png',
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
      imgBg: 'leafimageBg.png',
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
