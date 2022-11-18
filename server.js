import { readFile, writeFile, mkdir } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import path from "node:path"
import { createServer } from "vite"
import express from "express"

const PORT = 3000
const root = path.dirname(fileURLToPath(import.meta.url))
const outputDirectory = path.join(root, "data")

const app = express()
const vite = await createServer({
  server: { middlewareMode: true },
  appType: "spa",
})

app.use(express.json())

app.post("/:version/save", async (request, response) => {
  const editorVersion = request.params.version
  const pathName = `${outputDirectory}/${editorVersion}.json`
  const data = JSON.stringify(request.body)

  try {
    await writeFile(pathName, data)
  } catch (error) {
    if (error.code === "ENOENT") {
      try {
        await mkdir(outputDirectory)
        await writeFile(pathName, data)
        response.sendStatus(201)
      } catch (error_) {
        // eslint-disable-next-line no-console
        console.error(error_)
      }
    }
  } finally {
    response.end()
  }
})

app.get("/:version/save", async (request, response) => {
  const editorVersion = request.params.version
  const fileName = `${outputDirectory}/${editorVersion}.json`

  try {
    const fileData = await readFile(fileName)
    response.send(JSON.parse(fileData))
  } catch (error_) {
    // eslint-disable-next-line no-console
    console.error(`Could not get editor data: \n${error_}`)
  } finally {
    response.end()
  }
})

app.use(vite.middlewares)

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Starting Server on ${PORT}`)
})
