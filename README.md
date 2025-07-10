# Expense Tracker Application

A full-stack expense tracking application built with FastAPI backend and React frontend, featuring a modern UI and comprehensive expense management capabilities.

![Expense Tracker](https://img.shields.io/badge/Status-Production%20Ready-green)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688)
![React](https://img.shields.io/badge/Frontend-React%2018-61DAFB)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6)
![Mantine](https://img.shields.io/badge/UI-Mantine-339AF0)

## 🚀 Features

### Core Functionality

- ✅ **Add Expenses** - Create new expenses with amount validation
- ✅ **View Expenses** - Display expenses in a responsive table with date formatting
- ✅ **Filter Expenses** - Filter by category dropdown and date range
- ✅ **Delete Expenses** - Remove expenses with confirmation
- ✅ **Expense Summary** - View total spending and category breakdown
- ✅ **Data Validation** - Ensure amounts are positive and categories are valid
- ✅ **Currency Formatting** - Proper USD currency display

### Advanced Features

- 🔍 **Multi-Filter Support** - Combine category and date range filters
- 📊 **Analytics Dashboard** - Category breakdown with percentages
- 📱 **Responsive Design** - Works seamlessly on mobile and desktop
- 🎨 **Modern UI** - Beautiful interface with Mantine components
- ⚡ **Real-time Updates** - Instant data refresh after operations
- 🔔 **Notifications** - Success and error feedback
- 💾 **SQLite Database** - Persistent data storage

## 🏗️ Architecture

```
Expense Tracker/
├── backend/                 # FastAPI Backend
│   ├── app/
│   │   ├── db/             # Database configuration
│   │   ├── models/         # SQLAlchemy models
│   │   ├── routers/        # API routes
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   ├── expenses.db         # SQLite database
│   └── pyproject.toml      # Python dependencies
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API client
│   │   ├── types/          # TypeScript types
│   │   └── App.tsx         # Main component
│   └── package.json        # Node dependencies
└── README.md              # This file
```

## 🛠️ Technology Stack

### Backend

- **FastAPI** - High-performance Python web framework
- **SQLAlchemy** - Python ORM for database operations
- **SQLite** - Lightweight file-based database
- **Pydantic** - Data validation and serialization
- **Uvicorn** - ASGI server for running FastAPI

### Frontend

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type safety and enhanced developer experience
- **Vite** - Fast build tool and development server
- **Mantine UI** - Comprehensive React components library
- **Axios** - HTTP client for API communication
- **React Hook Form** - Efficient form handling and validation

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Python 3.8+** (for backend)
- **Node.js 18+** (for frontend)
- **npm or yarn** (package manager)
- **Git** (version control)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd expense-tracker
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
# OR if using uv
uv sync

# Start the FastAPI server
python -m app.main
# OR
uvicorn app.main:app --reload
```

The backend will be available at: `http://localhost:8000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at: `http://localhost:5173`

### 4. Access the Application

Open your web browser and navigate to `http://localhost:5173` to use the expense tracker.

## 📚 API Documentation

### Base URL

```
http://localhost:8000
```

### Endpoints

| Method   | Endpoint                        | Description                      |
| -------- | ------------------------------- | -------------------------------- |
| `GET`    | `/expenses/`                    | Fetch all expenses               |
| `POST`   | `/expenses/`                    | Create a new expense             |
| `PUT`    | `/expenses/{expense_id}`        | Update an existing expense       |
| `DELETE` | `/expenses/{expense_id}`        | Delete an expense                |
| `GET`    | `/expenses/category/{category}` | Filter expenses by category      |
| `GET`    | `/expenses/total`               | Get total expenses and breakdown |
| `GET`    | `/expenses/filter`              | Filter by date range             |

### Example API Calls

#### Create Expense

```bash
curl -X POST "http://localhost:8000/expenses/" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 25.50,
    "description": "Lunch at restaurant",
    "category": "Food"
  }'
```

#### Get All Expenses

```bash
curl -X GET "http://localhost:8000/expenses/"
```

#### Filter by Date Range

```bash
curl -X GET "http://localhost:8000/expenses/filter?start_date=2025-01-01&end_date=2025-01-31"
```

### Interactive API Documentation

FastAPI automatically generates interactive API documentation:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 💾 Database Schema

### Expense Model

```python
class Expense:
    id: int              # Primary key
    amount: float        # Expense amount (positive)
    description: str     # Optional description
    category: str        # Category enum value
    date: datetime       # Creation timestamp
```

### Categories

The application supports the following expense categories:

- Food
- Housing
- Utilities
- Entertainment
- Shopping
- Health Care
- Travel
- Other

## 🎨 Frontend Components

### Component Structure

```
src/components/
├── ExpenseForm.tsx      # Form for adding new expenses
├── ExpenseList.tsx      # Table displaying all expenses
├── ExpenseFilter.tsx    # Filter controls (category, date range)
└── ExpenseSummary.tsx   # Summary dashboard with totals
```

### Key Features

- **Form Validation**: Real-time validation with error messages
- **Responsive Tables**: Mobile-friendly expense list
- **Date Pickers**: Easy date range selection
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Notifications**: Success/error toast notifications

## 🔧 Development

### Backend Development

```bash
cd backend

# Install development dependencies
pip install -r requirements-dev.txt

# Run tests
pytest

# Format code
black app/
isort app/

# Type checking
mypy app/
```

### Frontend Development

```bash
cd frontend

# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Type checking
npm run type-check
```

### Environment Variables

#### Backend (.env)

```env
DATABASE_URL=sqlite:///./expenses.db
DEBUG=True
```

#### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:8000
```

## 📦 Building for Production

### Backend

```bash
cd backend

# Create production requirements
pip freeze > requirements.txt

# Run with production settings
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd frontend

# Build optimized production bundle
npm run build

# The built files will be in the 'dist' directory
# Serve with any static file server
npx serve dist
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
pytest tests/ -v
```

### Frontend Tests

```bash
cd frontend
npm run test
```

## 🐛 Troubleshooting

### Common Issues

1. **Backend not starting**

   - Check if Python virtual environment is activated
   - Verify all dependencies are installed: `pip install -r requirements.txt`
   - Check if port 8000 is available

2. **Frontend can't connect to backend**

   - Ensure backend is running on `http://localhost:8000`
   - Check browser console for CORS errors
   - Verify API base URL in frontend configuration

3. **Database errors**

   - Delete `expenses.db` and restart backend to recreate database
   - Check file permissions in the backend directory

4. **Build errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check TypeScript errors: `npm run type-check`

## 🚀 Deployment

### Backend Deployment Options

- **Railway**: Easy Python app deployment
- **Heroku**: Classic PaaS platform
- **DigitalOcean App Platform**: Simple cloud deployment
- **AWS Lambda**: Serverless deployment with Mangum

### Frontend Deployment Options

- **Netlify**: Automatic deployments from Git
- **Vercel**: Optimized for React applications
- **GitHub Pages**: Free static site hosting
- **AWS S3 + CloudFront**: Scalable static hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/) for the excellent Python web framework
- [React](https://reactjs.org/) for the powerful frontend library
- [Mantine](https://mantine.dev/) for the beautiful UI components
- [Vite](https://vitejs.dev/) for the fast build tool

## 📞 Support

If you encounter any issues or have questions:

1. Check the [troubleshooting section](#🐛-troubleshooting)
2. Search existing [GitHub issues](../../issues)
3. Create a new issue with detailed information
4. Include error messages, browser console logs, and steps to reproduce

---

**Happy expense tracking! 💰📊**
