import { $isTextNode, RangeSelection } from "lexical"

const applyClassToSelection = (
  selection: RangeSelection,
  className: string,
) => {
  if (selection.isCollapsed()) {
    selection.toggleFormat(formatType) // When changing format, we should stop composition

    $setCompositionKey(null)
    return
  }

  const selectedNodes = selection.getNodes()
  const selectedTextNodes = []

  for (let i = 0; i < selectedNodes.length; i++) {
    if ($isTextNode(selectedNodes[i])) {
      selectedTextNodes.push(selectedNodes[i])
    }
  }

  const selectedTextNodesLength = selectedTextNodes.length

  if (selectedTextNodesLength === 0) {
    selection.toggleFormat(formatType) // When changing format, we should stop composition

    $setCompositionKey(null)
    return
  }

  const { anchor } = selection
  const { focus } = selection
  const isBackward = selection.isBackward()
  const startPoint = isBackward ? focus : anchor
  const endPoint = isBackward ? anchor : focus
  let firstIndex = 0
  let firstNode = selectedTextNodes[0]
  let startOffset = startPoint.type === "element" ? 0 : startPoint.offset // In case selection started at the end of text node use next text node

  if (
    startPoint.type === "text" &&
    startOffset === firstNode.getTextContentSize()
  ) {
    firstIndex = 1
    firstNode = selectedTextNodes[1]
    startOffset = 0
  }

  if (firstNode == null) {
    return
  }

  const firstNextFormat = firstNode.getFormatFlags(formatType, null)
  const lastIndex = selectedTextNodesLength - 1
  let lastNode = selectedTextNodes[lastIndex]
  const endOffset =
    endPoint.type === "text" ? endPoint.offset : lastNode.getTextContentSize() // Single node selected

  if (firstNode.is(lastNode)) {
    // No actual text is selected, so do nothing.
    if (startOffset === endOffset) {
      return
    } // The entire node is selected, so just format it

    if (startOffset === 0 && endOffset === firstNode.getTextContentSize()) {
      firstNode.setFormat(firstNextFormat)
    } else {
      // Node is partially selected, so split it into two nodes
      // add style the selected one.
      const splitNodes = firstNode.splitText(startOffset, endOffset)
      const replacement = startOffset === 0 ? splitNodes[0] : splitNodes[1]
      replacement.setFormat(firstNextFormat) // Update selection only if starts/ends on text node

      if (startPoint.type === "text") {
        startPoint.set(replacement.__key, 0, "text")
      }

      if (endPoint.type === "text") {
        endPoint.set(replacement.__key, endOffset - startOffset, "text")
      }
    }

    selection.format = firstNextFormat
    return
  } // Multiple nodes selected
  // The entire first node isn't selected, so split it

  if (startOffset !== 0) {
    ;[, firstNode] = firstNode.splitText(startOffset)
    startOffset = 0
  }

  firstNode.setFormat(firstNextFormat)
  const lastNextFormat = lastNode.getFormatFlags(formatType, firstNextFormat) // If the offset is 0, it means no actual characters are selected,
  // so we skip formatting the last node altogether.

  if (endOffset > 0) {
    if (endOffset !== lastNode.getTextContentSize()) {
      ;[lastNode] = lastNode.splitText(endOffset)
    }

    lastNode.setFormat(lastNextFormat)
  } // Process all text nodes in between

  for (let index = firstIndex + 1; index < lastIndex; index++) {
    const textNode = selectedTextNodes[index]

    if (!textNode.isToken()) {
      const nextFormat = textNode.getFormatFlags(formatType, lastNextFormat)
      textNode.setFormat(nextFormat)
    }
  } // Update selection only if starts/ends on text node

  if (startPoint.type === "text") {
    startPoint.set(firstNode.__key, startOffset, "text")
  }

  if (endPoint.type === "text") {
    endPoint.set(lastNode.__key, endOffset, "text")
  }

  selection.format = firstNextFormat | lastNextFormat
}

export default applyClassToSelection
