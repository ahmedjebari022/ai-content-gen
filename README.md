# AI Content Generator

A modern web application that generates AI-powered content based on user inputs. Built with React, Vite, Tailwind CSS, and DaisyUI.

## Features

✨ **Content Generation**
- Generate blog posts, social media content, emails, and advertisements
- Customize tone (professional or friendly)
- Control content length (small, medium, large)
- Real-time word and character count

📋 **Content Management**
- Copy generated content to clipboard
- Download content as `.txt` file
- Regenerate content with same parameters
- View content in a clean, readable format

🎨 **User Experience**
- Clean pixel art modern design
- Responsive layout (mobile & desktop)
- Loading states with spinners
- Error handling and validation
- Smooth animations and transitions

## Tech Stack

- **Frontend:** React 19, Vite 7
- **Styling:** Tailwind CSS 4, DaisyUI 5
- **Build Tool:** Vite
- **Backend API:** Flask (localhost:5000)

## Project Structure

```
Ai-Content-Generator/
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main app component
│   │   ├── App.css           # Custom styles
│   │   └── main.jsx          # Entry point
│   ├── index.html            # HTML template
│   ├── vite.config.js        # Vite configuration
│   └── package.json          # Dependencies
└── README.md                 # This file
```

## Installation

### Prerequisites
- Node.js 16+ and npm installed
- Python 3.8+ with Flask backend running on `localhost:5000`

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd Ai-Content-Generator
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will run on `http://localhost:5173`

## Usage

1. **Enter a Topic:** Type your content topic in the input field
2. **Select Options:**
   - Choose content type (Blog Post, Social Media, Email, Advertisement)
   - Select tone (Professional, Friendly)
   - Pick content length (Small, Medium, Large)
3. **Generate:** Click "Generate Content" button
4. **Manage Content:**
   - **Copy:** Copy generated text to clipboard
   - **Download:** Save content as a `.txt` file
   - **Regenerate:** Create new content with same parameters

## Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## API Integration

The app communicates with a Flask backend at `http://127.0.0.1:5000/api/generate`

**Request:**
```json
{
  "topic": "string",
  "contentType": "blog|social|email|ad",
  "tone": "professional|friendly",
  "length": "small|medium|large"
}
```

**Expected Response:**
```json
{
  "success": true,
  "response": "generated content text",
  "wordCount": 150,
  "charCount": 1200
}
```

## Customization

### Change Theme
Edit `index.html` to change the DaisyUI theme:
```html
<html lang="en" data-theme="light"> <!-- change 'retro' to any DaisyUI theme -->
```

Available themes: light, dark, cupcake, bumblebee, emerald, corporate, synthwave, retro, cyberpunk, valentine, halloween, garden, forest, aqua, lofi, pastel, fantasy, wireframe, black, luxury, dracula, cmyk, autumn, business, acid, lemonade, night, coffee, winter, dim, nord, sunset

### Modify Styles
Edit `src/App.css` to customize colors, fonts, and animations.

## Troubleshooting

### `npm run dev` not working
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

### API Connection Error
- Ensure Flask backend is running on `localhost:5000`
- Check CORS settings on backend
- Verify `http://127.0.0.1:5000/api/generate` endpoint exists

### Content not generating
- Check browser console for errors (F12)
- Verify backend API response format
- Ensure all form fields are filled

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue on the repository.

---

**Made with ❤️ using React & Vite**