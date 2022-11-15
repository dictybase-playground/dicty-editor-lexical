import { useCallback } from "react"
import useFontProperties from "./useFontProperties"
import useTextColorProperties from "./useTextColorProperties"

const useEditorProperties = () => {
  const updateFontProperties = useFontProperties()
  const updateTextColorProperties = useTextColorProperties()

  return useCallback(() => {
    updateFontProperties()
    updateTextColorProperties()
  }, [updateFontProperties, updateTextColorProperties])
}

export default useEditorProperties
