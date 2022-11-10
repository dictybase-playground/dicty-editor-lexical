import { useEffect } from "react"
import { SELECTION_CHANGE_COMMAND } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import Divider from "ui/Divider"
import { FormatBoldButton, FormatItalicButton } from "../components/buttons"
import useUpdateToolbar from "./useUpdateToolbar2b"

const LowPriority = 1

const ToolbarV2 = () => {
  const [editor] = useLexicalComposerContext()

  const updateToolbar = useUpdateToolbar()

  useEffect(() => {
    const unregisterUpdateListener = editor.registerUpdateListener(
      ({ editorState }) => {
        editorState.read(() => {
          updateToolbar()
        })
      },
    )
    const unregisterSelectionChangeCommand = editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateToolbar()
        return false
      },
      LowPriority,
    )

    return function cleanup() {
      unregisterUpdateListener()
      unregisterSelectionChangeCommand()
    }
  }, [editor, updateToolbar])

  return (
    <div className="toolbar">
      <Divider />
      <FormatBoldButton />
      <FormatItalicButton />
    </div>
  )
}

export default ToolbarV2
