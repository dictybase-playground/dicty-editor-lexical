import { useEffect } from "react"
import { SELECTION_CHANGE_COMMAND } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { mergeRegister } from "@lexical/utils"
import Divider from "ui/Divider"
import { FormatBoldButton } from "../components/buttons"
import useUpdateToolbar from "./callback2a"

const LowPriority = 1

const ToolbarV2 = () => {
  const [editor] = useLexicalComposerContext()
  const updateToolbar = useUpdateToolbar()
  /*
    1. In a useEffect callback, the returned function is called after every
    render to cleanup the side effects of the previous render.

    2. Here, the returned function is the result of calling mergeRegister,
    a function that calls each function provided to as an argument.

    3. Since the editor's registerListener and registerCommand methods return
    a function that removes the listeners they register, mergeRegister will
    return a function that cleans up the listeners registered from a
    previous render.
  */
  useEffect(
    () =>
      mergeRegister(
        editor.registerUpdateListener(({ editorState }) => {
          editorState.read(() => {
            updateToolbar()
          })
        }),
        editor.registerCommand(
          SELECTION_CHANGE_COMMAND,
          () => {
            updateToolbar()
            return false
          },
          LowPriority,
        ),
      ),
    [editor, updateToolbar],
  )

  return (
    <div className="toolbar">
      <Divider />
      <FormatBoldButton />
    </div>
  )
}

export default ToolbarV2
