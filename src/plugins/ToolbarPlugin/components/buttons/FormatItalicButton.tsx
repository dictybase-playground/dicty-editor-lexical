import { FORMAT_TEXT_COMMAND } from "lexical"
import { IconButton } from "@material-ui/core"
import { FormatItalic } from "@material-ui/icons"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtomValue } from "jotai"
import { isItalicAtom } from "context/AtomConfigs"
import useButtonStyles from "styles/ToolBarButton"
import joinClasses from "utils/joinClasses"

const FormatItalicButton = () => {
  const [editor] = useLexicalComposerContext()
  const isItalic = useAtomValue(isItalicAtom)
  const classes = useButtonStyles()
  const buttonClass = isItalic
    ? joinClasses(classes.root, classes.active)
    : classes.root

  return (
    <IconButton
      type="button"
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
      }}
      className={buttonClass}
      aria-label="Format Bold">
      <FormatItalic fontSize="small" />
    </IconButton>
  )
}

export default FormatItalicButton
