import { useUpdateAtom } from "jotai/utils"
import { isBoldAtom } from "context/AtomConfigs"
import { useCallback } from "react"
import { $getSelection, $isRangeSelection } from "lexical"

const useUpdateToolbar = () => {
  const setIsBold = useUpdateAtom(isBoldAtom)
  return useCallback(() => {
    const selection = $getSelection()

    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"))
    }
  }, [setIsBold])
}

export default useUpdateToolbar
