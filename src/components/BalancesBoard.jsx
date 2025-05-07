import React, { useState, useEffect } from 'react';

function TopBalancesTable() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch("/pft_balances.csv")
            .then((res) => res.text())
            .then((text) => {
                const lines = text.trim().split("\n");
                const entries = lines.slice(1).map((line) => {
                    const [address, balanceStr] = line.split(",");
                    return {
                        address: address,
                        balance: parseFloat(balanceStr),
                    };
                });

                const filtered = entries
                    .filter((e) => e.balance > 0)
                    .sort((a, b) => b.balance - a.balance)
                    .slice(0, 100);

                setRows(filtered);
            });
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Rich List</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="py-2 px-4 border-b">Address</th>
                        <th className="py-2 px-4 border-b">Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b font-mono text-sm">{row.address}</td>
                            <td className="py-2 px-4 border-b">{row.balance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TopBalancesTable;