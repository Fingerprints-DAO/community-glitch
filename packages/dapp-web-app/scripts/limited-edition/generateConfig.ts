// @ts-nocheck
const fs = require('fs')
const path = require('path')
const tokensVersions = require('../data/one-one-tokens-versions.json')
const images = require('../data/images-props.json')

const imagePath =
  'https://community-glitch-dapp-web-app-git-develop-fingerprints.vercel.app/arts/'
const fullImagePath =
  'https://community-glitch-dapp-web-app-git-develop-fingerprints.vercel.app/edition/arts/'

function generateImagesArray(versions: string[]) {
  const shuffledImages = [...images]
    .sort(() => 0.5 - Math.random())
    .map((image, index) => ({
      ...image,
      version: versions[index],
    }))
  return shuffledImages
}

async function saveImagesOnJsons(images: any[], index: number) {
  const dirPath = path.join(__dirname, '../../public/mint-edition/config')
  const formattedContent = JSON.stringify(images, null, 0)

  console.log(`writting file ${dirPath}/${index}.json`)
  return fs.writeFileSync(
    path.join(dirPath, `${index}.json`),
    formattedContent,
    'utf8',
  )
}

async function generateMetadata() {
  return tokensVersions.forEach((version, index) => {
    const shuffledImages = generateImagesArray(version)
    return saveImagesOnJsons(shuffledImages, index + 1)
  })
}

generateMetadata().then(() => console.log('JSON files generated successfully'))
