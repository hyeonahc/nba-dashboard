import { Newspaper } from "lucide-react"
import Card from "../ui/Card"
import MediaItem from "../ui/MediaItem"
import SectionHeader from "../ui/SectionHeader"

interface NewsArticle {
  id: number
  title: string
  summary: string
  time: string
  category: string
}

interface LatestNewsProps {
  articles: NewsArticle[]
}

const LatestNews = ({ articles }: LatestNewsProps) => {
  return (
    <Card>
      <SectionHeader
        icon={<Newspaper className="h-5 w-5 text-orange-500 mr-2" />}
        title="Latest News"
      />
      <div className="space-y-4">
        {articles.map(article => (
          <MediaItem
            key={article.id}
            title={article.title}
            subtitle={article.summary}
            category={article.category}
            time={article.time}
            className="border-b border-gray-200 pb-4 last:border-b-0"
          />
        ))}
      </div>
    </Card>
  )
}

export default LatestNews
