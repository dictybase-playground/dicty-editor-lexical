import { $getRoot } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  $getTableNodeFromLexicalNodeOrThrow,
  $getTableColumnIndexFromTableCellNode,
  $getTableRowIndexFromTableCellNode,
  $getElementGridForTableNode,
  $insertTableRow,
  $insertTableColumn,
  $removeTableRowAtIndex,
  $deleteTableColumn,
} from "@lexical/table"
import {
  selectedTableCellNode,
  tableActionMenuOpenAtom,
} from "context/AtomConfigs"
import { useAtomValue, useSetAtom } from "jotai"

const useTableActions = () => {
  const [editor] = useLexicalComposerContext()
  const setIsOpen = useSetAtom(tableActionMenuOpenAtom)
  const tableCellNode = useAtomValue(selectedTableCellNode)

  if (!tableCellNode) {
    // Since I am using an atom value for tableCellNode which may technically
    // be of type "null", I check for that and return an object with useless
    // functions here, instead of checking for a null value in every function
    // definition below.
    return {
      insertColumnLeft: () => {},
      insertColumnRight: () => {},
      insertRowAbove: () => {},
      insertRowBelow: () => {},
      deleteColumn: () => {},
      deleteRow: () => {},
      deleteTable: () => {},
    }
  }

  const clearTableSelection = () => {
    if (tableCellNode && tableCellNode.isAttached()) return
    editor.update(() => {
      const rootNode = $getRoot()
      rootNode.selectStart()
    })
  }

  const deleteTable = () => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      tableNode.remove()
    })
    setIsOpen(false)
  }

  const insertRowAbove = () => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      $insertTableRow(
        tableNode,
        $getTableRowIndexFromTableCellNode(tableCellNode),
        false,
        1,
        $getElementGridForTableNode(editor, tableNode),
      )
    })
    setIsOpen(false)
  }

  const insertRowBelow = () => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      $insertTableRow(
        tableNode,
        $getTableRowIndexFromTableCellNode(tableCellNode),
        true,
        1,
        $getElementGridForTableNode(editor, tableNode),
      )
    })
    setIsOpen(false)
  }

  const insertColumnLeft = () => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      $insertTableColumn(
        tableNode,
        $getTableColumnIndexFromTableCellNode(tableCellNode),
        false,
        1,
        $getElementGridForTableNode(editor, tableNode),
      )
    })
    setIsOpen(false)
  }

  const insertColumnRight = () => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      const columnIndex = $getTableColumnIndexFromTableCellNode(tableCellNode)
      const grid = $getElementGridForTableNode(editor, tableNode)
      $insertTableColumn(tableNode, columnIndex, true, 1, grid)
    })
    setIsOpen(false)
  }

  const deleteRow = () => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      const grid = $getElementGridForTableNode(editor, tableNode)
      if (grid.rows === 1) {
        tableNode.remove()
        return
      }
      const rowIndex = $getTableRowIndexFromTableCellNode(tableCellNode)
      $removeTableRowAtIndex(tableNode, rowIndex)
      clearTableSelection()
    })
    setIsOpen(false)
  }

  const deleteColumn = () => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      const grid = $getElementGridForTableNode(editor, tableNode)
      if (grid.columns === 1) {
        tableNode.remove()
        return
      }

      const columnIndex = $getTableColumnIndexFromTableCellNode(tableCellNode)
      $deleteTableColumn(tableNode, columnIndex)
      clearTableSelection()
    })
    setIsOpen(false)
  }

  return {
    insertColumnLeft,
    insertColumnRight,
    insertRowAbove,
    insertRowBelow,
    deleteColumn,
    deleteRow,
    deleteTable,
  }
}

export default useTableActions
