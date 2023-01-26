import { Button, Dialog } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import useToolbarItemStyles from "hooks/useToolbarItemStyles"
import { useAtom } from "jotai"
import { dialogOpenAtom } from "context/AtomConfigs"
import TableDialogContents from "./TableDialogContents"

const InsertTableButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useAtom(dialogOpenAtom)
  const { spaced } = useToolbarItemStyles()

  return (
    <>
      <Button
        className={spaced}
        variant="text"
        onClick={() => setIsDialogOpen(true)}
        startIcon={<AddIcon />}>
        Table
      </Button>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <TableDialogContents />
      </Dialog>
    </>
  )
}

export default InsertTableButton
