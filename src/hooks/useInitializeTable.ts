import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { TableNode, TableSelection } from "@lexical/table"
import { $nodesOfType } from "lexical"
import { A } from "@mobily/ts-belt"
import CustomTableNode from "nodes/CustomTableNode"
import {
  getInitializationFunction,
  getMutationHandler,
} from "utils/initializeTable"

const useInitializeTable = () => {
  const [editor] = useLexicalComposerContext()
  useEffect(() => {
    const tableSelections = new Map<string, TableSelection>()

    // Plugins might be loaded _after_ initial content is set, hence existing table nodes
    // won't be initialized from mutation[create] listener. Instead doing it here,

    editor.getEditorState().read(() => {
      const tableNodes = $nodesOfType(TableNode)

      tableNodes.map((tableNode) => {
        getInitializationFunction(tableSelections, editor)(tableNode)
        return tableNode
      })
    })

    const unregisterMutationListener = editor.registerMutationListener(
      CustomTableNode,
      getMutationHandler(tableSelections, editor),
    )

    return () => {
      unregisterMutationListener() // Hook might be called multiple times so cleaning up tables listeners as well,
      // as it'll be reinitialized during recurring call
      A.tap([...tableSelections], ([, tableSelection]) => {
        tableSelection.removeListeners()
      })
    }
  }, [editor])
}

export default useInitializeTable
