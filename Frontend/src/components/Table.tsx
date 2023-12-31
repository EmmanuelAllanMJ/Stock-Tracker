"use client"
import { FC, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import StockAreaChart from './Chart';

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



const Table: FC<TableProps> = ({ }) => {
    const [all_stocks, setAllStocks] = useState<Stock[]>([]);
    const getHandler = async() => {
    const stocks = await fetch('http://127.0.0.1:8000/stocks',{ cache: 'no-store' })
        .then(response => response.json())
        .then(data => {
            console.log("Number of stocks",data.length);
            return data;
        })
        .catch(error => {
            console.error(error);
            // toast.error('Something went wrong!')
        }) 
    setAllStocks(stocks);
    }

    return (
        <>
        <button className="btn btn-outline" onClick={getHandler}>Get All</button>

        <StockAreaChart all_stock={all_stocks}/>
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
        </>
    )
}

export default Table