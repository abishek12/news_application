import News from "./components/News";
import NewsTop from "./components/NewsTop";
import Trending from "./components/Trending";
import Sports from "./components/Sports";

// https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&apiKey=1ab7b5da78d9442ab0abe5ebdddaebc3&pageSize=100
export default async function Home() {
  const res = await fetch("http://localhost:3000/api");
  const data = await res.json();
  const trendingNews = data.filter((item) => item.tags?.includes("trending"));
  const sportsNews = data.filter((item) => item.tags?.includes("sports"));

  return (
    <>
      <div className="bg-[#E9E7E8]">
        <News data={data} />
        <NewsTop data={data} />
        <Trending data={trendingNews} />
        <Sports data={sportsNews} />
      </div>
    </>
  );
}
