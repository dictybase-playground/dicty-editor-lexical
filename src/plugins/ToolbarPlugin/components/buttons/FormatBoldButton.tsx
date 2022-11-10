import { FORMAT_TEXT_COMMAND } from "lexical"
import { IconButton } from "@material-ui/core"
import { FormatBold } from "@material-ui/icons"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtomValue } from "jotai"
import { isBoldAtom } from "context/AtomConfigs"

const FormatBoldButton = () => {
  const [editor] = useLexicalComposerContext()
  const isBold = useAtomValue(isBoldAtom)

  return (
    <IconButton
      type="button"
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
      }}
      className={`toolbar-item spaced ${isBold ? "active" : ""}`}
      aria-label="Format Bold">
      <FormatBold fontSize="small" />
    </IconButton>
  )
}

export default FormatBoldButton
