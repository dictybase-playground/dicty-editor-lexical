import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { IconButton } from "@material-ui/core"
import { Flare } from "@material-ui/icons"
import { pulseAtom } from "context/AtomConfigs"
import { useAtomValue } from "jotai/utils"
import TOGGLE_PULSE_COMMAND from "plugins/PulsePlugin/commands"

const PulseButton = () => {
  const [editor] = useLexicalComposerContext()
  const selectedTextIsPulsing = useAtomValue(pulseAtom)

  return (
    <IconButton
      onClick={() => {
        editor.dispatchCommand(TOGGLE_PULSE_COMMAND, undefined)
      }}>
      <Flare />
    </IconButton>
  )
}

export default PulseButton
