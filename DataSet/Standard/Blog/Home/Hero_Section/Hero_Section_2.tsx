import React from 'react';

interface HeroSectionProps {
  title?: string;
  description?: string;
  backgroundColor?: string;
  textColor?: string;
  linkColor?: string;
  cardBgColor?: string;
  cardTextColor?: string;
  authorName?: string;
  relatedArticles?: Array<{ title: string; href: string }>;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Welcome to My Blog",
  description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos atque facilis quis commodi hic optio, iure reiciendis consequuntur labore quam. Doloremque incidunt officia a nemo, cum ipsum qui atque, exercitationem ratione voluptates aliquam cumque recusandae quidem voluptate. Est, consectetur maiores cumque dolorem voluptas quasi libero quam mollitia quibusdam perferendis, commodi at? Rerum voluptates nulla ipsa quaerat laudantium a quos magnam sint corporis nemo provident aperiam nam eveniet dolores illo neque laborum saepe in modi dolor, ipsam, aut amet explicabo. Dicta qui, dolore iste aliquid recusandae cum quaerat et officia, accusantium reprehenderit porro itaque distinctio sequi? Vitae dolorem tempora vero odit minus placeat earum asperiores libero nesciunt ea eaque ratione quisquam rem, eius dolor nisi a sequi voluptatem voluptatibus, delectus nihil autem maxime. Minus quisquam molestiae dicta quis repellendus voluptatibus vero. Tempora ea, iusto voluptas unde omnis, laudantium voluptatum quos maiores inventore autem eveniet asperiores illum vero reprehenderit blanditiis distinctio reiciendis cum ipsam fuga magnam eos? Quidem magni nihil repellendus, repellat eligendi earum illo voluptatibus voluptas neque distinctio at facere ipsa ea quibusdam qui quod accusamus expedita tempore optio beatae, impedit totam rerum odio? Voluptates quis quibusdam hic, reiciendis suscipit odit repellat aut provident ipsum dolorem repellendus maiores quisquam, quo architecto illo consectetur cumque repudiandae? Eligendi quo expedita laudantium. Cupiditate consectetur tempore voluptatibus vitae ea tempora delectus distinctio. Omnis accusamus reiciendis nihil nam cum quasi aliquid, ipsum assumenda quia autem excepturi laborum harum quis voluptate a mollitia, quas, rem maiores iusto praesentium quam! Vero laboriosam ratione laudantium esse? Minus magnam corporis distinctio sed! Quaerat, illum esse excepturi illo voluptates, error quibusdam maxime ipsa deserunt ab obcaecati aliquid asperiores eum cum. Quibusdam repellendus, ipsa ullam nam earum, doloribus aspernatur necessitatibus enim iste totam deserunt hic quisquam fuga adipisci, repellat maiores consectetur assumenda? Eum illum et exercitationem quas voluptatibus architecto corporis doloribus ducimus rem voluptates provident quae autem eos error alias repudiandae quis molestias, dolorum sed temporibus? Facere maiores, fuga deleniti nisi perferendis ipsam architecto, ducimus sed delectus voluptatibus soluta vel officiis, voluptatum quidem. Voluptates minima veritatis laudantium nesciunt harum temporibus. Nobis, at? Eum nobis sed, tenetur eaque quisquam, architecto omnis adipisci ex, quaerat atque cumque. Quisquam, pariatur aspernatur voluptatum maiores nulla eos debitis ducimus nam ad eveniet, dignissimos laboriosam sapiente modi atque blanditiis consectetur ex consequuntur? Perspiciatis exercitationem veniam ut quidem dolorum esse maiores corporis, animi voluptatibus neque recusandae, quos, illo commodi omnis ipsa sapiente corrupti aliquid nostrum facilis eius quam! Impedit harum veritatis possimus dolores obcaecati delectus laudantium iusto mollitia, magnam accusantium sequi natus similique quasi? Esse, assumenda, recusandae libero quo aliquam optio dolor reprehenderit nisi maiores eius quam ad ipsum cum aliquid, in et maxime quidem nulla possimus. Quo, culpa id eligendi aspernatur officia, vel hic dolorum dolor illo nostrum cum cupiditate quibusdam nihil dignissimos vitae non modi aliquid assumenda neque. Voluptatibus quasi non sequi, illum quis nesciunt hic quibusdam, voluptate saepe nostrum cum perferendis libero minima ea? Natus commodi quidem et excepturi provident eligendi libero delectus quas! Amet corrupti vel non laudantium eum necessitatibus modi ab labore adipisci blanditiis.",
  backgroundColor = "#FFFFFF", // White background
  textColor = "#1F2937", // Dark gray text
  linkColor = "#3B82F6", // Blue links
  cardBgColor = "#F9FAFB", // Light gray card background
  cardTextColor = "#1F2937", // Dark gray card text
  authorName = "Pranav Dubey", // Default author name
  relatedArticles = [] // Default empty related articles
}) => {
  return (
    <section
      className="flex flex-row justify-center p-8 md:p-12 rounded-lg shadow-sm mt-16"
      style={{ backgroundColor: backgroundColor, color: textColor }}
    >
      {/* Main Blog Content */}
      <div className="w-3/4 pr-8">
        <h1 className="text-5xl font-bold mb-2">{title}</h1>
        
        {/* Author */}
        <p className="text-lg font-semibold">{authorName}</p>
        <p className="text-sm text-gray-500 mb-4">Student CSE - 3rd Year</p>
        
        {/* Description */}
        <p className="text-lg max-w-4xl mb-8">{description}</p>
      </div>
      
      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="w-1/4 border-l-2 pl-8">
          <h2 className="text-2xl font-semibold mb-4">Related Articles</h2>
          <ul className="space-y-2">
            {relatedArticles.map((article, index) => (
              <li key={index}>
                <a
                  href={article.href}
                  className="text-lg font-medium"
                  style={{ color: linkColor }}
                >
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
