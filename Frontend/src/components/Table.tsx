import { FC, useEffect } from 'react'
import { toast } from 'react-hot-toast';

interface TableProps {

}

interface Stock {
    id: number,
    datetime: string,
    close: number,
    high: number,
    low: number,
    open: number,
    volume: number,
    instrument: string
}

const Table: FC<TableProps> = async({ }) => {

    const all_stocks = await fetch('http://127.0.0.1:8000/stocks')
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            return data;
        })
        .catch(error => {
            console.error(error);
            toast.error('Something went wrong!')
        })


    return (
        <div className="overflow-x-auto">
            <table className="table table-xs">
                <thead>
                    <tr>
                        <th></th>
                        <th>DateTime</th>
                        <th>Close</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Open</th>
                        <th>Volume</th>
                        <th>Instrument</th>
                    </tr>
                </thead>
                <tbody>
                   {all_stocks.map((stock: Stock) => {
                          return (
                            <tr key={stock.id}>
                             <td></td>
                             <td>{stock.datetime}</td>
                             <td>{stock.close}</td>
                             <td>{stock.high}</td>
                             <td>{stock.low}</td>
                             <td>{stock.open}</td>
                             <td>{stock.volume}</td>
                             <td>{stock.instrument}</td>
                            </tr>
                          )
                        })
                   }
                </tbody>
            </table>
        </div>
    )
}

export default Table