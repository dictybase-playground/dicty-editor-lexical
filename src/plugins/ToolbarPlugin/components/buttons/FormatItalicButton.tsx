import { useContext } from "react"
import { FORMAT_TEXT_COMMAND } from "lexical"
import { IconButton } from "@material-ui/core"
import { FormatItalic } from "@material-ui/icons"
import ToolbarContext, { IToolbarContext } from "context/ToolbarContext"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

const FormatItalicButton = () => {
  const [editor] = useLexicalComposerContext()
  const { isItalic } = useContext(ToolbarContext) as IToolbarContext

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
