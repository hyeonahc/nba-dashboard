import { useState } from "react"
import { ComingSoon, Footer, HomePage, Navigation } from "./components"

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard")

  // Helper function to get display name for each page
  const getPageDisplayName = (page: string): string => {
    const pageNames: { [key: string]: string } = {
      dashboard: "Dashboard",
      games: "Games",
      teams: "Teams",
      players: "Players",
      statistics: "Statistics",
    }
    return pageNames[page] || page.charAt(0).toUpperCase() + page.slice(1)
  }

  const handleNavigateHome = () => {
    setCurrentPage("dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />

      <main>
        {currentPage === "dashboard" ? (
          <HomePage />
        ) : (
          <ComingSoon
            pageName={getPageDisplayName(currentPage)}
            onNavigateHome={handleNavigateHome}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
