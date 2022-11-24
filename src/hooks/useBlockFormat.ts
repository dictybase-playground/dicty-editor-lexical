import { useCallback } from "react"
import { $createParagraphNode, $getSelection, $isRangeSelection } from "lexical"
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list"
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text"
import { $wrapNodes } from "@lexical/selection"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { blockTypeAtom, BlockTypes } from "context/AtomConfigs"
import { useAtomValue } from "jotai/utils"

const nodeCreators = {
  paragraph: () => $createParagraphNode(),
  quote: () => $createQuoteNode(),
  h1: () => $createHeadingNode("h1"),
  h2: () => $createHeadingNode("h2"),
  h3: () => $createHeadingNode("h3"),
  h4: () => $createHeadingNode("h4"),
}

const useBlockFormat = (): [BlockTypes, (newBlockType: BlockTypes) => void] => {
  const [editor] = useLexicalComposerContext()
  const currentBlockType = useAtomValue(blockTypeAtom)

  const setBlockType = useCallback(
    (newBlockType: BlockTypes) => {
      if (currentBlockType === newBlockType) {
        if (
          currentBlockType !== BlockTypes.NUMBERED_LIST &&
          currentBlockType !== BlockTypes.BULLET_LIST
        ) {
          return
        }
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
      }

      switch (newBlockType) {
        case BlockTypes.NUMBERED_LIST: {
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
          return
        }
        case BlockTypes.BULLET_LIST: {
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
          return
        }
        default: {
          editor.update(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
              $wrapNodes(selection, nodeCreators[newBlockType])
            }
          })
        }
      }
    },
    [currentBlockType, editor],
  )

  return [currentBlockType, setBlockType]
}

export default useBlockFormat
