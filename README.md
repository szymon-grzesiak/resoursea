# Resoursea - Share Your Knowledge

#
Whole documentation of this codebase available at: [https://deepwiki.com/szymon-grzesiak/resoursea](https://deepwiki.com/szymon-grzesiak/resoursea)
#

Resoursea is a versatile platform designed for knowledge sharing, allowing users to post content, engage in discussions, exchange ideas, find job opportunities, and earn recognition for their contributions.

## 🚀 Overview

The objective of the Resoursea app is to create a versatile platform for knowledge sharing, allowing users to post content, engage in discussions, and exchange ideas. The platform offers features such as customizable profiles, interactive forums, and the ability to earn badges for active participation. Additionally, Resoursea includes a job search function, enabling users to discover employment opportunities nearby. The scope of the project encompasses interface design, feature implementation, and the creation of an engaging user experience that encourages continuous learning and community involvement.

## 🎯 Problem Addressed

While numerous platforms facilitate online discussions and knowledge sharing, there is a lack of a unified, community-driven platform that combines these features with personalized user engagement and career opportunities. Existing forums often lack customization, and social networks do not adequately incentivize educational interactions. The proposed Resoursea platform addresses this gap by offering a customizable forum where users can share knowledge, engage in discussions, and earn recognition through badges. Additionally, unlike traditional forums, Resoursea integrates a job-finding feature, enabling users to discover employment opportunities related to their expertise. This combination of features fosters a more engaging, purpose-driven community experience.

## ✨ Key Features

Resoursea is designed to empower users to share knowledge and connect with a community of learners through a comprehensive set of tools.

* **🔒 Advanced Login System:** Powered by Clerk.js, ensuring secure and seamless user authentication.
* **🌍 Global Search Mechanism:** An advanced global search function to easily find relevant questions, posts, and discussions across the platform.
* **📚 Comprehensive Knowledge Sharing:** Dedicated sections such as Community, Collections, and Tags to organize and access valuable information.
* **💬 Question and Answer Interface:** Users can view, ask, and answer questions, fostering collaborative knowledge sharing. Includes filtering and sorting capabilities.
* **💼 Job Finder:** A 'Find Jobs' section where users can discover employment opportunities relevant to their interests and expertise.
* **🤖 AI-Generated Responses:** (Currently disabled) Integrated feature using the OpenAI API to allow users to generate AI-powered responses to posts, designed to enhance user interaction.
* **🎨 Customizable Appearance:** Users can personalize the platform’s interface for a comfortable and engaging environment, including theme adjustments (e.g., light/dark mode via `next-themes`).
* **🏷️ Tags and Popular Topics:** Supports the use of tags for content organization and easy navigation through popular topics.

## 🛠️ Tech Stack

* **Framework:** Next.js (v14)
* **Language:** TypeScript
* **Authentication:** Clerk.js (`@clerk/nextjs`)
* **Database:** MongoDB with Mongoose ODM
* **Styling:** Tailwind CSS, Radix UI, Headless UI, tailwindcss-animate
* **Rich Text Editor:** TinyMCE (`@tinymce/tinymce-react`)
* **Form Handling & Validation:** React Hook Form, Zod
* **API & Webhooks:** Svix (likely for Clerk webhooks)
* **AI Integration:** OpenAI API (for AI-generated responses)
* **UI Components & Utilities:** Heroicons, Lucide Icons, NextUI (Spinner), `html-react-parser`, PrismJS (syntax highlighting), `query-string`, Sonner (notifications), `class-variance-authority`, `clsx`, `tailwind-merge`, `next-themes`.
* **Linting/Formatting:** ESLint, Prettier

## 💡 Key Learnings & Achievements

This project involved several challenging yet rewarding aspects:

* **Advanced Authentication:** Mastered the implementation of robust authentication workflows with Clerk.js, including features like two-factor authentication.
* **AI Integration Management:** Gained significant experience in integrating and managing AI capabilities using OpenAI's API, focusing on functionality while being mindful of potential costs.
* **Global Search Optimization:** Enhanced skills in creating and optimizing a fast and accurate global search mechanism for large datasets.
* **Responsive UI/UX Design:** Improved proficiency in responsive and user-friendly UI design using Tailwind CSS, ensuring consistency across various devices and screen sizes.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more information.
---
Made with ❤️ by Szymon Grzesiak
