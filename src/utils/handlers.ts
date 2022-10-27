import localForage from "localforage"
import type { LexicalEditor, SerializedEditorState } from "lexical"

const saveLocalStorage = (editor: LexicalEditor) => {
  const editorState = editor.getEditorState()
  const editorStateString = JSON.stringify(editorState)
  localStorage.setItem("lexicalEditorState", editorStateString)
}

const retrieveLocalStorage = (editor: LexicalEditor) => {
  const editorString = localStorage.getItem("lexicalEditorState")
  if (editorString) {
    const editorState = editor.parseEditorState(editorString)
    editor.setEditorState(editorState)
  }
}

const saveLocalForage = async (editor: LexicalEditor) => {
  try {
    const editorState = editor.getEditorState()
    const editorStateJSON = editorState.toJSON()
    await localForage.setItem("lexicalEditorState", editorStateJSON)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}

const retrieveLocalForage = async (editor: LexicalEditor) => {
  try {
    const SerializedEditorState =
      await localForage.getItem<SerializedEditorState | null>(
        "lexicalEditorState",
      )
    if (SerializedEditorState) {
      const editorState = editor.parseEditorState(SerializedEditorState)
      editor.setEditorState(editorState)
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}

export {
  saveLocalStorage,
  retrieveLocalStorage,
  saveLocalForage,
  retrieveLocalForage,
}
