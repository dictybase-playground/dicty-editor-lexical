import { useEffect } from "react"
import { createPortal } from "react-dom"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getSelection, $isRangeSelection } from "lexical"
import { $getTableCellNodeFromLexicalNode } from "@lexical/table"
import TableActionMenuButton from "components/TableActionMenuButton"
import { useAtom } from "jotai"
import { selectedTableCellNode } from "context/AtomConfigs"

const TableActionPlugin = () => {
  const [editor] = useLexicalComposerContext()
  // switch to using atom for this later
  const [currentTableCellNode, setCurrentTableCellNode] = useAtom(
    selectedTableCellNode,
  )

  useEffect(() => {
    // register a listener for selection command,
    // if the selection is inside a table cell, get the current table cell node for that cell
    // and store it in state, which is used by TableMenuButton for positioning
    const unregisterSelectionChange = editor.registerUpdateListener(
      // lexical's demo uses registerUpdateListener, maybe that's the right choice, look into later
      () => {
        editor.getEditorState().read(() => {
          const selection = $getSelection()

          if (!$isRangeSelection(selection)) return
          // lexical also has other non-null checks for other variables, that I don't think are necessary, but I will look closer
          const tableCellNode = $getTableCellNodeFromLexicalNode(
            selection.anchor.getNode(),
          )
          if (!tableCellNode) {
            setCurrentTableCellNode(null)
            return
          }

          setCurrentTableCellNode(tableCellNode)
        })
      },
    )

    return () => {
      unregisterSelectionChange()
    }
  }, [editor, setCurrentTableCellNode])

  if (currentTableCellNode)
    return createPortal(<TableActionMenuButton />, document.body)

  return null
}

export default TableActionPlugin
