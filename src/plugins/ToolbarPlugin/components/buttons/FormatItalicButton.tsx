import { FORMAT_TEXT_COMMAND } from "lexical"
import { IconButton } from "@material-ui/core"
import { FormatItalic } from "@material-ui/icons"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtomValue } from "jotai"
import { isItalicAtom } from "context/AtomConfigs"

const FormatItalicButton = () => {
  const [editor] = useLexicalComposerContext()
  const isItalic = useAtomValue(isItalicAtom)

  return (
    <IconButton
      type="button"
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
      }}
      className={`toolbar-item spaced ${isItalic ? "active" : ""}`}
      aria-label="Format Bold">
      <FormatItalic fontSize="small" />
    </IconButton>
  )
}

export default FormatItalicButton
