
---

# Pinterest Clone

This project is a clone of Pinterest, built to replicate its core functionality such as image pinning, user authentication, and content management. It uses a modern tech stack to deliver a responsive and efficient user experience.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication using **Google API (OAuth 2)**
- Create, pin, and manage images with **Sanity.io**
- Search and filter pins efficiently using **GraphQL**
- Responsive design using **TailwindCSS**
- Fast development and build speeds with **Vite.js**

## Tech Stack
- **React.js**: Frontend framework for building a dynamic user interface
- **TailwindCSS**: Utility-first CSS framework for responsive design
- **Sanity.io**: Headless CMS for managing pins and content
- **GraphQL**: Query language for efficient data fetching
- **Google API (OAuth 2)**: For secure and seamless user authentication
- **Vite.js**: Modern build tool for lightning-fast development

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/abiel13/client.git
   ```
2. Navigate to the project directory:
   ```bash
   cd pinterest-clone
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Set up your **Sanity.io** project:
   - Create a new project on [Sanity.io](https://www.sanity.io/).
   - Connect your Sanity project by adding your credentials to the environment variables.

5. Set up Google OAuth credentials:
   - Create an OAuth 2.0 client ID from the [Google Developer Console](https://console.developers.google.com/).
   - Add your credentials to the environment variables.

6. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

Once the development server is running, open your browser and navigate to:
```
http://localhost:3000
```

You can now register or log in using Google OAuth, pin images, and manage your content.

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request with your improvements or suggestions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

