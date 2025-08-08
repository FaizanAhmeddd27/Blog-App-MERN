import React from "react";
import { useAuth } from "../context/AuthProvider";

function About() {
  const { profile, loading } = useAuth(); // ✅ Correct hook usage

  if (loading) {
    return (
      <div className="container mx-auto p-6 text-center text-blue-600 font-medium">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto p-6 text-center text-red-500">
        No profile data available.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-10 max-w-4xl">
      <h1 className="text-3xl font-bold text-blue-700 mb-4 border-b-2 border-blue-300 pb-2">
        About {profile.name}
      </h1>

      <p className="text-lg leading-relaxed text-gray-700">
        Hi, I’m <strong className="text-blue-700">{profile.name}</strong>, a
        passionate full-stack developer dedicated to building modern, responsive,
        and high-performance web applications. I thrive on turning ideas into
        functional, user-friendly digital solutions and constantly push myself
        to learn emerging technologies.
      </p>

      <section>
        <h2 className="text-xl font-semibold text-blue-700 mb-2">
          Technical Expertise
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>
            <strong className="text-blue-600">Front-End:</strong> React.js, Next.js,
            Tailwind CSS, HTML5, CSS3, JavaScript (ES6+)
          </li>
          <li>
            <strong className="text-blue-600">Back-End:</strong> Node.js, Express.js,
            REST APIs, MongoDB, MySQL
          </li>
          <li>
            <strong className="text-blue-600">Tools & Platforms:</strong> Git, GitHub,
            Docker, AWS
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-blue-700 mb-2">
          Professional Highlights
        </h2>
        <p className="text-gray-700 leading-relaxed">
          I’ve successfully developed and deployed several full-stack projects,
          collaborating closely with cross-functional teams to meet tight
          deadlines without compromising quality. My problem-solving skills and
          adaptability allow me to work on diverse projects, from startups to
          enterprise applications.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-blue-700 mb-2">
          Beyond the Code
        </h2>
        <p className="text-gray-700 leading-relaxed">
          When I’m not coding, you can find me enjoying cricket matches, with
          <strong className="text-blue-600"> Virat Kohli</strong> being my
          all-time favorite player. His dedication and resilience inspire me to
          bring the same level of passion and focus into my work and life.
        </p>
      </section>
    </div>
  );
}

export default About;
