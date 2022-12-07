import { useCallback, useState } from "react"

const useToggle = (initialState?: boolean) => {
  const [value, setValue] = useState(!!initialState)
  const toggle = useCallback(() => setValue((x) => !x), [])
  return [value, toggle]
}

export default useToggle
