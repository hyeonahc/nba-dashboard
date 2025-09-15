import { Play } from "lucide-react"
import { useTrendingVideosWithCache } from "../../hooks/video/useTrendingVideosWithCache"
import Card from "../ui/Card"
import SectionHeader from "../ui/SectionHeader"

const TrendingVideos = () => {
  const { data: videos = [], isLoading, error } = useTrendingVideosWithCache()
  return (
    <Card>
      <SectionHeader
        icon={<Play className="h-5 w-5 text-orange-500 mr-2" />}
        title="Trending Videos"
      />

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Loading videos...</p>
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
                Failed to load videos
              </h3>
              <p className="text-sm text-red-700 mt-1">
                {error.message ||
                  "Unable to fetch YouTube videos. Please try again later."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Videos List */}
      {!isLoading && !error && videos.length > 0 && (
        <div className="space-y-4">
          {videos.map(video => (
            <div
              key={video.id}
              className="hover:bg-gray-50 rounded-lg transition-colors cursor-pointer p-3"
              onClick={() => {
                // Open YouTube video in new tab
                window.open(
                  `https://www.youtube.com/watch?v=${video.id}`,
                  "_blank",
                  "noopener,noreferrer"
                )
              }}
            >
              <div className="flex items-start space-x-3">
                {/* Thumbnail */}
                <div className="w-16 h-12 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                  {video.thumbnail.startsWith("http") ? (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">
                      {video.thumbnail}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
                    {video.title}
                  </h3>
                  {video.channelTitle && (
                    <p className="text-xs text-gray-500">
                      {video.channelTitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && videos.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">No videos available</p>
        </div>
      )}
    </Card>
  )
}

export default TrendingVideos
