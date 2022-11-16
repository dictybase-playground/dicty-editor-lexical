import { FORMAT_TEXT_COMMAND } from "lexical"
import { FormatItalic } from "@material-ui/icons"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { isItalicAtom } from "context/AtomConfigs"
import useActiveClass from "hooks/useActiveClass"
import TooltipButton from "./TooltipButton"

const FormatItalicButton = () => {
  const [editor] = useLexicalComposerContext()
  const buttonClass = useActiveClass(isItalicAtom)

  return (
    <TooltipButton
      title="Format Italic"
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
      }}
      className={buttonClass}
      icon={<FormatItalic fontSize="small" />}
    />
  )
}

export default FormatItalicButton
