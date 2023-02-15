import {
  Button,
  CardHeader,
  Card,
  CardContent,
  TextField,
  CardActions,
  Grid,
} from "@material-ui/core"
import useTableFormControls from "hooks/useTableFormControls"

const TableDialogContents = () => {
  const { textFieldProperties, handleConfirm } = useTableFormControls()

  return (
    <Card>
      <CardContent>
        <CardHeader title="Insert Table" />
        <Grid container direction="column" spacing={1}>
          {textFieldProperties.map((property) => (
            <Grid key={property[0]} item>
              <TextField
                fullWidth
                label={property[0]}
                value={property[1]}
                onChange={property[2]}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <CardActions>
        <Button onClick={handleConfirm}> Confirm </Button>
      </CardActions>
    </Card>
  )
}

export default TableDialogContents
