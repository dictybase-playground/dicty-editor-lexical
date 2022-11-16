import { FORMAT_TEXT_COMMAND } from "lexical"
import { FormatBold } from "@material-ui/icons"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { isBoldAtom } from "context/AtomConfigs"
import useActiveClass from "hooks/useActiveClass"
import TooltipButton from "./TooltipButton"

const FormatBoldButton = () => {
  const [editor] = useLexicalComposerContext()
  const buttonClass = useActiveClass(isBoldAtom)

  return (
    <TooltipButton
      title="Format Bold"
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
      }}
      className={buttonClass}
      icon={<FormatBold fontSize="small" />}
    />
  )
}

export default FormatBoldButton
