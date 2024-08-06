import { ModeEnum } from "../../constants/modes";

export interface IRow {
    rowId: number;
    row: boolean[];
}

export interface ITableProps {
    mode: `${ModeEnum}`
    cols: number[]
    table: IRow[]
    asyncSetColumns: () => void
    asyncSetTable: (length: number) => void
    onToggleWorked: (row: number, col: number) => void
    isLoading: boolean
    newTable: IRow[]
    addRow: () => void
    removeRow: (rowId: number) => void
}