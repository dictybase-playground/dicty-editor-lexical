import fs from "node:fs"
import { createServer } from "vite"
import express from "express"

const PORT = 3000
const app = express()
const vite = await createServer({
  server: { middlewareMode: true },
  appType: "spa",
})

app.use(express.json())

app.post("/:version/save", (request, response) => {
  const editorVersion = request.params.version
  const fileName = `data/${editorVersion}.json`
  const data = JSON.stringify(request.body)

  fs.writeFile(fileName, data, (error) => {
    if (error) throw error
    // eslint-disable-next-line no-console
    console.log("Data written to file")
  })
  response.end()
})

app.get("/:version/save", (request, response) => {
  const editorVersion = request.params.version
  const fileName = `data/${editorVersion}.json`

  fs.readFile(fileName, (error, data) => {
    if (error) {
      response.end()
    } else {
      response.send(JSON.parse(data))
    }
  })
})

app.use(vite.middlewares)

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Starting Server on ${PORT}`)
})
