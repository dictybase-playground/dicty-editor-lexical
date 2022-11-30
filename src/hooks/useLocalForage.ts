import { useCallback } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { SerializedEditorState } from "lexical"
import { useLocation } from "react-router-dom"
import localForage from "localforage"

const useLocalForage = () => {
  const [editor] = useLexicalComposerContext()
  const { pathname } = useLocation()
  const localForageKey = `dicty-editor${pathname}`

  const saveLocalForage = useCallback(async () => {
    try {
      const editorState = editor.getEditorState()
      const editorStateJSON = editorState.toJSON()
      await localForage.setItem(localForageKey, editorStateJSON)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }, [editor, localForageKey])

  const retrieveLocalForage = useCallback(async () => {
    try {
      const SerializedState = await localForage.getItem<SerializedEditorState>(
        localForageKey,
      )
      if (SerializedState) {
        const editorState = editor.parseEditorState(SerializedState)
        editor.setEditorState(editorState)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }, [editor, localForageKey])

  const deleteLocalForage = useCallback(async () => {
    try {
      await localForage.removeItem(localForageKey)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }, [localForageKey])

  return { saveLocalForage, retrieveLocalForage, deleteLocalForage }
}

export default useLocalForage
