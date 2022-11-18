import { useEffect } from "react"
import { makeStyles, IconButton } from "@material-ui/core"
import { SaveAlt, Save } from "@material-ui/icons"
import useLocalStorage from "hooks/useLocalStorage"
import useServerStorage from "hooks/useServerStorage"

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
  const { saveLocalStorage } = useLocalStorage()
  const { saveServerStorage, retrieveServerStorage } = useServerStorage()

  useEffect(() => {
    retrieveServerStorage()
  }, [retrieveServerStorage])

  return (
    <div className={classes.root}>
      <IconButton onClick={saveLocalStorage}>
        <SaveAlt />
      </IconButton>
      <IconButton onClick={saveServerStorage}>
        <Save />
      </IconButton>
    </div>
  )
}

export default Actions
