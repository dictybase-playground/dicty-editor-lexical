## Prerequisites

We must import TablePlugin from `@lexical/react/LexicalTablePlugin` and add it as a child of LexicalComposer. We must also import the nodes TableNode, TableCellNode, and TableRowNode from `@lexical/table`

## Creating a Lexical Table

A table can be creating by calling `editor.dispatchCommand(INSERT_TABLE_COMMAND, { rows: _, columns: _ })`.

## Table Headers

The top row of cells will serve as the header cells for the table.

By default, Lexical Table Plugin's creates tables with the first row and the first column as headers, to achieve our desired table, we could register a command

## Table Width

Table width changes depending on # of columns.

Potential Approaches:

## Row Restriction

A table must have >= 2 rows. This can be controlled using MUI's Textfield validation.

## Table Layout - Fixed

There are two different layout algorithms that may determine a table's column widths: `automatic` and `fixed`

The main difference is that when using `table-layout: auto`, if not explicitly set, the width of the columns will change depending on their contents, whereas when using `table-layout: fixed`, the columns will retain a fixed width. The fixed table layout only applies when the width of the table itself is set. Otherwise if there is no width property on the table element, then the layout behavior will use the automatic table layout.

For the table that we use in this editor, we will set `table-layout: fixed`.

The main reason for this is because since we will be implementing a drag controller for the table's dimensions, we should leave the layout solely in the user's control. A second reason is presented at the end of this document.

## Features

### Alignment

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
