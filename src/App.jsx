import { useState } from 'react'

import './App.css'
import ActiveUsersChart from './components/ActiveUsersChart'
import DailyTransfersChart from './components/DailyTransfersChart'
import CirculatingSupplyChart from './components/CirculatingSupplyChart'
import TopBalancesTable from './components/BalancesBoard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      <h1>PFT Dashboard</h1>
      <ActiveUsersChart />
      <DailyTransfersChart />
      <CirculatingSupplyChart />
      <TopBalancesTable />
    </div>
  )
}

export default App
