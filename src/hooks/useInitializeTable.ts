import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  TableNode,
  $isTableNode,
  applyTableHandlers,
  HTMLTableElementWithWithTableSelectionState,
  TableSelection,
} from "@lexical/table"
import { $nodesOfType, $getNodeByKey, NodeMutation } from "lexical"
import { pipe, A, G } from "@mobily/ts-belt"
import CustomTableNode from "nodes/CustomTableNode"

const useInitializeTable = () => {
  const [editor] = useLexicalComposerContext()
  useEffect(() => {
    const tableSelections = new Map<string, TableSelection>()

    const initializeTableNode = (tableNode: TableNode) => {
      const nodeKey = tableNode.getKey()
      const tableElement = editor.getElementByKey(
        nodeKey,
      ) as HTMLTableElementWithWithTableSelectionState

      if (tableElement && !tableSelections.has(nodeKey)) {
        const tableSelection = applyTableHandlers(
          tableNode,
          tableElement,
          editor,
        )
        tableSelections.set(nodeKey, tableSelection)
      }
    } // Plugins might be loaded _after_ initial content is set, hence existing table nodes
    // won't be initialized from mutation[create] listener. Instead doing it here,

    editor.getEditorState().read(() => {
      const tableNodes = $nodesOfType(TableNode)

      tableNodes.map((tableNode) => {
        initializeTableNode(tableNode)
        return tableNode
      })
    })

    const unregisterMutationListener = editor.registerMutationListener(
      CustomTableNode,
      (nodeMutations) => {
        const isCreated = ([, mutation]: [string, NodeMutation]) =>
          mutation === "created"
        const getNode = (nodeKey: string) =>
          editor.getEditorState().read(() => $getNodeByKey(nodeKey))

        pipe(
          [...nodeMutations],
          A.filter(isCreated),
          A.map(A.head),
          A.filter(G.isString),
          A.map(getNode),
          A.filter($isTableNode),
          A.tap(initializeTableNode),
        )
        const isDestroyed = ([, mutation]: [string, NodeMutation]) =>
          mutation === "destroyed"

        const getTableSelection = ([nodeKey]: [string, NodeMutation]): [
          string,
          TableSelection | undefined,
        ] => [nodeKey, tableSelections.get(nodeKey)]

        const cleanUp = ([nodeKey, tableSelection]: [
          string,
          TableSelection | undefined,
        ]) => {
          if (!tableSelection) return
          tableSelection.removeListeners()
          tableSelections.delete(nodeKey)
        }

        pipe(
          [...nodeMutations],
          A.filter(isDestroyed),
          A.map(getTableSelection),
          A.tap(cleanUp),
        )
      },
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
