import useResizerStyles from "hooks/useResizerStyles"
import { Direction, useResize } from "hooks/useResize"

const directions: Direction[] = [
  "north",
  "south",
  "east",
  "west",
  "ne",
  "nw",
  "se",
  "sw",
]

export type ImageResizerProperties = {
  imageContainer: HTMLDivElement
  handleResize: (width: number, height: number) => void
  handleResizeStart?: () => void
  handleResizeEnd?: () => void
}

/**
 * Renders draggable handles that can be used to resize their parent element.
 *
 * @param handleResize a callback function used to set the new dimensions of the parent element.
 * @param imageContainer a reference to the parent container
 */
const ImageResizer = ({
  handleResizeStart,
  handleResize,
  handleResizeEnd,
  imageContainer,
}: ImageResizerProperties) => {
  const classes = useResizerStyles()
  const { onMouseDown } = useResize(imageContainer, {
    handleResizeStart,
    handleResize,
    handleResizeEnd,
  })
  return (
    <>
      {directions.map((direction) => (
        <div
          key={direction}
          className={`${classes.root} ${classes[direction]}`}
          onMouseDown={(event) => onMouseDown(event, direction)}
        />
      ))}
    </>
  )
}

export default ImageResizer
