import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { TableCellNode, TableRowNode } from "@lexical/table"
import { COMMAND_PRIORITY_EDITOR, createCommand } from "lexical"
import CustomTableNode from "nodes/CustomTableNode"
import InsertCustomTable from "utils/InsertCustomTable"

export const INSERT_CUSTOM_TABLE_COMMAND = createCommand<{
  columns: number
  rows: number
  width: number
}>()

const CustomTablePlugin = () => {
  const [editor] = useLexicalComposerContext()
  useEffect(() => {
    if (!editor.hasNodes([CustomTableNode, TableCellNode, TableRowNode])) {
      throw new Error(
        `TablePlugin: TableNode, TableCellNode or TableRowNode not registered on editor`,
      )
    }
    const unregisterInsertTable = editor.registerCommand(
      INSERT_CUSTOM_TABLE_COMMAND,
      InsertCustomTable,
      COMMAND_PRIORITY_EDITOR,
    )

    return () => {
      unregisterInsertTable()
    }
  }, [editor])

  return null
}

export default CustomTablePlugin
