import { FORMAT_TEXT_COMMAND } from "lexical"
import { IconButton } from "@material-ui/core"
import { FormatBold } from "@material-ui/icons"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtom } from "jotai"
import { isBoldAtom } from "context/AtomConfigs"

const FormatBoldButton = () => {
  const [editor] = useLexicalComposerContext()
  const [isBold] = useAtom(isBoldAtom)

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
