import { useUpdateAtom } from "jotai/utils"
import {
  isBoldAtom,
  isItalicAtom,
  isUnderlinedAtom,
  fontSizeAtom,
  fontFamilyAtom,
  FontFamily,
} from "context/AtomConfigs"
import { useCallback } from "react"
import { $getSelection, $isRangeSelection } from "lexical"
import { $getSelectionStyleValueForProperty } from "@lexical/selection"

const useFontProperties = () => {
  const setIsBold = useUpdateAtom(isBoldAtom)
  const setIsItalic = useUpdateAtom(isItalicAtom)
  const setIsUnderlined = useUpdateAtom(isUnderlinedAtom)
  const setFontSize = useUpdateAtom(fontSizeAtom)
  const setFontFamily = useUpdateAtom(fontFamilyAtom)
  return useCallback(() => {
    const selection = $getSelection()
    if (!$isRangeSelection(selection)) return
    setIsBold(selection.hasFormat("bold"))
    setIsItalic(selection.hasFormat("italic"))
    setIsUnderlined(selection.hasFormat("underline"))
    setFontSize(
      $getSelectionStyleValueForProperty(selection, "font-size", "15px"),
    )
    setFontFamily(
      $getSelectionStyleValueForProperty(
        selection,
        "font-family",
        "Arial",
      ) as FontFamily,
    )
  }, [setIsBold, setIsItalic, setIsUnderlined, setFontSize, setFontFamily])
}

export default useFontProperties
