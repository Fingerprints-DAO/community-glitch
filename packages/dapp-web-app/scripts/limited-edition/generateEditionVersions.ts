// @ts-nocheck
const csv = require('csv-parser')
const fs = require('fs-extra')
const path = require('path')
const images = require('../data/images-props.json')

const outputDirs = ['A', 'B', 'C', 'D'] // Nomes das pastas de saída
const website =
  'https://community-glitch-dapp-web-app-git-develop-fingerprints.vercel.app'
const imagePath = `${website}/edition/arts/`

const description =
  'glitch by misha de ridder, released by Fingerprints, is a collection of 50 animated GIFs, stemming from photographs of erased graffiti. The act of erasing can involve both destruction and generation, transformation and reimagination — allowing for new possibilities to emerge.\n\nPlaying with notions of loss and re-coding, misha has re-animated the graffiti, inserting liminal afterimages of what was once there: faces, text, and indecipherable symbols. The result is a series of images that blur the lines between abstract painting, photography, animation, and token art. glitch meditates on the idea of “unwanted information,” — the delineation between messages that are wanted, seen, and proliferated, and those that are not. Like memes for the public space, graffiti is a subversive, spontaneous form of communication meant for the masses.\n\nAs a commentary on secondary market dynamics, misha has also introduced a twist: each time a token is traded, the artwork changes. On the first trade, the animation vanishes. Subsequent trades cause the image to fade, until eventually, a faint residue remains. \n\nCollectors can pay to restore the image to the minted original, or choose to burn the token to redeem it for a limited edition, physical fine art print through a collaboration with Assembly.'

enum VERSIONS {
  'A' = 'A',
  'B' = 'B',
  'C' = 'C',
  'D' = 'D',
}

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
  const dirPath = path.join(__dirname, '../data')

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
  fs.writeFileSync(
    path.join(dirPath, 'one-one-tokens-versions.json'),
    formattedContent,
    'utf8',
  )
}

creaVersionFiles().then(() => console.log('JSON files generated successfully'))
