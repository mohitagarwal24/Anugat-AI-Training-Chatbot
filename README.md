# AI Training Portal

A modern web application for training, testing, and monitoring AI chatbot responses. This portal allows administrators to interact with an AI model, track performance metrics, and manage low-confidence responses.

The website can be accessed at https://anugat-ai-training-chatbot.vercel.app/

## Screenshots
![image](https://github.com/user-attachments/assets/016eb386-046c-45c0-9ef7-991558e4b5c2)
![image](https://github.com/user-attachments/assets/85e8ab10-d1a5-423a-b3d9-fe3f3c5a12fc)
![image](https://github.com/user-attachments/assets/2f11fb1b-4f8c-4f09-9edd-d206019cf5b8)
![image](https://github.com/user-attachments/assets/c3ae3380-dcb2-4115-9b96-18f30b9a829b)
![image](https://github.com/user-attachments/assets/5a45110f-8aab-43c2-8b30-1bfeb528494a)

## Features

- **Interactive Chat Interface**: Test the AI model with real-time responses
- **Markdown Support**: Responses are rendered in markdown format for better readability
- **Confidence Scoring**: Each AI response includes a confidence score
- **Low Confidence Management**: Track and manage responses with low confidence scores
- **Dashboard Analytics**: Monitor performance metrics and trends
- **Authentication System**: Secure login with persistent sessions
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router
- **Charts**: Recharts
- **AI Integration**: Google Gemini API
- **Markdown Rendering**: React Markdown

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd admin-training-portal
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following content:

```
VITE_GOOGLE_API_KEY="your_google_gemini_api_key"
```

Replace `your_google_gemini_api_key` with your actual Google Gemini API key.

### 4. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`.

### 5. Login

Use the following demo credentials to log in:

- Email: admin@example.com
- Password: admin123

## Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/              # Page components
├── store/              # State management with Zustand
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Key Components

- **Chat**: Interactive interface for testing the AI model
- **Dashboard**: Analytics and performance metrics
- **LowConfidence**: Management of low-confidence responses
- **Login**: Authentication interface
- **Layout**: Main application layout with navigation
- **ProtectedRoute**: Route protection for authenticated users

## Deployment

To build the application for production:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory, ready for deployment to your hosting service.

## License

[MIT License](LICENSE)

## Acknowledgements

- [Google Gemini API](https://ai.google.dev/) for AI capabilities
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Zustand](https://github.com/pmndrs/zustand) for state management
