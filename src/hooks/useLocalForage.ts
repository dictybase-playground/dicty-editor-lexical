import { useCallback } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { SerializedEditorState } from "lexical"
import { useLocation } from "react-router-dom"
import localForage from "localforage"

const useLocalForage = () => {
  const [editor] = useLexicalComposerContext()
  const { pathname } = useLocation()

  const saveLocalForage = useCallback(async () => {
    try {
      const editorState = editor.getEditorState()
      const editorStateJSON = editorState.toJSON()
      await localForage.setItem(`dicty-editor${pathname}`, editorStateJSON)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }, [editor, pathname])

  const retrieveLocalForage = useCallback(async () => {
    try {
      const SerializedState = await localForage.getItem<SerializedEditorState>(
        `dicty-editor${pathname}`,
      )
      const editorState = editor.parseEditorState(SerializedState || "")
      editor.setEditorState(editorState)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }, [editor, pathname])

  return { saveLocalForage, retrieveLocalForage }
}

export default useLocalForage
