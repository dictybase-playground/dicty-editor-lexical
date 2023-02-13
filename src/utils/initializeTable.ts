import {
  TableNode,
  $isTableNode,
  applyTableHandlers,
  HTMLTableElementWithWithTableSelectionState,
  TableSelection,
} from "@lexical/table"
import { $getNodeByKey, NodeMutation, LexicalEditor } from "lexical"
import { pipe, A, G } from "@mobily/ts-belt"

const isCreated = ([, mutation]: [string, NodeMutation]) =>
  mutation === "created"

const isDestroyed = ([, mutation]: [string, NodeMutation]) =>
  mutation === "destroyed"

const getTableSelection =
  (tableSelections: Map<string, TableSelection>) =>
  ([nodeKey]: [string, NodeMutation]): [string, TableSelection | undefined] =>
    [nodeKey, tableSelections.get(nodeKey)]

const cleanUp =
  (tableSelections: Map<string, TableSelection>) =>
  ([nodeKey, tableSelection]: [string, TableSelection | undefined]) => {
    if (!tableSelection) return
    tableSelection.removeListeners()
    tableSelections.delete(nodeKey)
  }

export const getInitializationFunction =
  (tableSelections: Map<string, TableSelection>, editor: LexicalEditor) =>
  (tableNode: TableNode) => {
    const nodeKey = tableNode.getKey()
    const tableElement = editor.getElementByKey(
      nodeKey,
    ) as HTMLTableElementWithWithTableSelectionState

    if (tableElement && !tableSelections.has(nodeKey)) {
      const tableSelection = applyTableHandlers(tableNode, tableElement, editor)
      tableSelections.set(nodeKey, tableSelection)
    }
  }

export const getMutationHandler =
  (tableSelections: Map<string, TableSelection>, editor: LexicalEditor) =>
  (nodeMutations: Map<string, NodeMutation>) => {
    const getNode = (nodeKey: string) =>
      editor.getEditorState().read(() => $getNodeByKey(nodeKey))

    pipe(
      [...nodeMutations],
      A.filter(isCreated),
      A.map(A.head),
      A.filter(G.isString),
      A.map(getNode),
      A.filter($isTableNode),
      A.tap(getInitializationFunction(tableSelections, editor)),
    )

    pipe(
      [...nodeMutations],
      A.filter(isDestroyed),
      A.map(getTableSelection(tableSelections)),
      A.tap(cleanUp(tableSelections)),
    )
  }
