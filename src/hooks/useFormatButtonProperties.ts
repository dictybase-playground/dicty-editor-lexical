import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { TextFormatType, FORMAT_TEXT_COMMAND } from "lexical"
import { WritableAtom } from "jotai"
import { SetStateAction } from "react"
import useActiveClass from "./useActiveClass"

const useFormatButtonProperties = (
  commandPayload: TextFormatType,
  atomConfig: WritableAtom<boolean, SetStateAction<boolean>, void>,
) => {
  const [editor] = useLexicalComposerContext()
  const dispatchCommand = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, commandPayload)
  }

  return [useActiveClass(atomConfig), dispatchCommand]
}

export default useFormatButtonProperties
