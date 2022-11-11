import { FORMAT_TEXT_COMMAND } from "lexical"
import { IconButton } from "@material-ui/core"
import { FormatItalic } from "@material-ui/icons"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { isItalicAtom } from "context/AtomConfigs"
import useActiveClass from "hooks/useActiveClass"

const FormatItalicButton = () => {
  const [editor] = useLexicalComposerContext()
  const buttonClass = useActiveClass(isItalicAtom)

  return (
    <IconButton
      type="button"
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
      }}
      className={buttonClass}
      aria-label="Format Bold">
      <FormatItalic fontSize="small" />
    </IconButton>
  )
}

export default FormatItalicButton
