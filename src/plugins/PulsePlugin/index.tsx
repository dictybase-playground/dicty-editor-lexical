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
            console.log(node.exportDOM(editor).element)
            const { element } = node.exportDOM(editor)
            element.classList.add(PULSE_CLASSNAME)
            node.updateDOM(node, element, editor)
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
