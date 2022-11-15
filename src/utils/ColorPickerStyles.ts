import { makeStyles } from "@material-ui/core"

const useColorPickerStyles = makeStyles({
  root: {
    position: "absolute",
    width: "min-content",
    top: 30,
    zIndex: 1,
    borderRadius: "8px",
    boxShadow:
      "0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.5)",
  },
})

export default useColorPickerStyles
