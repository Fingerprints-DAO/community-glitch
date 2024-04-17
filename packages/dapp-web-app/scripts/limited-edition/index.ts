// @ts-nocheck
const fs = require('fs')
const handlebars = require('handlebars')
const path2 = require('path')
const tokensVersions = require('./versions/tokens.json')

const source = fs.readFileSync(
  path2.join(__dirname, './views/images.hbs'),
  'utf8',
)
const template = handlebars.compile(source)
const imagePath =
  'https://community-glitch-dapp-web-app-git-develop-fingerprints.vercel.app/arts/'
const fullImagePath =
  'https://community-glitch-dapp-web-app-git-develop-fingerprints.vercel.app/edition/arts/'

const images = [
  {
    class: 'img',
    image: 'end-is-near',
    name: 'end is near',
  },
  {
    class: 'img-2',
    image: 'dark-words-stain',
    name: 'dark words stain',
  },
  {
    class: 'img-2',
    image: 'create-with-pain',
    name: 'create with pain',
  },
  {
    class: 'img-2',
    image: 'devil-bets-lose',
    name: 'devil bets lose',
  },
  {
    class: 'img',
    image: 'embrace-illuminate-resist',
    name: 'embrace illuminate resist',
  },
  {
    class: 'img',
    image: 'eyes-wide-awake',
    name: 'eyes wide awake',
  },
  {
    class: 'img-4',
    image: 'amnesia-breeds-repetition',
    name: 'amnesia breeds repetition',
  },
  {
    class: 'img',
    image: 'fades-fangs-vanish',
    name: 'fades fangs vanish',
  },
  {
    class: 'img-2',
    image: 'healing-through-abandonment',
    name: 'healing through abandonment',
  },
  {
    class: 'img',
    image: 'sex-with-cops',
    name: 'sex with cops',
  },
  {
    class: 'img',
    image: 'eat-the-rich',
    name: 'eat the rich',
  },
  {
    class: 'img',
    image: 'delete-dull-minds',
    name: 'delete dull minds',
  },
  {
    class: 'img',
    image: 'defy-ooze-obliterate',
    name: 'defy ooze obliterate',
  },
  {
    class: 'img',
    image: 'blossoms-reclaim-concrete',
    name: 'blossoms reclaim concrete',
  },
  {
    class: 'img-4',
    image: 'blue-memories-fade',
    name: 'blue memories fade',
  },
  {
    class: 'img',
    image: 'joy-conquers-sorrow',
    name: 'joy conquers sorrow',
  },
  {
    class: 'img',
    image: 'grind-rise-learn',
    name: 'grind rise learn',
  },
  {
    class: 'img',
    image: 'unmask-forgotten-triumphs',
    name: 'unmask forgotten triumphs',
  },
  {
    class: 'img',
    image: 'wipe-transform-empower',
    name: 'wipe transform empower',
  },
  {
    class: 'img-4',
    image: 'fading-pain-canvas',
    name: 'fading pain canvas',
  },
  {
    class: 'img-2',
    image: 'gaps-perpetuate-injustice',
    name: 'gaps perpetuate injustice',
  },
  {
    class: 'img',
    image: 'smudged-heartbreak-tales',
    name: 'smudged heartbreak tales',
  },
  {
    class: 'img-4',
    image: 'ignorance-to-empathy',
    name: 'ignorance to empathy',
  },
  {
    class: 'img',
    image: 'passion-persists-here',
    name: 'passion persists here',
  },
  {
    class: 'img-4',
    image: 'kill-the-poor',
    name: 'kill the poor',
  },
  {
    class: 'img',
    image: 'promote-positivity-instead',
    name: 'promote positivity instead',
  },
  {
    class: 'img',
    image: 'healing-amidst-neglect',
    name: 'healing amidst neglect',
  },
  {
    class: 'img-2',
    image: 'forget-me-not',
    name: 'forget me not',
  },
  {
    class: 'img',
    image: 'resist-persist-exist',
    name: 'resist persist exist',
  },
  {
    class: 'img-2',
    image: 'notes-numb-minds',
    name: 'notes numb minds',
  },
  {
    class: 'img-2',
    image: 'embrace-olive-diversity',
    name: 'embrace olive diversity',
  },
  {
    class: 'img',
    image: 'preserve-the-untold',
    name: 'preserve the untold',
  },
  {
    class: 'img-4',
    image: 'provocative-urban-expression',
    name: 'provocative urban expression',
  },
  {
    class: 'img',
    image: 'mindful-mimicry-unleashed',
    name: 'mindful mimicry unleashed',
  },
  {
    class: 'img',
    image: 'saving-the-world',
    name: 'saving the world',
  },
  {
    class: 'img',
    image: 'purr-power-revolution',
    name: 'purr power revolution',
  },
  {
    class: 'img-4',
    image: 'shadow-portal-escape',
    name: 'shadow portal escape',
  },
  {
    class: 'img-4',
    image: 'whispers-echo-on',
    name: 'whispers echo on',
  },
  {
    class: 'img-4',
    image: 'infernal-blaze-unraveling',
    name: 'infernal blaze unraveling',
  },
  {
    class: 'img-2',
    image: 'silent-poison-spreads',
    name: 'silent poison spreads',
  },
  {
    class: 'img-4',
    image: 'sow-love-dogma',
    name: 'sow love dogma',
  },
  {
    class: 'img-2',
    image: 'stormy-hearts-resist',
    name: 'stormy hearts resist',
  },
  {
    class: 'img',
    image: 'no-easy-solutions',
    name: 'no easy solutions',
  },
  {
    class: 'img',
    image: 'nights-silent-scream',
    name: 'nights silent scream',
  },
  {
    class: 'img',
    image: 'suck-melting-chains',
    name: 'suck melting chains',
  },
  {
    class: 'img-4',
    image: 'tears-fuel-art',
    name: 'tears fuel art',
  },
  {
    class: 'img-4',
    image: 'void-breeds-division',
    name: 'void breeds division',
  },
  {
    class: 'img',
    image: 'whispers-fade-away',
    name: 'whispers fade away',
  },
  {
    class: 'img-2',
    image: 'warning-toxic-glow',
    name: 'warning toxic glow',
  },
  {
    class: 'img-2',
    image: 'whispers-conceal-truth',
    name: 'whispers conceal truth',
  },
]

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
    path2.join(__dirname, `../../public/mint-edition/${nftIndex}.html`),
    html,
  )
  console.log(`HTML gerado e salvo em output${nftIndex}.html`)
}

for (let i = 1; i <= 510; i++) {
  generateHtml(i)
}
