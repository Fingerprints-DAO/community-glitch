// @ts-nocheck
const fs = require('fs')
const handlebars = require('handlebars')
const path = require('path')

const source = fs.readFileSync(
  path.join(__dirname, './views/images.hbs'),
  'utf8',
)
const template = handlebars.compile(source)
const imagePath =
  'https://community-glitch-dapp-web-app-git-develop-fingerprints.vercel.app/arts/'
const fullImagePath =
  'https://community-glitch-dapp-web-app-git-develop-fingerprints.vercel.app/edition/arts/'

function generateHtml(nftIndex: number) {
  const imagesConfig = require(
    `../../public/mint-edition/config/${nftIndex}.json`,
  )

  const html = template({ images: imagesConfig, imagePath, fullImagePath })

  fs.writeFileSync(
    path.join(__dirname, `../../public/mint-edition/html/${nftIndex}.html`),
    html,
  )
  console.log(
    `HTML gerado e salvo em public/mint-edition/html/${nftIndex}.html`,
  )
}

for (let i = 1; i <= 510; i++) {
  generateHtml(i)
}
