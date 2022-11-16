import { FORMAT_TEXT_COMMAND } from "lexical"
import { FormatUnderlined } from "@material-ui/icons"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { isUnderlinedAtom } from "context/AtomConfigs"
import useActiveClass from "hooks/useActiveClass"
import TooltipButton from "./TooltipButton"

const FormatUnderlinedButton = () => {
  const [editor] = useLexicalComposerContext()
  const buttonClass = useActiveClass(isUnderlinedAtom)

  return (
    <TooltipButton
      title="Format Underline"
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
      }}
      className={buttonClass}
      icon={<FormatUnderlined fontSize="small" />}
    />
  )
}

export default FormatUnderlinedButton
