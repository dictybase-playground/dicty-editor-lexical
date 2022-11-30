import { useCallback } from "react"
import { useLocation } from "react-router-dom"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import axios from "axios"

const useServerStorage = () => {
  const [editor] = useLexicalComposerContext()
  const { pathname } = useLocation()
  const url = `http://localhost:3000${pathname}/save`

  const saveServerStorage = useCallback(async () => {
    const editorState = editor.getEditorState()
    const editorStateJSON = editorState.toJSON()
    try {
      await axios.post(url, editorStateJSON)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }, [editor, url])

  const retrieveServerStorage = useCallback(async () => {
    try {
      const { data } = await axios.get(url)
      const editorState = editor.parseEditorState(data)
      editor.setEditorState(editorState)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }, [editor, url])

  const deleteServerStorage = useCallback(async () => {
    try {
      const { data } = await axios.delete(url)
      const editorState = editor.parseEditorState(data)
      editor.setEditorState(editorState)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }, [editor, url])

  return { saveServerStorage, retrieveServerStorage, deleteServerStorage }
}

export default useServerStorage
