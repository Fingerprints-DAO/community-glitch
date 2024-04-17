// @ts-nocheck
const fs = require('fs')
const handlebars = require('handlebars')
const path = require('path')
const tokensVersions = require('../data/one-one-tokens-versions.json')
const images = require('../data/images-props.json')

const source = fs.readFileSync(
  path.join(__dirname, './views/images.hbs'),
  'utf8',
)
const template = handlebars.compile(source)
const imagePath =
  'https://community-glitch-dapp-web-app-git-develop-fingerprints.vercel.app/arts/'
const fullImagePath =
  'https://community-glitch-dapp-web-app-git-develop-fingerprints.vercel.app/edition/arts/'

// Salvar em um arquivo ou imprimir no console
function generateHtml(nftIndex: number) {
  // Embaralhar as imagens
  const shuffledImages = [...images]
    .sort(() => 0.5 - Math.random())
    .map((image, index) => ({
      ...image,
      version: tokensVersions[nftIndex - 1][index],
    }))

  const html = template({ images: shuffledImages, imagePath, fullImagePath })

  fs.writeFileSync(
    path.join(__dirname, `../../public/mint-edition/${nftIndex}.html`),
    html,
  )
  console.log(`HTML gerado e salvo em public/mint-edition/${nftIndex}.html`)
}

for (let i = 1; i <= 510; i++) {
  generateHtml(i)
}
