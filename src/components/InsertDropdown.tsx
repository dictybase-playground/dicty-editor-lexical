import { useRef, useState, ReactNode } from "react"
import { Button, Menu, MenuItem, Dialog } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import useToolbarItemStyles from "hooks/useToolbarItemStyles"
import { useAtom } from "jotai"
import { insertTableOpenAtom } from "context/AtomConfigs"
import TableDialogContents from "./TableDialogContents"

type DialogStates = "TABLE"

// When we make dialogs for inserting other things, they will be added here
const dialogStateComponents: Record<DialogStates, ReactNode> = {
  TABLE: <TableDialogContents />,
}

const InsertDropdown = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useAtom(insertTableOpenAtom)
  const [currentDialog, setCurrentDialog] = useState("TABLE")
  const buttonReference = useRef(null)
  const { spaced } = useToolbarItemStyles()

  const handleOpenDialog = (dialog: DialogStates) => {
    setIsMenuOpen(false)
    setCurrentDialog(dialog)
    setIsDialogOpen(true)
  }

  return (
    <>
      <Button
        ref={buttonReference}
        className={spaced}
        variant="text"
        onClick={() => setIsMenuOpen(true)}
        startIcon={<AddIcon />}>
        Insert
      </Button>
      <Menu
        anchorEl={buttonReference.current}
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}>
        <MenuItem onClick={() => handleOpenDialog("TABLE")}> Table </MenuItem>
        {/* When more insert options are added, we can do a map instead */}
      </Menu>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        {dialogStateComponents[currentDialog as DialogStates]}
      </Dialog>
    </>
  )
}

export default InsertDropdown
