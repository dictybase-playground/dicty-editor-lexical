import { FORMAT_TEXT_COMMAND } from "lexical"
import { FormatBold } from "@material-ui/icons"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { isBoldAtom } from "context/AtomConfigs"
import useActiveClass from "hooks/useActiveClass"
import { IconButton } from "@material-ui/core"

const TestButton = () => {
  const [editor] = useLexicalComposerContext()
  const buttonClass = useActiveClass(isBoldAtom)

  return (
    <IconButton
      title="Format Bold"
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
      }}
      className={buttonClass}>
      <FormatBold fontSize="small" />
    </IconButton>
  )
}

export default TestButton
