import { FORMAT_TEXT_COMMAND } from "lexical"
import { IconButton, Tooltip } from "@material-ui/core"
import { FormatItalic } from "@material-ui/icons"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { isItalicAtom } from "context/AtomConfigs"
import useActiveClass from "hooks/useActiveClass"

const FormatItalicButton = () => {
  const [editor] = useLexicalComposerContext()
  const buttonClass = useActiveClass(isItalicAtom)

  return (
    <Tooltip arrow title="Format Italic">
      <IconButton
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
        }}
        className={buttonClass}
        aria-label="Format Bold">
        <FormatItalic fontSize="small" />
      </IconButton>
    </Tooltip>
  )
}

export default FormatItalicButton
