import { useContext } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import ToolbarContext, { IToolbarContext } from "context/ToolbarContext"
import { REDO_COMMAND } from "lexical"
import { IconButton } from "@material-ui/core"
import { Redo } from "@material-ui/icons"
import { IS_APPLE } from "shared/src/environment"

const RedoButton = () => {
  const { canRedo } = useContext(ToolbarContext) as IToolbarContext
  const [editor] = useLexicalComposerContext()
  return (
    <IconButton
      disabled={!canRedo}
      onClick={() => {
        // eslint-disable-next-line unicorn/no-useless-undefined
        editor.dispatchCommand(REDO_COMMAND, undefined)
      }}
      title={IS_APPLE ? "Redo (⌘Y)" : "Redo (Ctrl+Y)"}
      className="toolbar-item spaced"
      aria-label="Redo"
      type="button">
      <Redo />
    </IconButton>
  )
}

export default RedoButton
