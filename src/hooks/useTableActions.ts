import { $getRoot, LexicalEditor } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  TableCellNode,
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
import { useAtomValue, useSetAtom, SetStateAction } from "jotai"

const clearTableSelection = (
  editor: LexicalEditor,
  tableCellNode: TableCellNode,
) => {
  if (tableCellNode && tableCellNode.isAttached()) return
  editor.update(() => {
    const rootNode = $getRoot()
    rootNode.selectStart()
  })
}

const useTableActionContext = (): [
  LexicalEditor,
  (update: SetStateAction<boolean>) => void,
  TableCellNode | null,
] => [
  useLexicalComposerContext()[0],
  useSetAtom(tableActionMenuOpenAtom),
  useAtomValue(selectedTableCellNode),
]

export const useDeleteTable = () => {
  const [editor, setIsOpen, tableCellNode] = useTableActionContext()
  return () => {
    if (!tableCellNode) return
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      tableNode.remove()
    })
    setIsOpen(false)
  }
}

export const useInsertRow = () => {
  const [editor, setIsOpen, tableCellNode] = useTableActionContext()

  const insertRow =
    ({ insertAfter }: { insertAfter: boolean }) =>
    () => {
      if (!tableCellNode) return
      editor.update(() => {
        const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
        const row = $getTableRowIndexFromTableCellNode(tableCellNode)
        const grid = $getElementGridForTableNode(editor, tableNode)
        $insertTableRow(tableNode, row, insertAfter, 1, grid)
      })
      setIsOpen(false)
    }

  return {
    insertRowAbove: insertRow({ insertAfter: false }),
    insertRowBelow: insertRow({ insertAfter: true }),
  }
}

export const useInsertColumn = () => {
  const [editor, setIsOpen, tableCellNode] = useTableActionContext()

  const insertColumnLeft = () => {
    if (!tableCellNode) return
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      const column = $getTableColumnIndexFromTableCellNode(tableCellNode)
      const grid = $getElementGridForTableNode(editor, tableNode)
      $insertTableColumn(tableNode, column, false, 1, grid)
    })
    setIsOpen(false)
  }

  const insertColumnRight = () => {
    if (!tableCellNode) return
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      const columnIndex = $getTableColumnIndexFromTableCellNode(tableCellNode)
      const grid = $getElementGridForTableNode(editor, tableNode)
      $insertTableColumn(tableNode, columnIndex, true, 1, grid)
    })
    setIsOpen(false)
  }

  return { insertColumnLeft, insertColumnRight }
}
export const useDeleteColumn = () => {
  const [editor, setIsOpen, tableCellNode] = useTableActionContext()
  let deleteColumnDisabled = true

  editor.getEditorState().read(() => {
    if (!tableCellNode) return
    const grid = $getElementGridForTableNode(
      editor,
      $getTableNodeFromLexicalNodeOrThrow(tableCellNode),
    )
    deleteColumnDisabled = grid.columns === 1
  })

  const deleteColumn = () => {
    if (!tableCellNode) return
    editor.update(() => {
      $deleteTableColumn(
        $getTableNodeFromLexicalNodeOrThrow(tableCellNode),
        $getTableColumnIndexFromTableCellNode(tableCellNode),
      )
      clearTableSelection(editor, tableCellNode)
    })
    setIsOpen(false)
  }

  return {
    deleteColumn,
    deleteColumnDisabled,
  }
}

export const useDeleteRow = () => {
  const [editor, setIsOpen, tableCellNode] = useTableActionContext()
  let deleteRowDisabled = true

  editor.getEditorState().read(() => {
    if (!tableCellNode) return
    const grid = $getElementGridForTableNode(
      editor,
      $getTableNodeFromLexicalNodeOrThrow(tableCellNode),
    )
    deleteRowDisabled = grid.rows === 1
  })

  const deleteRow = () => {
    editor.update(() => {
      if (!tableCellNode) return
      $removeTableRowAtIndex(
        $getTableNodeFromLexicalNodeOrThrow(tableCellNode),
        $getTableRowIndexFromTableCellNode(tableCellNode),
      )
      clearTableSelection(editor, tableCellNode)
    })
    setIsOpen(false)
  }

  return {
    deleteRow,
    deleteRowDisabled,
  }
}
