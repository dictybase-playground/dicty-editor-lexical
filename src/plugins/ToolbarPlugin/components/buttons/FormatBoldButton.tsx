import { useContext } from "react"
import { FORMAT_TEXT_COMMAND } from "lexical"
import { IconButton } from "@material-ui/core"
import { FormatBold } from "@material-ui/icons"
import ToolbarContext, { IToolbarContext } from "context/ToolbarContext"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

const FormatBoldButton = () => {
  const [editor] = useLexicalComposerContext()
  const { isBold } = useContext(ToolbarContext) as IToolbarContext

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
