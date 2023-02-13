import { $getRoot, LexicalEditor } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  TableCellNode,
  $getTableNodeFromLexicalNodeOrThrow,
  $getTableColumnIndexFromTableCellNode,
  $getTableRowIndexFromTableCellNode,
  $getElementGridForTableNode,
  $insertTableColumn,
  $removeTableRowAtIndex,
  $deleteTableColumn,
} from "@lexical/table"
import {
  selectedTableCellNode,
  tableActionMenuOpenAtom,
} from "context/AtomConfigs"
import { useAtomValue, useSetAtom, SetStateAction } from "jotai"
import { insertRow } from "utils/tableActions"

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
  TableCellNode | null,
  (update: SetStateAction<boolean>) => void,
] => [
  useLexicalComposerContext()[0],
  useAtomValue(selectedTableCellNode),
  useSetAtom(tableActionMenuOpenAtom),
]

export const useDeleteTable = () => {
  const [editor, tableCellNode, setIsOpen] = useTableActionContext()
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
  const [editor, tableCellNode, setIsOpen] = useTableActionContext()

  const insertRowAbove = () => {
    insertRow(editor, tableCellNode, { insertAfter: false })
    setIsOpen(false)
  }

  const insertRowBelow = () => {
    insertRow(editor, tableCellNode, { insertAfter: true })
    setIsOpen(false)
  }

  return {
    insertRowAbove,
    insertRowBelow,
  }
}

export const useInsertColumn = () => {
  const [editor, tableCellNode, setIsOpen] = useTableActionContext()

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
  const [editor, tableCellNode, setIsOpen] = useTableActionContext()

  return () => {
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
}

export const useDeleteRow = () => {
  const [editor, tableCellNode, setIsOpen] = useTableActionContext()

  return () => {
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
}

export const useDisableFunctions = () => {
  const [editor, tableCellNode] = useTableActionContext()
  let deleteRowDisabled = true
  let deleteColumnDisabled = true

  editor.getEditorState().read(() => {
    if (!tableCellNode) return
    const grid = $getElementGridForTableNode(
      editor,
      $getTableNodeFromLexicalNodeOrThrow(tableCellNode),
    )
    deleteRowDisabled = grid.rows === 1
    deleteColumnDisabled = grid.columns === 1
  })

  return {
    deleteRowDisabled,
    deleteColumnDisabled,
  }
}
