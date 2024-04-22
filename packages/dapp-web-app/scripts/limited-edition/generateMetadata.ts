// @ts-nocheck
const fs = require('fs-extra')
const path = require('path')
const tokensVersions = require('../data/one-one-tokens-versions.json')

const description =
  "glitch by misha de ridder, released by Fingerprints, is a collection of 50 animated GIFs, stemming from photographs of erased graffiti. The act of erasing can involve both destruction and generation, transformation and reimagination — allowing for new possibilities to emerge. \nPlaying with notions of loss and re-coding, misha has re-animated the graffiti, inserting liminal afterimages of what was once there: faces, text, and indecipherable symbols. The result is a series of images that blur the lines between abstract painting, photography, animation, and token art. glitch meditates on the idea of “unwanted information,” — the delineation between messages that are wanted, seen, and proliferated, and those that are not. Like memes for the public space, graffiti is a subversive, spontaneous form of communication meant for the masses.\n The edition piece is a randomized composite image of all 50 animations, each representing one of the many possible options of the full collection mosaic, minted as HTML-page. The mint is limited to 510 editions. The art is slowly degraded as more editions are minted following the steps of the 1/1s — until the last 10 editions are left completely blank. There's no way to restore, what you mint is what you get."
const mintEditionPath =
  'https://community-glitch-dapp-web-app-git-develop-fingerprints.vercel.app/mint-edition/'
const dirPath = path.join(__dirname, '../../public/mint-edition/metadata')

type Metadata = {
  name: string
  image: string
  external_url: string
  background_color: string
  animation_url: string
  attributes: {
    trait_type: string
    value: string
  }[]
  description: string
}

function calculateDegradation(versions: string[]) {
  const maxDegradation = 3 * 50
  const points = versions.reduce((acc, version) => {
    if (version === 'A') return acc + 0
    if (version === 'B') return acc + 1
    if (version === 'C') return acc + 2
    if (version === 'D') return acc + 3
  }, 0)

  console.log(points)

  return (points / maxDegradation) * 100
}

function generateMetadata(nftIndex: number) {
  const imagesConfig = require(
    `../../public/mint-edition/config/${nftIndex}.json`,
  )
  const htmlUrl = `${mintEditionPath}html/${nftIndex}.html`
  const versions = tokensVersions[nftIndex - 1]
  const image = `${mintEditionPath}thumbnails/${nftIndex}.png`

  const content = {
    name: imagesConfig.name,
    background_color: 'ffffff',
    image,
    animation_url: htmlUrl,
    external_url: htmlUrl,
    description,
    attributes: [
      {
        trait_type: 'decay',
        value: calculateDegradation(versions).toFixed(2) + '%',
        display_type: 'boost_number',
      },
    ],
  }
  fs.writeJsonSync(path.join(dirPath, `${nftIndex}.json`), content)

  console.log(
    `Metadata generated and saved in public/mint-edition/config/${nftIndex}.json`,
  )
}

for (let i = 1; i <= 510; i++) {
  generateMetadata(i)
}
