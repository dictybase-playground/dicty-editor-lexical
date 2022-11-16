import { FORMAT_TEXT_COMMAND } from "lexical"
import { IconButton, Tooltip } from "@material-ui/core"
import { FormatUnderlined } from "@material-ui/icons"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { isUnderlinedAtom } from "context/AtomConfigs"
import useActiveClass from "hooks/useActiveClass"

const FormatUnderlinedButton = () => {
  const [editor] = useLexicalComposerContext()
  const buttonClass = useActiveClass(isUnderlinedAtom)

  return (
    <Tooltip arrow title="Format Underline">
      <IconButton
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
        }}
        className={buttonClass}
        aria-label="Format Underlined">
        <FormatUnderlined fontSize="small" />
      </IconButton>
    </Tooltip>
  )
}

export default FormatUnderlinedButton
