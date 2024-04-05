const csv = require('csv-parser')
const fs = require('fs-extra')
const path = require('path')

const csvFilePath = './scripts/data/edition.csv' // Caminho para o arquivo CSV
const outputPath = '../public/edition/metadata'
const outputDirs = ['A', 'B', 'C', 'D'] // Nomes das pastas de saída
const imagePath =
  'https://community-glitch-dapp-web-app-git-develop-fingerprints.vercel.app/edition/metadata/'

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
        external_url: `${imagePath}${image}_${dir}.gif`,
        description: '',
        attributes: [
          { trait_type: 'seconds', value: row.seconds, display_type: 'number' },
          { trait_type: 'frames', value: row.frames, display_type: 'number' },
          { trait_type: 'face', value: row.face, display_type: 'boolean' },
          { trait_type: 'text', value: row.text },
          { trait_type: 'symbol', value: row.symbol },
          { trait_type: 'love', value: row.love },
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
          image: dir === 'D' ? '' : content.image,
          external_url: dir === 'D' ? '' : content.image,
          attributes: [
            { trait_type: 'seconds', value: '0', display_type: 'number' },
            {
              trait_type: 'frames',
              value: dir === 'D' ? '0' : '1',
              display_type: 'number',
            },
            { trait_type: 'face', value: 'FALSE', display_type: 'boolean' },
            { trait_type: 'text', value: 'FALSE' },
            { trait_type: 'symbol', value: 'FALSE' },
            { trait_type: 'love', value: 'FALSE' },
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

createJsonFiles().then(() => console.log('Arquivos JSON criados com sucesso.'))
