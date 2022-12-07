import { makeStyles, IconButton } from "@material-ui/core"
import {
  SaveAlt,
  OpenInBrowser,
  GetApp,
  Publish,
  Delete,
} from "@material-ui/icons"
import {
  useSaveLocalStorage,
  useRetrieveLocalStorage,
  useDeleteLocalStorage,
} from "hooks/useLocalStorage"
import {
  useSaveServerStorage,
  useRetrieveServerStorage,
  useDeleteServerStorage,
} from "hooks/useServerStorage"

const useActionStyles = makeStyles({
  root: {
    display: "flex",
    position: "absolute",
    bottom: "5px",
    right: "30px",
    zIndex: 999,
  },
})

const Actions = () => {
  const classes = useActionStyles()
  const saveLocalStorage = useSaveLocalStorage()
  const retrieveLocalStorage = useRetrieveLocalStorage()
  const deleteLocalStorage = useDeleteLocalStorage()
  const saveServerStorage = useSaveServerStorage()
  const retrieveServerStorage = useRetrieveServerStorage()
  const deleteServerStorage = useDeleteServerStorage()

  return (
    <div className={classes.root}>
      <IconButton title="Save To Browser" onClick={saveLocalStorage}>
        <SaveAlt />
      </IconButton>
      <IconButton title="Load from Browser" onClick={retrieveLocalStorage}>
        <OpenInBrowser />
      </IconButton>
      <IconButton title="Delete from Browser" onClick={deleteLocalStorage}>
        <Delete />
      </IconButton>
      <IconButton title="Save to Server" onClick={saveServerStorage}>
        <GetApp />
      </IconButton>
      <IconButton title="Load from Server" onClick={retrieveServerStorage}>
        <Publish />
      </IconButton>
      <IconButton title="Delete from Server" onClick={deleteServerStorage}>
        <Delete />
      </IconButton>
    </div>
  )
}

export default Actions
