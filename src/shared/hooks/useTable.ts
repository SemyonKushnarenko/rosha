import { useCallback, useState } from "react";
import timer from "../utils/timer";
import { ModeEnum } from "../constants/modes";
import { IRow } from "../components/Table/table.interface";

export default function useTable(mode: `${ModeEnum}`) {
    const randomCols = 5;
    const randomRows = 5;
    const delay = 1500;
    const [cols, setCols] = useState<number[]>([]);
    const [table, setTable] = useState<IRow[]>([]);
    const [newTable, setNewTable] = useState<IRow[]>([]);
    const [lastRowId, setLastRowId] = useState<number>(0); 
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onToggleWorked = (rowId: number, colIndex: number) => {
        if (mode !== ModeEnum.edit) return

        setNewTable((prevTable) => {
            const newTable = prevTable.map(rowInfo => {
                if (rowInfo.rowId === rowId) {
                    const updatedRow = [...rowInfo.row];
                    updatedRow[colIndex] = !updatedRow[colIndex];
                    return { ...rowInfo, row: updatedRow };
                }
                return rowInfo;
            });
            return newTable;
        });
    }

    const asyncSetColumns = useCallback(async () => {
        setIsLoading(true);
        await timer(delay);
        setCols(() => {
            return new Array(Math.ceil(Math.random() * (randomCols - 1) + 1)).fill(1).map((_, id) => id + 1)
        });
    }, []);

    const asyncSetTable = useCallback(async (numberOfCols: number) => {
        if (!numberOfCols) {
            return;
        }
        await timer(delay);
        setTable(() => {
            const table = new Array(Math.ceil(Math.random() * (randomRows - 1) + 1)).fill(null).map((_, index) => {
                const row = [];
                for (let index = 0; index < numberOfCols; index++) {
                    row.push(Math.random() > 0.5)
                }
                return {rowId: index + 1, row};
            })

            setLastRowId(table.length);

            setNewTable(table);

            return table;
        });

        setIsLoading(false);
    }, []);

    const saveTable = () => {
        setTable(newTable)
    }

    const getBack = () => {
        setNewTable(table)
    }

    const addRow = () => {
        setNewTable([
            ...newTable,
            {
                rowId: lastRowId + 1,
                row: new Array(cols.length).fill(false)
            }
        ])
        setLastRowId(lastRowId + 1)
    }

    const removeRow = (rowId: number) => {
        const tableWithoutRow = newTable.filter(row => row.rowId !== rowId)

        setNewTable(tableWithoutRow)
    }

    return {
        cols,
        table,
        asyncSetColumns,
        asyncSetTable,
        onToggleWorked,
        isLoading,
        newTable,
        saveTable,
        getBack,
        addRow,
        removeRow,
    }
}