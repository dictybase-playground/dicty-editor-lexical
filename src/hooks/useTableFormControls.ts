import { useState, ChangeEvent } from "react"
import { INSERT_CUSTOM_TABLE_COMMAND } from "plugins/CustomTablePlugin"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useSetAtom } from "jotai"
import { insertTableOpenAtom } from "context/AtomConfigs"

const calculateWidth = (columns: number) => 250 + Math.log(columns) * 500

const useTableFormControls = () => {
  const [editor] = useLexicalComposerContext()
  const [rows, setRows] = useState(3)
  const [columns, setColumns] = useState(3)
  const setIsDialogOpen = useSetAtom(insertTableOpenAtom)

  const handleChangeRows = (event: ChangeEvent<HTMLInputElement>) => {
    setRows(Number.parseInt(event.target.value, 10) || 0)
  }

  const handleChangeColumns = (event: ChangeEvent<HTMLInputElement>) => {
    setColumns(Number.parseInt(event.target.value, 10) || 0)
  }

  const handleConfirm = () => {
    editor.dispatchCommand(INSERT_CUSTOM_TABLE_COMMAND, {
      rows,
      columns,
      width: calculateWidth(columns),
    })
    setIsDialogOpen(false)
  }

  return { rows, columns, handleChangeRows, handleChangeColumns, handleConfirm }
}

export default useTableFormControls
