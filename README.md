# Azka's Personal Portfolio 🚀

Hello everyone! 👋
Welcome to the personal portfolio repository of **Muhammad Ammar Luthfi Azzufar** (Azka). 
This project is a modern, responsive, and high-performance Web Portfolio showcasing my skills, projects, certificates, and professional documents.

## 🛠️ Tech Stack

This project is built using modern web technologies:

- **ReactJS** - Frontend JavaScript library
- **Vite** - Next Generation Frontend Tooling
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **AOS** - Animate On Scroll library for smooth entry animations
- **Material UI** - React component library for interactive elements (Tabs, AppBars)
- **Lucide React** - Beautiful and consistent icon library
- **SweetAlert2** - Elegant and customizable alert dialogs (Glassmorphism styled)
- **FormSubmit** - Serverless form submission handling for the Contact section

## 📋 Prerequisites

Before running this project, ensure you have the following installed on your local machine:

- **Node.js** (version 16.x or higher recommended)
- **npm** or **yarn** package manager

## 🏃‍♂️ Getting Started

Follow these simple steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
cd YOUR_REPOSITORY_NAME
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

### 4. Open in Browser

Access the application through the link displayed in your terminal (usually `http://localhost:5173`).

## 🏗️ Building for Production (Vercel Ready)

To create a production-ready build for deployment:

1. Run the build command:

   ```bash
   npm run build
   ```

2. The build files will be saved in the `dist` folder. 
3. **Deploying to Vercel**: Simply connect this repository to your Vercel account. Vercel will automatically detect the Vite environment, run `npm install` and `npm run build`, and host your site seamlessly.

## 📧 Contact Form Setup

The contact form is fully functional without the need for a backend database. It uses **FormSubmit.co**.
If you wish to change the receiving email address, simply modify the `formSubmitUrl` variable inside `src/Pages/Contact.jsx` to your own email. 

*Note: The first time a message is sent to a new email address, FormSubmit will send an activation link to that email. You must click it to allow future messages to pass through.*

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---
⭐ Don't forget to give this project a star on GitHub!
