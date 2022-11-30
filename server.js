import { readFile, writeFile, mkdir, rm } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import path from "node:path"
import mojo from "@mojojs/core"

const root = path.dirname(fileURLToPath(import.meta.url))
const outputDirectory = path.join(root, "data")
const saveRoute = "/:version/save"

const app = mojo()

app.addHelper("savePath", (context) => {
  const editorVersion = context.stash.version
  return `${outputDirectory}/${editorVersion}.json`
})

app.addHelper("allowAllOrigins", (context) => {
  context.res.set("Access-Control-Allow-Origin", "*")
})

app.options(saveRoute, async (context) => {
  context.allowAllOrigins()
  context.res.set("Access-Control-Allow-Headers", "content-type")
  context.res.send()
})

app.get(saveRoute, async (context) => {
  context.allowAllOrigins()
  const pathName = context.savePath()

  try {
    const fileData = await readFile(pathName)
    const json = JSON.parse(fileData)
    context.render({ json })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Could not get editor data: \n${error.message}`)
    await context.jsonNotFound()
  }
})

app.post(saveRoute, async (context) => {
  context.allowAllOrigins()
  const pathName = context.savePath()
  const data = await context.req.text()
  try {
    await writeFile(pathName, data)
    context.res.status(201).send()
  } catch (error) {
    try {
      if (error.code === "ENOENT") {
        await mkdir(outputDirectory)
        await writeFile(pathName, data)
        context.res.status(201).send()
      }
    } catch (error_) {
      // eslint-disable-next-line no-console
      console.error(error_)
      await context.txtException(new Error("Server Error"))
    }
  }
})

app.delete(saveRoute, async (context) => {
  context.res.set("Access-Control-Allow-Origin", "*")
  const pathName = context.savePath()

  try {
    await rm(pathName)
    context.res.status(202).send()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    await context.txtException(new Error("Server Error"))
  }
})

app.start()
