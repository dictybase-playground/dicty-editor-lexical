import { FORMAT_TEXT_COMMAND } from "lexical"
import { IconButton } from "@material-ui/core"
import { FormatUnderlined } from "@material-ui/icons"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { isUnderlinedAtom } from "context/AtomConfigs"
import useActiveClass from "hooks/useActiveClass"

const FormatUnderlinedButton = () => {
  const [editor] = useLexicalComposerContext()
  const buttonClass = useActiveClass(isUnderlinedAtom)

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
