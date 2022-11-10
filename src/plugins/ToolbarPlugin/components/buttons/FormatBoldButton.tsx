import { FORMAT_TEXT_COMMAND } from "lexical"
import { IconButton } from "@material-ui/core"
import { FormatBold } from "@material-ui/icons"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtomValue } from "jotai"
import { isBoldAtom } from "context/AtomConfigs"
import useButtonStyles from "styles/ToolBarButton"
import joinClasses from "utils/joinClasses"

const FormatBoldButton = () => {
  const [editor] = useLexicalComposerContext()
  const isBold = useAtomValue(isBoldAtom)
  const classes = useButtonStyles()
  const buttonClass = isBold
    ? joinClasses(classes.root, classes.active)
    : classes.root

  return (
    <IconButton
      type="button"
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
      }}
      className={buttonClass}
      aria-label="Format Bold">
      <FormatBold fontSize="small" />
    </IconButton>
  )
}

export default FormatBoldButton
