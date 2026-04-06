# AI Text Improver

A React-based application that uses Google's Gemini AI to improve and rewrite text in various tones.

## Features

- Improve text with different tones: Professional, Casual, Concise, Academic, Creative
- Powered by Google's Gemini 2.5 Flash model
- Built with React, TypeScript, and Vite

## Setup

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd ai-text-improver
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Get your Gemini API key:
   - Go to [Google AI Studio](https://aistudio.google.com/)
   - Create a new API key
   - Copy the API key

4. Set up environment variables:
   - Copy `.env.local` and replace `'your-api-key-here'` with your actual Gemini API key:
     ```
     VITE_GEMINI_API_KEY='your-actual-api-key'
     ```

5. Run the development server:
   ```bash
   npm run dev
   ```

## Usage

- Enter your text in the input field
- Select a tone from the dropdown
- Click "Improve Text" to get the rewritten version

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Google Generative AI (Gemini)
