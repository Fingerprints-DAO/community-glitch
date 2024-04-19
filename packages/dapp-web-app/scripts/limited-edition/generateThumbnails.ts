// @ts-nocheck
const path = require('path')
const puppeteer = require('puppeteer')
const async = require('async') // Importa a biblioteca async

// Função para tirar um screenshot
async function takeScreenshot(index: number): Promise<void> {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  console.log('Generating png', index)

  await page.setViewport({
    width: 768,
    height: 980,
    deviceScaleFactor: 1,
  })

  const filePath = path.join(
    __dirname,
    `../../public/mint-edition/html/${index}.html`,
  )
  const fileURL = `file://${filePath}`

  await page.goto(fileURL, { waitUntil: 'networkidle0' })

  console.log('Screenshot', index)
  await page.screenshot({
    path: path.join(
      __dirname,
      `../../public/mint-edition/thumbnails/${index}.png`,
    ),
  })

  console.log('Closing browser')
  await browser.close()
}

// Cria uma fila com concorrência de 5
const queue = async.queue((task, callback) => {
  takeScreenshot(task.index)
    .then(() => callback())
    .catch((error) => {
      console.error('Error in screenshot task:', error)
      callback(error)
    })
}, 5)

// Adiciona todas as tarefas à fila
for (let i = 1; i <= 510; i++) {
  queue.push({ index: i })
}

// Função a ser chamada quando todas as tarefas estiverem completas
queue.drain(() => {
  console.log('All screenshots have been taken.')
})
