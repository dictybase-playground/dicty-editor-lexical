import { Grid, IconButton } from "@material-ui/core"
import { SaveAlt, OpenInBrowser, GetApp, Publish } from "@material-ui/icons"
import useLocalStorage from "hooks/useLocalStorage"
import useServerStorage from "hooks/useServerStorage"

const Actions = () => {
  const { saveLocalStorage, retrieveLocalStorage } = useLocalStorage()
  const { saveServerStorage, retrieveServerStorage } = useServerStorage()

  return (
    <Grid container justifyContent="flex-end">
      <IconButton title="Save To Browser" onClick={saveLocalStorage}>
        <SaveAlt />
      </IconButton>
      <IconButton title="Load from Browser" onClick={retrieveLocalStorage}>
        <OpenInBrowser />
      </IconButton>
      <IconButton title="Save to Server" onClick={saveServerStorage}>
        <GetApp />
      </IconButton>
      <IconButton title="Load from Server" onClick={retrieveServerStorage}>
        <Publish />
      </IconButton>
    </Grid>
  )
}

export default Actions
