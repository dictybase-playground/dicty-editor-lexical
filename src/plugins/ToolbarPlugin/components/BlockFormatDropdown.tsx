import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list"
import {
  $createHeadingNode,
  $createQuoteNode,
  HeadingTagType,
} from "@lexical/rich-text"
import { $wrapNodes } from "@lexical/selection"
import { $createParagraphNode, $getSelection, $isRangeSelection } from "lexical"
import { useMemo } from "react"
import Dropdown from "ui/Dropdown"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtom } from "jotai"
import { blockTypesAtom } from "context/AtomConfigs"

const blockTypeToBlockName: Record<string, string> = {
  paragraph: "Normal",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  bullet: "Bulleted List",
  number: "Numbered List",
  quote: "Quote",
}

const BlockFormatDropdown = () => {
  const [editor] = useLexicalComposerContext()
  const [blockType] = useAtom(blockTypesAtom)

  const formatParagraph = () => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createParagraphNode())
        }
      })
    }
  }

  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode(headingSize))
        }
      })
    }
  }

  const formatBulletList = () => {
    if (blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
  }

  // const formatCheckList = () => {
  //   if (blockType !== "check") {
  //     editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined)
  //   } else {
  //     editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
  //   }
  // }

  const formatNumberedList = () => {
    if (blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
  }

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createQuoteNode())
        }
      })
    }
  }

  const blockTypeToFormatFunction = useMemo(
    () => ({
      bullet: formatBulletList,
      // check: formatCheckList,
      h1: () => formatHeading("h1"),
      h2: () => formatHeading("h2"),
      h3: () => formatHeading("h3"),
      h4: () => formatHeading("h4"),
      number: formatNumberedList,
      paragraph: formatParagraph,
      quote: formatQuote,
    }),
    undefined,
  )

  const blockTypes = Object.keys(blockTypeToBlockName)

  return (
    <Dropdown
      buttonClassName="toolbar-item block-controls"
      buttonIconClassName={`icon block-type ${blockType}`}
      buttonLabel={blockTypeToBlockName[blockType]}
      buttonAriaLabel="Formatting options for text style">
      {blockTypes.map((blockName) => (
        <button
          className="item"
          onClick={blockTypeToFormatFunction[blockName]}
          type="button">
          <span className={`icon ${blockName}`} />
          <span className="text">{blockTypeToBlockName[blockName]}</span>
          {blockType === blockName && <span className="active" />}
        </button>
      ))}
    </Dropdown>
  )
}

export default BlockFormatDropdown
