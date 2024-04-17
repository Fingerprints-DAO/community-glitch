// @ts-nocheck
const csv = require('csv-parser')
const fs = require('fs-extra')
const path = require('path')

const outputDirs = ['A', 'B', 'C', 'D'] // Nomes das pastas de saída
const website =
  'https://community-glitch-dapp-web-app-git-develop-fingerprints.vercel.app'
const imagePath = `${website}/edition/arts/`

const description =
  'glitch by misha de ridder, released by Fingerprints, is a collection of 50 animated GIFs, stemming from photographs of erased graffiti. The act of erasing can involve both destruction and generation, transformation and reimagination—allowing for new possibilities to emerge.\n\nPlaying with notions of loss and re-coding, misha has re-animated the graffiti, inserting liminal afterimages of what was once there: faces, text, and indecipherable symbols. The result is a series of images that blur the lines between abstract painting, photography, animation, and token art. glitch meditates on the idea of “unwanted information,”—the delineation between messages that are wanted, seen, and proliferated, and those that are not. Like memes for the public space, graffiti is a subversive, spontaneous form of communication meant for the masses.\n\nAs a commentary on secondary market dynamics, misha has also introduced a twist: each time a token is traded, the artwork changes. On the first trade, the animation vanishes. Subsequent trades cause the image to fade, until eventually, the token points to a blank placeholder. \n\nCollectors can pay to restore the image to the minted original, or choose to burn the token to redeem it for a limited edition, physical fine art print through a collaboration with Assembly.'

enum VERSIONS {
  'A' = 'A',
  'B' = 'B',
  'C' = 'C',
  'D' = 'D',
}

const images = [
  {
    class: 'img',
    image: 'end-is-near',
    name: 'end is near',
    version: VERSIONS.A,
  },
  {
    class: 'img-2',
    image: 'dark-words-stain',
    name: 'dark words stain',
    version: VERSIONS.A,
  },
  {
    class: 'img-2',
    image: 'create-with-pain',
    name: 'create with pain',
    version: VERSIONS.A,
  },
  {
    class: 'img-2',
    image: 'devil-bets-lose',
    name: 'devil bets lose',
    version: VERSIONS.A,
  },
  {
    class: 'img',
    image: 'embrace-illuminate-resist',
    name: 'embrace illuminate resist',
    version: VERSIONS.A,
  },
  {
    class: 'img',
    image: 'eyes-wide-awake',
    name: 'eyes wide awake',
    version: VERSIONS.A,
  },
  {
    class: 'img-4',
    image: 'amnesia-breeds-repetition',
    name: 'amnesia breeds repetition',
    version: VERSIONS.A,
  },
  {
    class: 'img',
    image: 'fades-fangs-vanish',
    name: 'fades fangs vanish',
    version: VERSIONS.A,
  },
  {
    class: 'img-2',
    image: 'healing-through-abandonment',
    name: 'healing through abandonment',
    version: VERSIONS.A,
  },
  {
    class: 'img',
    image: 'sex-with-cops',
    name: 'sex with cops',
    version: VERSIONS.A,
  },
  {
    class: 'img',
    image: 'eat-the-rich',
    name: 'eat the rich',
    version: VERSIONS.A,
  },
  {
    class: 'img',
    image: 'delete-dull-minds',
    name: 'delete dull minds',
    version: VERSIONS.A,
  },
  {
    class: 'img',
    image: 'defy-ooze-obliterate',
    name: 'defy ooze obliterate',
    version: VERSIONS.A,
  },
  {
    class: 'img',
    image: 'blossoms-reclaim-concrete',
    name: 'blossoms reclaim concrete',
    version: VERSIONS.A,
  },
  {
    class: 'img-4',
    image: 'blue-memories-fade',
    name: 'blue memories fade',
    version: VERSIONS.A,
  },
  {
    class: 'img',
    image: 'joy-conquers-sorrow',
    name: 'joy conquers sorrow',
    version: VERSIONS.A,
  },
  {
    class: 'img',
    image: 'grind-rise-learn',
    name: 'grind rise learn',
    version: VERSIONS.A,
  },
  {
    class: 'img',
    image: 'unmask-forgotten-triumphs',
    name: 'unmask forgotten triumphs',
    version: VERSIONS.A,
  },
  {
    class: 'img',
    image: 'wipe-transform-empower',
    name: 'wipe transform empower',
    version: VERSIONS.A,
  },
  {
    class: 'img-4',
    image: 'fading-pain-canvas',
    name: 'fading pain canvas',
    version: VERSIONS.A,
  },
  {
    class: 'img-2',
    image: 'gaps-perpetuate-injustice',
    name: 'gaps perpetuate injustice',
    version: VERSIONS.A,
  },
  {
    class: 'img',
    image: 'smudged-heartbreak-tales',
    name: 'smudged heartbreak tales',
    version: VERSIONS.A,
  },
  {
    class: 'img-4',
    image: 'ignorance-to-empathy',
    name: 'ignorance to empathy',
    version: VERSIONS.A,
  },
  {
    class: 'img',
    image: 'passion-persists-here',
    name: 'passion persists here',
    version: VERSIONS.A,
  },
  {
    class: 'img-4',
    image: 'kill-the-poor',
    name: 'kill the poor',
    version: VERSIONS.A,
  },
  {
    class: 'img',
    image: 'promote-positivity-instead',
    name: 'promote positivity instead',
    version: VERSIONS.A,
  },
  {
    class: 'img',
    image: 'healing-amidst-neglect',
    name: 'healing amidst neglect',
    version: VERSIONS.A,
  },
  {
    class: 'img-2',
    image: 'forget-me-not',
    name: 'forget me not',
    version: VERSIONS.A,
  },
  {
    class: 'img',
    image: 'resist-persist-exist',
    name: 'resist persist exist',
    version: VERSIONS.A,
  },
  {
    class: 'img-2',
    image: 'notes-numb-minds',
    name: 'notes numb minds',
    version: VERSIONS.A,
  },
  {
    class: 'img-2',
    image: 'embrace-olive-diversity',
    name: 'embrace olive diversity',
    version: VERSIONS.A,
  },
  {
    class: 'img',
    image: 'preserve-the-untold',
    name: 'preserve the untold',
    version: VERSIONS.A,
  },
  {
    class: 'img-4',
    image: 'provocative-urban-expression',
    name: 'provocative urban expression',
    version: VERSIONS.A,
  },
  {
    class: 'img',
    image: 'mindful-mimicry-unleashed',
    name: 'mindful mimicry unleashed',
    version: VERSIONS.A,
  },
  {
    class: 'img',
    image: 'saving-the-world',
    name: 'saving the world',
    version: VERSIONS.A,
  },
  {
    class: 'img',
    image: 'purr-power-revolution',
    name: 'purr power revolution',
    version: VERSIONS.A,
  },
  {
    class: 'img-4',
    image: 'shadow-portal-escape',
    name: 'shadow portal escape',
    version: VERSIONS.A,
  },
  {
    class: 'img-4',
    image: 'whispers-echo-on',
    name: 'whispers echo on',
    version: VERSIONS.A,
  },
  {
    class: 'img-4',
    image: 'infernal-blaze-unraveling',
    name: 'infernal blaze unraveling',
    version: VERSIONS.A,
  },
  {
    class: 'img-2',
    image: 'silent-poison-spreads',
    name: 'silent poison spreads',
    version: VERSIONS.A,
  },
  {
    class: 'img-4',
    image: 'sow-love-dogma',
    name: 'sow love dogma',
    version: VERSIONS.A,
  },
  {
    class: 'img-2',
    image: 'stormy-hearts-resist',
    name: 'stormy hearts resist',
    version: VERSIONS.A,
  },
  {
    class: 'img',
    image: 'no-easy-solutions',
    name: 'no easy solutions',
    version: VERSIONS.A,
  },
  {
    class: 'img',
    image: 'nights-silent-scream',
    name: 'nights silent scream',
    version: VERSIONS.A,
  },
  {
    class: 'img',
    image: 'suck-melting-chains',
    name: 'suck melting chains',
    version: VERSIONS.A,
  },
  {
    class: 'img-4',
    image: 'tears-fuel-art',
    name: 'tears fuel art',
    version: VERSIONS.A,
  },
  {
    class: 'img-4',
    image: 'void-breeds-division',
    name: 'void breeds division',
    version: VERSIONS.A,
  },
  {
    class: 'img',
    image: 'whispers-fade-away',
    name: 'whispers fade away',
    version: VERSIONS.A,
  },
  {
    class: 'img-2',
    image: 'warning-toxic-glow',
    name: 'warning toxic glow',
    version: VERSIONS.A,
  },
  {
    class: 'img-2',
    image: 'whispers-conceal-truth',
    name: 'whispers conceal truth',
    version: VERSIONS.A,
  },
]

// 1 - 10 are full / so most value

// 11 - 110 / lose 1 animation in steps of 10 - so minus 10 animations
// 101 - 210 / lose 4 animations in steps of 10 - so minus 40 animations
// now animations are all gone

// 201 - 310  / 1 image fades 50% in steps of 10 - so 10 fade 50%
// 301 - 410 / 4 images fade in steps of 10 - so 40 fade 50%
// now all are faded 50%

// 410 - 510 / 6 images become blank in steps of 10 - last 10 will be fully blank

type tokensType = typeof images & { version: VERSIONS }[]

// Função para criar um array inicial preenchido com um valor específico
function createInitialArray(value: VERSIONS, size: number = 50): VERSIONS[] {
  return new Array(size).fill(value)
}

// Função para clonar o array
function cloneArray(arr: VERSIONS[]): VERSIONS[] {
  return [...arr]
}

const getLetterBefore = (letter: VERSIONS) => {
  switch (letter) {
    case VERSIONS.A:
      return VERSIONS.A
    case VERSIONS.B:
      return VERSIONS.A
    case VERSIONS.C:
      return VERSIONS.B
    case VERSIONS.D:
      return VERSIONS.C
  }
}

function generateArrays(): VERSIONS[][] {
  let arrays: VERSIONS[][] = []
  let currentArray = createInitialArray(VERSIONS.A)

  // Primeiros 10 arrays são todos 'A'
  for (let i = 0; i < 10; i++) {
    arrays.push(cloneArray(currentArray))
  }

  // Alterações para 'B', 'C' e 'D'
  const transitions = [
    {
      start: 11,
      end: 110,
      step: 10,
      letter: VERSIONS.B,
      increment: 1,
    },
    {
      start: 111,
      end: 210,
      step: 10,
      letter: VERSIONS.B,
      increment: 4,
    },
    {
      start: 211,
      end: 310,
      step: 10,
      letter: VERSIONS.C,
      increment: 1,
    },
    {
      start: 311,
      end: 410,
      step: 10,
      letter: VERSIONS.C,
      increment: 4,
    },
    {
      start: 411,
      end: 510,
      step: 10,
      letter: VERSIONS.D,
      increment: 6,
    },
  ]

  transitions.forEach((transition, transitionIndex) => {
    for (let i = transition.start; i <= transition.end; i++) {
      let count = 0
      if (i % transition.step === 1) {
        count += transition.increment
      }
      currentArray = cloneArray(arrays[arrays.length - 1])

      const lastIndex = currentArray.findIndex(
        (letter) => letter === getLetterBefore(transition.letter),
      )
      let j = lastIndex === -1 ? 0 : lastIndex
      count += j
      for (; j < count && j < 50; j++) {
        currentArray[j] = transition.letter
      }
      arrays.push(currentArray)
    }
  })

  return arrays
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

async function creaVersionFiles() {
  const dirPath = path.join(__dirname, 'versions')

  const fileContent = generateArrays()

  console.log('First array:', fileContent[0])
  console.log('Last array:', fileContent[fileContent.length - 1])

  fileContent.forEach(shuffleArray)

  // Construir o conteúdo do arquivo manualmente para cada array interno
  const formattedContent =
    '[' +
    fileContent
      .map(
        (array) =>
          '[' + array.map((version) => `"${version}"`).join(', ') + ']',
      )
      .join(',\n  ') +
    ']'

  // Escrever no arquivo usando writeFileSync
  fs.writeFileSync(path.join(dirPath, 'tokens.json'), formattedContent, 'utf8')
}

creaVersionFiles().then(() => console.log('JSON files generated successfully'))
