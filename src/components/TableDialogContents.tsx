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
  const {
    rows,
    columns,
    handleChangeRows,
    handleChangeColumns,
    handleConfirm,
  } = useTableFormControls()
  return (
    <Card>
      <CardContent>
        <CardHeader title="Insert Table" />
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <TextField
              fullWidth
              label="Rows"
              value={rows}
              onChange={handleChangeRows}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Columns"
              value={columns}
              onChange={handleChangeColumns}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button onClick={handleConfirm}> Confirm </Button>
      </CardActions>
    </Card>
  )
}

export default TableDialogContents
