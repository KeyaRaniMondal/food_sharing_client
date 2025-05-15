import hiring from '../assets/h1.jpg';
import Kingston from '../assets/h2.jpg';
import kid from '../assets/h3.jpg';

const newsData = [
  {
    id: 1,
    image: hiring,
    title: "We are Hiring: Summer Fresh Food Depot Coordinator",
    excerpt: "",
    link: "https://www.foodsharingproject.org/2025/02/25/we-are-hiring-summer-fresh-food-depot-coordinator/",
  },
  {
    id: 2,
    image: Kingston,
    title: "City of Kingston declares a food insecurity emergency",
    excerpt:
      "City of Kingston declares a food insecurity emergency: Appeal from Chair Brenda Moore...",
    link: "https://www.foodsharingproject.org/2025/01/28/city-declares-food-insecurity-emergency/",
  },
  {
    id: 3,
    image: kid,
    title:
      "Food Sharing Project delighted with announcement of new National School Food Program",
    excerpt:
      "Federal government announcement of support for national school food program applauded by The Food Sharing Project...",
    link: "https://www.foodsharingproject.org/2024/04/08/the-food-sharing-project-delighted-with-announcement-of-new-national-school-food-program/",
  },
];

const NewsAndUpdates = () => {
  return (
    <section className="bg-gradient-to-br from-yellow-50 to-green-50 py-12 mt-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">📰 News & Updates</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {newsData.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{news.title}</h3>
                {news.excerpt && (
                  <p className="text-sm text-gray-600 mb-3">{news.excerpt}</p>
                )}
                <a href={news.link} className="text-teal-600 font-medium hover:underline">
                  READ MORE →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsAndUpdates;
