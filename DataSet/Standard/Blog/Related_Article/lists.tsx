import React from "react";

const titles = [
  { img: "image1.jpg", title: "title 1", description: "Description 1", another_text: "More info" },
  { img: "image2.jpg", title: "title 2", description: "Description 2", another_text: "More info" },
  { img: "image3.jpg", title: "title 3", description: "Description 3", another_text: "More info" },
  { img: "image4.jpg", title: "title 4", description: "Description 4", another_text: "More info" },
  { img: "image5.jpg", title: "title 5", description: "Description 5", another_text: "More info" },
  { img: "image6.jpg", title: "title 6", description: "Description 6", another_text: "More info" },
  { img: "image7.jpg", title: "title 7", description: "Description 7", another_text: "More info" },
  { img: "image8.jpg", title: "title 8", description: "Description 8", another_text: "More info" },
  { img: "image9.jpg", title: "title 9", description: "Description 9", another_text: "More info" },
  { img: "image10.jpg", title: "title 10", description: "Description 10", another_text: "More info" },
  { img: "image11.jpg", title: "title 11", description: "Description 11", another_text: "More info" },
  { img: "image12.jpg", title: "title 12", description: "Description 12", another_text: "More info" },
  { img: "image13.jpg", title: "title 13", description: "Description 13", another_text: "More info" },
  { img: "image14.jpg", title: "title 14", description: "Description 14", another_text: "More info" },
  { img: "image15.jpg", title: "title 15", description: "Description 15", another_text: "More info" },
  { img: "image16.jpg", title: "title 16", description: "Description 16", another_text: "More info" },
];

const titleSection = () => {
  return (
    <div className="m-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {titles.map((title, index) => (
          <div className="col" key={index}>
            <div className="card h-full bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={title.img} className="w-full h-72 object-cover" alt={title.title} />
              <div className="p-6">
                <h5 className="text-2xl text-gray-700 font-bold mb-2">{title.title}</h5>
                <p className="text-gray-700 text-base">{title.description}</p>
              </div>
              <div className="px-6 py-4 bg-gray-100">
                <small className="text-gray-600">{title.another_text}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default titleSection;
