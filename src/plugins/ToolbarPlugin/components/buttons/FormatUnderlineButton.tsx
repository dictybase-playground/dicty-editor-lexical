import { FORMAT_TEXT_COMMAND } from "lexical"
import { IconButton } from "@material-ui/core"
import { FormatUnderlined } from "@material-ui/icons"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtomValue } from "jotai"
import { isUnderlinedAtom } from "context/AtomConfigs"
import useButtonStyles from "styles/ToolBarButtonStyles"
import joinClasses from "utils/joinClasses"

const FormatUnderlinedButton = () => {
  const [editor] = useLexicalComposerContext()
  const isUnderlined = useAtomValue(isUnderlinedAtom)
  const classes = useButtonStyles()
  const buttonClass = isUnderlined
    ? joinClasses(classes.root, classes.active)
    : classes.root

  return (
    <IconButton
      type="button"
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
      }}
      className={buttonClass}
      aria-label="Format Underlined">
      <FormatUnderlined fontSize="small" />
    </IconButton>
  )
}

export default FormatUnderlinedButton
