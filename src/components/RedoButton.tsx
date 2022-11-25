import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { CAN_REDO_COMMAND, REDO_COMMAND } from "lexical"
import { IconButton } from "@material-ui/core"
import { Redo } from "@material-ui/icons"
import { useAtom } from "jotai"
import { canRedoAtom } from "context/AtomConfigs"
import { useCallback, useEffect } from "react"
import useToolbarItemStyles from "utils/ToolbarItemStyles"

const RedoButton = () => {
  const [editor] = useLexicalComposerContext()
  const [canRedo, setCanRedo] = useAtom(canRedoAtom)
  const classes = useToolbarItemStyles()

  useEffect(() => {
    const unregisterCanUndoCommand = editor.registerCommand(
      CAN_REDO_COMMAND,
      (payload) => {
        setCanRedo(payload)
        return false
      },
      1,
    )

    return () => {
      unregisterCanUndoCommand()
    }
  })

  const onClick = useCallback(() => {
    editor.dispatchCommand(REDO_COMMAND, undefined)
  }, [editor])

  return (
    <IconButton
      disabled={!canRedo}
      className={classes.root}
      onClick={onClick}
      title="Redo"
      aria-label="Redo"
      type="button">
      <Redo />
    </IconButton>
  )
}

export default RedoButton
