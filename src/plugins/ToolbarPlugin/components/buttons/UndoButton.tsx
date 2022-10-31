import { useContext } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import ToolbarContext, { IToolbarContext } from "context/ToolbarContext"
import { UNDO_COMMAND } from "lexical"
import { IconButton } from "@material-ui/core"
import { Undo } from "@material-ui/icons"
import { IS_APPLE } from "shared/src/environment"

const UndoButton = () => {
  const { canUndo } = useContext(ToolbarContext) as IToolbarContext
  const [editor] = useLexicalComposerContext()
  return (
    <IconButton
      disabled={!canUndo}
      onClick={() => {
        // eslint-disable-next-line unicorn/no-useless-undefined
        editor.dispatchCommand(UNDO_COMMAND, undefined)
      }}
      title={IS_APPLE ? "Undo (⌘Z)" : "Undo (Ctrl+Z)"}
      className="toolbar-item spaced"
      aria-label="Undo"
      type="button">
      <Undo />
    </IconButton>
  )
}

export default UndoButton
