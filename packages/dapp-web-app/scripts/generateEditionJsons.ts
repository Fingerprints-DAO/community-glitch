const csv = require('csv-parser')
const fs = require('fs-extra')
const path = require('path')

const csvFilePath = './scripts/data/edition.csv' // Caminho para o arquivo CSV
const outputPath = '../public/edition/metadata'
const outputDirs = ['A', 'B', 'C', 'D'] // Nomes das pastas de saída
const website =
  'https://community-glitch-dapp-web-app-git-develop-fingerprints.vercel.app'
const imagePath = `${website}/edition/arts/`
const description =
  'glitch by misha de ridder, released by Fingerprints, is a collection of 50 animated GIFs, stemming from photographs of erased graffiti. The act of erasing can involve both destruction and generation, transformation and reimagination—allowing for new possibilities to emerge.\n\nPlaying with notions of loss and re-coding, misha has re-animated the graffiti, inserting liminal afterimages of what was once there: faces, text, and indecipherable symbols. The result is a series of images that blur the lines between abstract painting, photography, animation, and token art. glitch meditates on the idea of “unwanted information,”—the delineation between messages that are wanted, seen, and proliferated, and those that are not. Like memes for the public space, graffiti is a subversive, spontaneous form of communication meant for the masses.\n\nAs a commentary on secondary market dynamics, misha has also introduced a twist: each time a token is traded, the artwork changes. On the first trade, the animation vanishes. Subsequent trades cause the image to fade, until eventually, the token points to a blank placeholder. \n\nCollectors can pay to restore the image to the minted original, or choose to burn the token to redeem it for a limited edition, physical fine art print through a collaboration with Assembly.'

interface CsvRow {
  title: string
  filename: string
  seconds: string
  frames: string
  face: string
  text: string
  symbol: string
  love: string
  decay: string
  image?: string
}

interface CsvData {
  title: string
  filename: string
  seconds: string
  frames: string
  face: string
  text: string
  symbol: string
  love: string
  decay: string
  // Adicione mais campos conforme necessário, baseando-se nos cabeçalhos do seu CSV
}

// Função para ler o CSV e retornar os dados como uma lista de objetos
function readCsv(): Promise<CsvData[]> {
  const results: CsvData[] = []
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv({ separator: ';' }))
      .on('data', (data: CsvData) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject)
  })
}

// Função para criar arquivos JSON nas pastas
async function createJsonFiles() {
  const data = await readCsv()

  for (const dir of outputDirs) {
    const dirPath = path.join(__dirname, path.join(outputPath, dir))
    await fs.ensureDir(dirPath)

    data.forEach((row, index) => {
      // Verifique se o campo 'title' existe e não é undefined
      const image = row.title ? row.title.replace(/\s+/g, '-') : 'default-title'

      let content = {
        // ...row,
        name: row.title,
        background_color: 'ffffff',
        image: `${imagePath}${image}_${dir}.gif`,
        external_url: website,
        description,
        attributes: [
          { trait_type: 'seconds', value: row.seconds },
          { trait_type: 'frames', value: row.frames },
          { trait_type: 'face', value: row.face, display_type: 'boolean' },
          { trait_type: 'text', value: row.text, display_type: 'boolean' },
          { trait_type: 'symbol', value: row.symbol, display_type: 'boolean' },
          { trait_type: 'love', value: row.love, display_type: 'boolean' },
          {
            trait_type: 'decay',
            value: row.decay,
            display_type: 'boost_number',
          },
        ],
      }

      if (dir !== 'A') {
        content = {
          ...content,
          image: dir === 'D' ? `${imagePath}empty.png` : content.image,
          attributes: [
            { trait_type: 'seconds', value: '0' },
            {
              trait_type: 'frames',
              value: dir === 'D' ? '0' : '1',
            },
            { trait_type: 'face', value: 'false', display_type: 'boolean' },
            { trait_type: 'text', value: 'false', display_type: 'boolean' },
            { trait_type: 'symbol', value: 'false', display_type: 'boolean' },
            { trait_type: 'love', value: 'false', display_type: 'boolean' },
            {
              trait_type: 'decay',
              value: dir === 'B' ? '25%' : dir === 'C' ? '50%' : '100%',
              display_type: 'boost_number',
            },
          ],
        }
      }
      fs.writeJsonSync(path.join(dirPath, `${index + 1}.json`), content, {
        spaces: 2,
      })
    })
  }
}

createJsonFiles().then(() => console.log('JSON files generated successfully'))
