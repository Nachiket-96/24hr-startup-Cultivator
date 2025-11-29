import { useState } from 'react'
import Dashboard from './components/Dashboard'
import Analytics from './components/Analytics'
import Monitoring from './components/Monitoring'
import Home from './components/Home'
import LogDetails from './components/LogDetails'
import DroneConnection from './components/DroneConnection'

function App() {
  const [activeTab, setActiveTab] = useState('Home')
  const [history, setHistory] = useState<string[]>([])

  const handleNavigate = (tab: string) => {
    if (tab !== activeTab) {
      setHistory(prev => [...prev, activeTab])
      setActiveTab(tab)
    }
  }

  const handleBack = () => {
    setHistory(prev => {
      const newHistory = [...prev]
      const lastTab = newHistory.pop()
      if (lastTab) {
        setActiveTab(lastTab)
      }
      return newHistory
    })
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {activeTab === 'Home' && <Home onNavigate={handleNavigate} activeTab={activeTab} />}
      {activeTab === 'LogDetails' && <LogDetails onNavigate={handleNavigate} activeTab={activeTab} />}
      {activeTab === 'DroneConnection' && <DroneConnection onNavigate={handleNavigate} activeTab={activeTab} />}
      {activeTab === 'Overview' && <Dashboard onNavigate={handleNavigate} activeTab={activeTab} onBack={handleBack} />}
      {activeTab === 'Analytics' && <Analytics onNavigate={handleNavigate} activeTab={activeTab} onBack={handleBack} />}
      {activeTab === 'Monitoring' && <Monitoring onNavigate={handleNavigate} activeTab={activeTab} onBack={handleBack} />}
    </div>
  )
}

export default App
