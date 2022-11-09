import { useEffect } from "react"
import { $getSelection, $isRangeSelection } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import TOGGLE_PULSE_COMMAND from "./commands"
import "./index.css"

const PULSE_CLASSNAME = "pulse"

const PulsePlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    const unregisterTogglePulse = editor.registerCommand(
      TOGGLE_PULSE_COMMAND,
      () => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          selection.getNodes().forEach((node) => {
            const nodeKey = node.getKey()
            const element = editor.getElementByKey(nodeKey)
            element?.classList.add(PULSE_CLASSNAME)
          })
        }

        return true
      },
      1,
    )

    return function cleanup() {
      unregisterTogglePulse()
    }
  }, [editor])

  return null
}

export default PulsePlugin
