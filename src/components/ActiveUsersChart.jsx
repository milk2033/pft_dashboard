// MyComponent.jsx
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function MyComponent() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const startDate = new Date("2024-04-26");

        fetch("/pft_daily_active.csv")
            .then((response) => response.text())
            .then((text) => {
                const rows = text.trim().split("\n").slice(1); // skip header
                const parsed = rows.map((row) => {
                    const [day, users] = row.split(",");
                    const date = new Date(startDate);
                    date.setDate(startDate.getDate() + parseInt(day));
                    return {
                        date: date.toLocaleDateString("en-US"), // e.g., "4/26/2024"
                        users: parseInt(users),
                    };
                });
                setData(parsed);
            });
    }, []);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const date = new Date(label).toLocaleDateString("en-US", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
            });

            return (
                <div style={{
                    backgroundColor: "black",
                    border: "1px solid #ccc",
                    padding: "8px",
                    fontSize: "14px"
                }}>
                    <p>{`users: ${payload[0].value}`}</p>
                    <p>{date}</p>
                </div>
            );
        }

        return null;
    };



    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Daily Active PFT Users</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="users" stroke="#8884d8" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default MyComponent;
