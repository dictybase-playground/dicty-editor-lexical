import { useCallback } from "react"
import { useLocation } from "react-router-dom"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import axios from "axios"

const useUrl = () => {
  const { pathname } = useLocation()
  return `http://localhost:3000${pathname}/save`
}

export const useSaveServerStorage = () => {
  const [editor] = useLexicalComposerContext()
  const url = useUrl()

  return useCallback(async () => {
    const editorState = editor.getEditorState()
    const editorStateJSON = editorState.toJSON()
    try {
      await axios.post(url, editorStateJSON)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }, [editor, url])
}

export const useRetrieveServerStorage = () => {
  const [editor] = useLexicalComposerContext()
  const url = useUrl()

  return useCallback(async () => {
    try {
      const { data } = await axios.get(url)
      const editorState = editor.parseEditorState(data)
      editor.setEditorState(editorState)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }, [editor, url])
}
export const useDeleteServerStorage = () => {
  const url = useUrl()

  return useCallback(async () => {
    try {
      await axios.delete(url)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }, [url])
}
