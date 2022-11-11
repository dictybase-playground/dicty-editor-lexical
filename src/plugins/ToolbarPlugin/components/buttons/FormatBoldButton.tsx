import { FORMAT_TEXT_COMMAND } from "lexical"
import { IconButton } from "@material-ui/core"
import { FormatBold } from "@material-ui/icons"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { isBoldAtom } from "context/AtomConfigs"
import useActiveClass from "hooks/useActiveClass"

const FormatBoldButton = () => {
  const [editor] = useLexicalComposerContext()
  const buttonClass = useActiveClass(isBoldAtom)

  return (
    <IconButton
      type="button"
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
      }}
      className={buttonClass}
      aria-label="Format Bold">
      <FormatBold fontSize="small" />
    </IconButton>
  )
}

export default FormatBoldButton
