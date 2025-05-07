import React, { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

function CirculatingSupplyChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const startDate = new Date("2024-04-26");

        fetch("/pft_circulating_supply.csv")
            .then((response) => response.text())
            .then((text) => {
                const rows = text.trim().split("\n");
                const parsed = rows.map((row) => {
                    const [day, supply] = row.split(",");
                    const date = new Date(startDate);
                    date.setDate(startDate.getDate() + parseInt(day));
                    return {
                        date: date.toLocaleDateString("en-US"),
                        supply: parseFloat(supply),
                    };
                });
                setData(parsed);
            });
    }, []);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    backgroundColor: "black",
                    color: "white",
                    border: "1px solid #ccc",
                    padding: "8px",
                    fontSize: "14px"
                }}>
                    <p>{`supply: ${payload[0].value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}</p>
                    <p>{label}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Circulating Supply</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="supply" stroke="#8884d8" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default CirculatingSupplyChart;
