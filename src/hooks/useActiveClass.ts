import joinClasses from "utils/joinClasses"
import { useAtomValue } from "jotai"
import type { WritableAtom } from "jotai"
import type { SetStateAction } from "react"
import useButtonStyles from "hooks/useToolbarItemStyles"

const useActiveClass = (
  atomConfig: WritableAtom<boolean, SetStateAction<boolean>, void>,
) => {
  const active = useAtomValue(atomConfig)
  const classes = useButtonStyles()
  return active ? joinClasses(classes.root, classes.active) : classes.root
}

export default useActiveClass
