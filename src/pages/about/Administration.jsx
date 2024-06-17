import React from "react";
import Layout from "../../Layout";
import "./About.css";

function DeveloperPage() {
  const developers = [
    {
      name: "Developer 1",
      role: "Frontend Developer",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dmale%2Bdeveloper&psig=AOvVaw0_9nmCm39M2qWqsxg_WDAf&ust=1718727503724000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMi7xYSF44YDFQAAAAAdAAAAABAE",
    },
    {
      name: "Developer 2",
      role: "Backend Developer",
      bio: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dmale%2Bdeveloper&psig=AOvVaw0_9nmCm39M2qWqsxg_WDAf&ust=1718727503724000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMi7xYSF44YDFQAAAAAdAAAAABAE",
    },
    {
      name: "Developer 3",
      role: "Full Stack Developer",
      bio: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dmale%2Bdeveloper&psig=AOvVaw0_9nmCm39M2qWqsxg_WDAf&ust=1718727503724000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMi7xYSF44YDFQAAAAAdAAAAABAE",
    },
    {
      name: "Developer 4",
      role: "UI/UX Designer",
      bio: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dmale%2Bdeveloper&psig=AOvVaw0_9nmCm39M2qWqsxg_WDAf&ust=1718727503724000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMi7xYSF44YDFQAAAAAdAAAAABAE",
    },
    {
      name: "Developer 5",
      role: "DevOps Engineer",
      bio: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dmale%2Bdeveloper&psig=AOvVaw0_9nmCm39M2qWqsxg_WDAf&ust=1718727503724000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMi7xYSF44YDFQAAAAAdAAAAABAE",
    },
  ];

  return (
    <Layout>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Meet the Developers of Asteria Academy - SIS</h1>
        <div className="row">
          {developers.map((developer, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                <img src={developer.image} alt={developer.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{developer.name}</h5>
                  <p className="card-text">{developer.role}</p>
                  <p className="card-text">{developer.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default DeveloperPage;
