import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { CAN_UNDO_COMMAND, UNDO_COMMAND } from "lexical"
import { IconButton } from "@material-ui/core"
import { Undo } from "@material-ui/icons"
import { useAtom } from "jotai"
import { canUndoAtom } from "context/AtomConfigs"
import { useCallback, useEffect } from "react"
import useToolbarItemStyles from "utils/ToolbarItemStyles"

const UndoButton = () => {
  const [editor] = useLexicalComposerContext()
  const [canUndo, setCanUndo] = useAtom(canUndoAtom)
  const classes = useToolbarItemStyles()

  useEffect(() => {
    const unregisterCanUndoCommand = editor.registerCommand(
      CAN_UNDO_COMMAND,
      (payload) => {
        setCanUndo(payload)
        return false
      },
      1,
    )

    return () => {
      unregisterCanUndoCommand()
    }
  })

  const onClick = useCallback(() => {
    editor.dispatchCommand(UNDO_COMMAND, undefined)
  }, [editor])

  return (
    <IconButton
      disabled={!canUndo}
      className={classes.root}
      onClick={onClick}
      title="Undo"
      aria-label="Undo"
      type="button">
      <Undo />
    </IconButton>
  )
}

export default UndoButton
