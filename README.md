# Rover

Rover is a web application powered by OpenAI's GPT-3.5 Turbo model, designed to facilitate interactive and dynamic conversations with a chatbot. This application enables users to initiate new chats using their own api keys , make quick queries about "What's new?" and "ChatGPT Voice AI," and receive responses in a conversational format.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

- **Conversational Chat:** Engage in dynamic conversations with ChatGPT using OpenAI's GPT-3.5 Turbo model using their own api keys.
- **New Chat Initiation:** Start a new chat with a simple click of a button.
- **Quick Queries:** Pose queries about "What's new?" and "ChatGPT Voice AI" to receive relevant responses.

## Getting Started

### Prerequisites

Before getting started, ensure that you have the following prerequisites:

- [Node.js](https://nodejs.org/) installed on your machine.
- Obtain an API key from OpenAI by following their [documentation](https://platform.openai.com/docs/introduction).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ram05kishor12/chat_bot/
   ```

2. **Navigate to the project directory:**

   ```bash
   cd chat_bot
   ```

3. **Install dependencies:**

   ```bash
   npm install
   npm install dotenv
   npm install openai
   ```

4. **Start the application:**

   ```bash
   npm start
   ```

5. **Open your browser and go to [http://localhost:3000](http://localhost:3000) to use Rover.**

## Usage

1. **Start a New Chat:**
   - Click the "New Chat" button to initiate a new chat session.

2. **Engage in Conversation:**
   - Send queries to ChatGPT by entering text in the input field and pressing "Enter" or clicking the send button.

3. **Explore Functionalities:**
   - Explore the application's functionalities and experience a dynamic conversation with ChatGPT.

## How It Works

The application leverages the OpenAI GPT-3.5 Turbo model for natural language processing. User queries are sent to the OpenAI API, and the responses are displayed in real-time. The UI provides a chat-like experience with a typing animation during response generation.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- **OpenAI:** For providing the powerful GPT-3.5 Turbo model.
