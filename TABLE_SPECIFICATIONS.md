## Prerequisites

We must import TablePlugin from `@lexical/react/LexicalTablePlugin` and add it as a child of LexicalComposer. We must also import the nodes TableNode, TableCellNode, and TableRowNode from `@lexical/table`

## Creating a Lexical Table

A table can be creating by calling `editor.dispatchCommand(INSERT_TABLE_COMMAND, { rows: _, columns: _ })`.

From the user perspective,

## Initial Table Width

Initially, the table width will be set to 100% of its container size. This property will be set in `editor.css` under the selector `.editor-table`

The user will be able to drag the borders of the table to resize it, applying a style attribute to the element with the appropriate width.

## Table Layout - Fixed

There are two different layout algorithms that may determine a table's column widths: `automatic` and `fixed`

The main difference is that when using `table-layout: auto`, if not explicitly set, the width of the columns will change depending on their contents, whereas when using `table-layout: fixed`, the columns will retain a fixed width. The fixed table layout only applies when the width of the table itself is set. Otherwise if there is no width property on the table element, then the layout behavior will use the automatic table layout.

For the table that we use in this editor, we will set `table-layout: fixed`.

The main reason for this is because since we will be implementing a drag controller for the table's dimensions, we should leave the layout solely in the user's control. A second reason is presented at the end of this document.

## Features

### Resizing

What happens if a columns size is constrained, there are multiple lines of text in a cell of that column, and the user attempts to resize that cell's row to be smaller than the minimum content height?

    Overflow?
    Not allowed?
    Allowed but let that conflict be resolved by the table's own internal algorithm? What would it do? --> Use the height of the contents

### Text Wrapping

### Adding/Deleting Columns and Rows

## Notes on table-layout

Another reason for choosing `table-layout: fixed` over `table-layout: auto`: If the entire table element is given a fixed width, whether bounded by its container or given a width property with a specific value, AND `table-layout: auto`, the size of a cell in a column grows excessively relative to the size of the contents, for lack of a better description.

### Empty 1x3 Table with Specific Width & Empty Cells

    +-----------------------------------------------+
    |               |               |               |
    |<-equal space->|<-equal space->|<-equal space->|
    |               |               |               |
    +-----------------------------------------------+

### 1x3 Table with Some Content in One Cell

    +-----------------------------------------------+
    |                               |       |       |
    | cat <------empty space------->|       |       |
    |                               |       |       |
    +-----------------------------------------------+

https://www.w3.org/TR/CSS2/tables.html#tables-intro
