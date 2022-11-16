import { FORMAT_TEXT_COMMAND } from "lexical"
import { IconButton } from "@material-ui/core"
import { FormatBold } from "@material-ui/icons"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { isBoldAtom } from "context/AtomConfigs"
import useActiveClass from "hooks/useActiveClass"

const FormatBoldButton = () => {
  const [editor] = useLexicalComposerContext()
  const buttonClass = useActiveClass(isBoldAtom)
  const title = "Format Bold"

  return (
    <IconButton
      title={title}
      aria-label={title}
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
      }}
      className={buttonClass}>
      <FormatBold fontSize="small" />
    </IconButton>
  )
}

export default FormatBoldButton
