# 🤖 Cover Bot

Cover Bot is a **React-based AI cover letter generator** powered by **OpenAI** and integrated with **n8n workflows** to help users instantly create tailored job applications.  
This repository includes both the frontend (React) and exported n8n workflows for easy automation setup.

---

## 🚀 Features

- **AI Cover Letter Generator** – Instantly creates personalized cover letters using job title and description.
- **n8n Integration** – Automates prompt handling and cover letter generation via workflows.
- **OpenAI-Powered** – Uses OpenAI's GPT model to craft professional letters.
- **Responsive UI** – Built using **React** and **Tailwind CSS** for a clean and modern experience.

---

## 🛠 Tech Stack

- **Frontend:** React (Vite)
- **Automation:** n8n (Open-source workflow automation)
- **AI Engine:** OpenAI GPT API (via HTTP Request in n8n)
- **Languages:** JavaScript (ES6+)
- **Styling:** Tailwind CSS or Material Tailwind
- **Package Manager:** npm or yarn

---

## 🔄 n8n Workflows

This project includes reusable n8n workflows located in the `/n8n-workflows` folder:

- **Generate Cover Letter** – Sends job data to OpenAI and receives a custom response.
- **Save & Manage** – (Optional) Store or email the generated letters via automation.

> You can import the `.json` files directly into your n8n instance to replicate the full automation logic.

---

## 📽️ Demo

Here’s a quick demo of Cover Bot in action:

<p align="center">
  <img src="https://github.com/lewnuyda/cover-bot/blob/main/src/assets/cover-bot.gif" width="600" alt="Cover Bot"/>
</p>

> Watch how job information is turned into polished cover letters with AI and automation.

---

## 🧠 How It Works

1. The user enters their name, job title, company name, skills, experience, and preferred tone into the form.
2. The form data is sent to an n8n workflow via a webhook.
3. OpenAI generates a tailored cover letter using the provided details.
4. The generated letter is returned to the React frontend and displayed to the user.
5. Optional actions: The letter can be saved, copied, or emailed (handled via n8n).

---

## ⚙️ Installation & Setup (React App)

### **1. Clone the repository**

```bash
git clone https://github.com/lewnuyda/cover-bot.git
cd cover-bot
```

### **2. Install dependencies**

```bash
npm install
# or
yarn install
```

### **3. Run the development server**

```bash
npm run dev
# or
yarn dev
```
