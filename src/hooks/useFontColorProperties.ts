import { useCallback } from "react"
import { useUpdateAtom } from "jotai/utils"
import { $getSelection, $isRangeSelection } from "lexical"
import { $getSelectionStyleValueForProperty } from "@lexical/selection"
import { fontColorAtom } from "context/AtomConfigs"

const useTextColorProperties = () => {
  const setTextColor = useUpdateAtom(fontColorAtom)

  return useCallback(() => {
    const selection = $getSelection()
    if (!$isRangeSelection(selection)) return
    setTextColor(
      $getSelectionStyleValueForProperty(selection, "color", "#000000"),
    )
  }, [setTextColor])
}

export default useTextColorProperties
