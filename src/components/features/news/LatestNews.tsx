import { Newspaper } from "lucide-react"
import { useLatestNews } from "../../../hooks/news/useLatestNews"
import {
  getEmptyStateMessage,
  getUserFriendlyErrorMessage,
} from "../../../utils/errorUtils"
import Card from "../../ui/Card"
import MediaCard from "../../ui/MediaCard"
import SectionHeader from "../../ui/SectionHeader"

const LatestNews = () => {
  const { data: articles = [], isLoading, error } = useLatestNews()

  // Display only 3 articles for better focus
  const displayArticles = articles.slice(0, 3)

  return (
    <Card>
      <SectionHeader
        icon={<Newspaper className="h-5 w-5 text-orange-500 mr-2" />}
        title="Latest News"
      />

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-orange-200 border-t-orange-500 mx-auto mb-3"></div>
            <p className="text-sm text-gray-600 font-medium">
              Loading latest news...
            </p>
            <p className="text-xs text-gray-400 mt-1">Fetching NBA headlines</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Unable to load news
              </h3>
              <p className="text-sm text-red-700 mt-1">
                {getUserFriendlyErrorMessage(error, "news")}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* News List */}
      {!isLoading && !error && displayArticles.length > 0 && (
        <div className="space-y-3">
          {displayArticles.map(article => (
            <MediaCard
              key={article.id}
              id={article.id}
              title={article.title}
              thumbnail={article.imageUrl}
              thumbnailFallback="📰"
              time={article.time}
              source={article.source}
              showHoverEffects={true}
              hoverStyle="news"
              onClick={() => {
                if (article.url) {
                  window.open(article.url, "_blank", "noopener,noreferrer")
                }
              }}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && displayArticles.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Newspaper className="h-8 w-8 text-orange-400" />
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            No news available
          </h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto">
            {getEmptyStateMessage("news")}
          </p>
        </div>
      )}
    </Card>
  )
}

export default LatestNews
