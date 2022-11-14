import { useUpdateAtom } from "jotai/utils"
import {
  isBoldAtom,
  isItalicAtom,
  isUnderlinedAtom,
  fontSizeAtom,
} from "context/AtomConfigs"
import { useCallback } from "react"
import { $getSelection, $isRangeSelection } from "lexical"
import { $getSelectionStyleValueForProperty } from "@lexical/selection"

const useUpdateToolbar = () => {
  const setIsBold = useUpdateAtom(isBoldAtom)
  const setIsItalic = useUpdateAtom(isItalicAtom)
  const setIsUnderlined = useUpdateAtom(isUnderlinedAtom)
  const setFontSize = useUpdateAtom(fontSizeAtom)
  return useCallback(() => {
    const selection = $getSelection()
    if (!$isRangeSelection(selection)) return
    setIsBold(selection.hasFormat("bold"))
    setIsItalic(selection.hasFormat("italic"))
    setIsUnderlined(selection.hasFormat("underline"))
    setFontSize(
      $getSelectionStyleValueForProperty(selection, "font-size", "15px"),
    )
  }, [setIsBold, setIsItalic, setIsUnderlined, setFontSize])
}

export default useUpdateToolbar
