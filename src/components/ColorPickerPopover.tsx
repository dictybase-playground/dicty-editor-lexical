import { Popover } from "@material-ui/core"
import { HexColorPicker } from "react-colorful"
import { useAtom } from "jotai"
import { textColorAtom } from "context/AtomConfigs"

type ColorPickerButtonProperties = {
  open: boolean
  anchorElement: HTMLElement | undefined
  onClose: () => void
}

const ColorPickerPopover = ({
  open,
  anchorElement,
  onClose,
}: ColorPickerButtonProperties) => {
  const [color, setColor] = useAtom(textColorAtom)

  return (
    <Popover
      open={open}
      anchorEl={anchorElement}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}>
      <HexColorPicker color={color} onChange={setColor} />
    </Popover>
  )
}

export default ColorPickerPopover
