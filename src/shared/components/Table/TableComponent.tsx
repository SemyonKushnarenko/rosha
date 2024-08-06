import { FC, useEffect } from "react"
import './index.css'
import Loader from "../Loader/Loader";
import { ITableProps } from "./table.interface";
import { ModeEnum } from "../../constants/modes";

const TableComponent: FC<ITableProps> = ({
        cols,
        table,
        asyncSetColumns,
        asyncSetTable,
        onToggleWorked,
        isLoading,
        newTable, 
        mode,
        addRow,
        removeRow,
    }) => {

    useEffect(() => {
        asyncSetColumns();
    }, [asyncSetColumns]);

    useEffect(() => {
        asyncSetTable(cols.length);
    }, [cols, asyncSetTable]);

    return (
        <table className="rosha-table">
            <thead>
                <tr>
                    <th className="rosha-cell"></th>
                    {cols.map((num) => (<th className="rosha-cell" key={num}>{'Заказ ' + num}</th>))}
                </tr>
            </thead>
            <tbody>
                {isLoading ? (
                    <tr>
                        <td className="rosha-cell" colSpan={101}>{<Loader />}</td>
                    </tr>
                ) : (mode === ModeEnum.edit ? newTable : table).map(({rowId, row}) => (
                    <tr key={rowId}>
                        <td className="rosha-cell">{'Обработка' + rowId}</td>
                        {row.map((item, index) => (
                            <td 
                                className={`rosha-cell${item ? ' rosha-cell_filled' : ''}${mode === ModeEnum.edit ? ' rosha-cell_editable' : ''}`}
                                key={index}
                                onClick={() => onToggleWorked(rowId, index)}
                            ></td>
                        ))}
                        {mode === ModeEnum.edit && <td
                         className='rosha-cell rosha-cell_action'
                         onClick={() => removeRow(rowId)}
                     >-</td>}
                    </tr>
                ))}
                {mode === ModeEnum.edit && <tr><td className="rosha-cell rosha-cell_action" onClick={addRow} colSpan={101}>+</td></tr>}
            </tbody>
        </table>
    )
}

export default TableComponent;