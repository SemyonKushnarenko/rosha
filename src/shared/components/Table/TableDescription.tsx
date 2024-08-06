import { FC } from "react";

const TableDescription: FC = () => {
    return (
        <div className="rosha-descr">
            <div className="rosha-descr-block">
                <div className="rosha-descr-color white"></div>
                <span> - true</span>
            </div>
            <div className="rosha-descr-block">
                <div className="rosha-descr-color"></div>
                <span> - false</span>
            </div>
        </div>
    )
}

export default TableDescription
