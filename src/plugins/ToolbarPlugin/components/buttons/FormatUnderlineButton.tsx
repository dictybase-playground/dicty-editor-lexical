import { useContext } from "react"
import { FORMAT_TEXT_COMMAND } from "lexical"
import { IconButton } from "@material-ui/core"
import { FormatUnderlined } from "@material-ui/icons"
import ToolbarContext, { IToolbarContext } from "context/ToolbarContext"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

const FormatUnderlinedButton = () => {
  const [editor] = useLexicalComposerContext()
  const { isUnderlined } = useContext(ToolbarContext) as IToolbarContext

  return (
    <IconButton
      type="button"
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
      }}
      className={`toolbar-item spaced ${isUnderlined ? "active" : ""}`}
      aria-label="Format Bold">
      <FormatUnderlined fontSize="small" />
    </IconButton>
  )
}

export default FormatUnderlinedButton
