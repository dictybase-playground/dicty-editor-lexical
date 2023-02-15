import { test, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider } from "jotai"
import { tableActionMenuOpenAtom } from "context/AtomConfigs"
import { useInsertRow } from "hooks/useTableActions"
import TableActionMenu from "./TableActionMenu"

vi.mock("../hooks/useTableActions.ts", () => ({
  insertRowAbove: () => {},
}))

test.todo(
  "fires the appropriate event handler when an option is clicked",
  async () => {
    const { insertRowAbove } = useInsertRow()
    const insertRowAboveSpy = vi.fn(insertRowAbove)
    const anchorElement = document.createElement("div")

    render(
      <Provider initialValues={[[tableActionMenuOpenAtom, true]]}>
        <TableActionMenu anchorElement={anchorElement} isMenuOpen />
      </Provider>,
    )

    const insertRowAboveOption = screen.getByText("Insert Row Above")
    expect(insertRowAboveOption).toBeDefined()
    userEvent.click(insertRowAboveOption)
    expect(insertRowAboveSpy).toHaveBeenCalled()
  },
)
