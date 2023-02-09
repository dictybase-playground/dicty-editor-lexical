import { Button } from "@material-ui/core"
import { useSetAtom } from "jotai"
import { fontColorAtom } from "context/AtomConfigs"
import useColorOptionButtonStyles from "hooks/useColorOptionButtonStyles"
import applyStyleText from "utils/textStyles"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

type ColorOptionButtonProperties = {
  color: string
}

const ColorOptionButton = ({ color }: ColorOptionButtonProperties) => {
  const [editor] = useLexicalComposerContext()
  const setColor = useSetAtom(fontColorAtom)
  const setFontColor = () => {
    setColor(color)
    applyStyleText(editor, { color })
  }
  const { root } = useColorOptionButtonStyles({ color })
  return <Button className={root} onClick={setFontColor} />
}

export default ColorOptionButton
