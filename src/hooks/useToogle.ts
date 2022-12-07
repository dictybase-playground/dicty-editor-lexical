import { useCallback, useState, Dispatch, SetStateAction } from "react"

const useToggle = (
  initialState?: boolean,
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
  const [value, setValue] = useState(!!initialState)
  const toggle = useCallback(() => setValue((x) => !x), [])
  return [value, toggle, setValue]
}

export default useToggle
