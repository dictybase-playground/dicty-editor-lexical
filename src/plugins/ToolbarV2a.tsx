import { Divider, FormatBoldButton } from "components"
import useToolbarStyles from "utils/ToolbarStyles"
import useToolbarCleanup from "hooks/useToolbarCleanupV2a"

const ToolbarV2 = () => {
  useToolbarCleanup()
  const toolbarClasses = useToolbarStyles()

  return (
    <div className={toolbarClasses.root}>
      <Divider />
      <FormatBoldButton />
    </div>
  )
}

export default ToolbarV2
