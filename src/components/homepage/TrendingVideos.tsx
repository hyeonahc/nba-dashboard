import { Play } from "lucide-react"
import { useTrendingVideosWithCache } from "../../hooks/video/useTrendingVideosWithCache"
import Card from "../ui/Card"
import MediaCard from "../ui/MediaCard"
import SectionHeader from "../ui/SectionHeader"

const TrendingVideos = () => {
  const { data: videos = [], isLoading, error } = useTrendingVideosWithCache()
  return (
    <Card>
      <SectionHeader
        icon={<Play className="h-5 w-5 text-orange-500 mr-2" />}
        title="NBA Videos"
      />

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-10 w-10 border-2 border-orange-200 mx-auto mb-3"></div>
              <div className="animate-spin rounded-full h-10 w-10 border-2 border-orange-500 border-t-transparent absolute top-0 left-1/2 transform -translate-x-1/2"></div>
            </div>
            <p className="text-sm text-gray-600 font-medium">
              Loading NBA videos...
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Fetching the latest NBA content
            </p>
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
        <div className="space-y-3">
          {videos.slice(0, 2).map(video => (
            <MediaCard
              key={video.id}
              id={video.id}
              title={video.title}
              thumbnail={
                video.thumbnail.startsWith("http") ? video.thumbnail : undefined
              }
              thumbnailFallback={video.thumbnail}
              publishedAt={video.publishedAt}
              source={video.channelTitle}
              showHoverEffects={true}
              onClick={() => {
                // Open YouTube video in new tab
                window.open(
                  `https://www.youtube.com/watch?v=${video.id}`,
                  "_blank",
                  "noopener,noreferrer"
                )
              }}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && videos.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="h-8 w-8 text-orange-400" />
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            No videos available
          </h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto">
            We're working on bringing you the latest NBA videos. Check back
            soon!
          </p>
        </div>
      )}
    </Card>
  )
}

export default TrendingVideos
