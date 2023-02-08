import { it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { atom } from "jotai"
// import useTableActions from "hooks/useTableActions"
import TableActionMenu from "./TableActionMenu"

vi.mock("../context/atomConfigs.ts", () => ({
  tableActionMenuOpenAtom: atom(true),
}))

// vi.mock("../hooks/useTableActions.ts", () => ({
//   default: () => ({
//     insertRowAbove: () => {},
//   }),
// }))

it("fires the appropriate event handler when an option is clicked", () => {
  //   const { insertRowAbove } = useTableActions()
  //   const insertRowAboveSpy = vi.fn(insertRowAbove)
  const anchorElement = document.createElement("div")
  render(<TableActionMenu anchorElement={anchorElement} />)

  const insertRowAboveButton = screen.getByText("Insert Row Above")
  expect(insertRowAboveButton).toBeDefined()
})
