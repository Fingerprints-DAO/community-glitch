// @ts-nocheck
const fs = require('fs')
const handlebars = require('handlebars')
const path = require('path')
const minify = require('html-minifier').minify

const source = fs.readFileSync(
  path.join(__dirname, './views/images.hbs'),
  'utf8',
)
const template = handlebars.compile(source)
const imagePath =
  'https://ipfs.io/ipfs/QmYU6QY5Pt9MoMsKZ7ay7TPEsTYf9UXJv6KFRwzLWu5utj/NFT_v2-small/'
const fullImagePath =
  'https://ipfs.io/ipfs/QmYU6QY5Pt9MoMsKZ7ay7TPEsTYf9UXJv6KFRwzLWu5utj/NFT_v2/'

function generateHtml(nftIndex: number) {
  const imagesConfig = require(
    `../../public/mint-edition/config/${nftIndex}.json`,
  )

  const html = template({ images: imagesConfig, imagePath, fullImagePath })

  fs.writeFileSync(
    path.join(__dirname, `../../public/mint-edition/html/${nftIndex}.html`),
    minify(html, {
      minifyCSS: true,
      minifyJs: true,
      removeComments: true,
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
    }),
  )
  console.log(
    `HTML gerado e salvo em public/mint-edition/html/${nftIndex}.html`,
  )
}

for (let i = 1; i <= 510; i++) {
  generateHtml(i)
}
