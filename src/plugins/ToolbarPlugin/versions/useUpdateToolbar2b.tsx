import { useUpdateAtom } from "jotai/utils"
import { isBoldAtom, isItalicAtom } from "context/AtomConfigs"
import { useCallback } from "react"
import { $getSelection, $isRangeSelection } from "lexical"

const useUpdateToolbar = () => {
  const setIsBold = useUpdateAtom(isBoldAtom)
  const setIsItalic = useUpdateAtom(isItalicAtom)
  return useCallback(() => {
    const selection = $getSelection()

    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"))
      setIsItalic(selection.hasFormat("italic"))
    }
  }, [setIsBold, setIsItalic])
}

export default useUpdateToolbar
