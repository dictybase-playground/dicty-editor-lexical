import { FORMAT_TEXT_COMMAND } from "lexical"
import { IconButton } from "@material-ui/core"
import { FormatUnderlined } from "@material-ui/icons"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtomValue } from "jotai"
import { isUnderlinedAtom } from "context/AtomConfigs"

const FormatUnderlinedButton = () => {
  const [editor] = useLexicalComposerContext()
  const isUnderlined = useAtomValue(isUnderlinedAtom)

  return (
    <IconButton
      type="button"
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
      }}
      className={`toolbar-item spaced ${isUnderlined ? "active" : ""}`}
      aria-label="Format Underlined">
      <FormatUnderlined fontSize="small" />
    </IconButton>
  )
}

export default FormatUnderlinedButton
