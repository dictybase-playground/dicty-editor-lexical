import joinClasses from "utils/joinClasses"
import { useAtomValue } from "jotai"
import useToolbarItemStyles from "utils/ToolBarItemStyles"
import type { WritableAtom } from "jotai"
import type { SetStateAction } from "react"

const useActiveClass = (
  atomConfig: WritableAtom<boolean, SetStateAction<boolean>, void>,
) => {
  const active = useAtomValue(atomConfig)
  const classes = useToolbarItemStyles()
  return active ? joinClasses(classes.root, classes.active) : classes.root
}

export default useActiveClass
