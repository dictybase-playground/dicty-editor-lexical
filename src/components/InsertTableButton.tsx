import { Button, Dialog } from "@material-ui/core"
import TableChartOutlinedIcon from "@material-ui/icons/TableChartOutlined"
import useToolbarItemStyles from "hooks/useToolbarItemStyles"
import { useAtom } from "jotai"
import { insertTableOpenAtom } from "context/AtomConfigs"
import TableDialogContents from "./TableDialogContents"

// When we make dialogs for inserting other things, they will be added here

const InsertTableButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useAtom(insertTableOpenAtom)
  const { spaced } = useToolbarItemStyles()

  return (
    <>
      <Button
        className={spaced}
        variant="text"
        onClick={() => setIsDialogOpen(true)}
        startIcon={<TableChartOutlinedIcon />}>
        Table
      </Button>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <TableDialogContents />
      </Dialog>
    </>
  )
}

export default InsertTableButton
