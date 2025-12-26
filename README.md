# 🎨 Portfolio_2026

A modern, high-performance personal portfolio designed for **Full Stack Developers** and **DevOps Engineers**. Built with a focus on clean aesthetics, responsive design, and professional infrastructure.

👉 **Live Demo:** [portfolio-2026-three-lac.vercel.app](https://portfolio-2026-three-lac.vercel.app)

---

## 🚀 Overview

This portfolio serves as a central hub for my professional identity. It highlights my journey from full-stack development to cloud infrastructure management. The site utilizes a utility-first CSS approach and an optimized build pipeline to ensure lightning-fast load times.

### ✨ Key Features
- 📱 **Fully Responsive:** Seamlessly optimized for mobile, tablet, and desktop using Tailwind breakpoints.
- ⚡ **Performance Optimized:** Powered by **Vite** for near-instant Hot Module Replacement (HMR) and lean production builds.
- 🎨 **Modern Design System:** Implements a custom soft pastel palette:
  - Background: `#FBFBFB`
  - Accents: `#E8F9FF` | `#C4D9FF` | `#C5BAFF`
- 📧 **Secure Contact Form:** Integrated with **EmailJS** to handle client-side inquiries securely without a dedicated backend.
- 🛠️ **DevOps Ready:** Built-in support for environment variables and automated CI/CD via **Vercel**.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | HTML5, JavaScript (ES6+) |
| **Styling** | Tailwind CSS, PostCSS |
| **Build Tool** | Vite |
| **Deployment** | Vercel |
| **Communication** | EmailJS |

---

## 📁 Project Structure

```text
Portfolio_2026/
├── public/                # Static assets (images, icons, resume PDF)
├── src/
│   ├── assets/            # Project-specific images & icons
│   ├── components/        # Reusable UI sections (Hero, Projects, Contact)
│   └── main.js            # Core logic and EmailJS integration
├── index.html             # Application entry point
├── tailwind.config.js     # Custom theme & color palette config
├── vite.config.js         # Build optimizations
└── .env.example           # Template for required secrets
```
## 🧑‍💻 Getting Started

# 1. Clone the Repository
```
git clone [https://github.com/ShashmithaBan/Portfolio_2026.git](https://github.com/ShashmithaBan/Portfolio_2026.git)
cd Portfolio_2026
```

2. Install Dependencies
```
npm install
```

3. Run Locally
```
npm run dev
```

## Highlighted Projects
# 1. Automated Cloud-Deploy System
Architected a containerized React workflow using Docker, GitHub Actions, and AWS EC2. Features a fully automated CI/CD pipeline that builds and pushes images to Docker Hub on every main branch commit.

# 2. AWS Resource Auditor (Bash)
A DevOps utility script that automates the inventory of 15+ AWS services (EC2, S3, RDS, etc.) using the AWS CLI, providing rapid visibility into cloud infrastructure and resource management.

# 3. Kubernetes Voting App
Deployed a multi-container microservices application on K8s using Minikube, demonstrating expertise in pod orchestration, service networking, and NodePort exposure.

## 🌐 Deployment & CI/CD
 - This project is deployed on Vercel with a continuous deployment workflow:

 - GitHub Integration: Any push to the main branch triggers an automatic build and deployment.

 - Environment Security: Secrets are managed via the Vercel Dashboard to prevent exposure in the public source code.

 - SSL/TLS: Automated certificate issuance and HTTPS termination provided by Vercel.

🤝 Contact
Shashmitha — Full Stack Developer & DevOps Enthusiast

GitHub: @ShashmithaBan

LinkedIn: https://www.linkedin.com/in/shashmitha-bandara-90180225a/
