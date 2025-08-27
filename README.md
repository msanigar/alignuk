# AlignUK - UK Political Alignment Quiz

A neutral, evidence-based political alignment app that places users on multiple axes (not just left–right), inspired by Vote Compass–style tools. Built specifically for UK politics with a focus on privacy, neutrality, and comprehensive analysis.

## Features

- **Six-Dimensional Analysis**: Economic, Social, Authority, Sovereignty, Environment, and Welfare axes
- **Two Quiz Versions**: Lite (36 questions, 5-8 minutes) and Full (60 questions, 10-15 minutes)
- **Party Matching**: Compare your results with major UK political parties using similarity algorithms
- **Evidence-Based Questions**: Carefully crafted neutral questions with UK-specific context and sources
- **Privacy-Focused**: Anonymous sessions by default, optional authentication
- **Interactive Results**: Radar charts, 2D compass, and detailed breakdowns with confidence scoring
- **Comprehensive Glossary**: 45+ political terms and concepts explained
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Accessibility**: WCAG AA compliant with reduced motion support
- **Brand Identity**: Custom logo representing political alignment across multiple axes

## Tech Stack

- **Framework**: Next.js 14 (App Router) + React 18 + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Database**: Supabase (PostgreSQL + Auth)
- **Charts**: Recharts (client-side rendering)
- **Deployment**: Netlify

## Quiz Versions

### Lite Version (36 questions, 5-8 minutes)
- Core questions covering all six political dimensions
- Perfect for quick political alignment assessment
- Ideal for first-time users or time-constrained sessions

### Full Version (60 questions, 10-15 minutes)
- Comprehensive question set with additional depth
- More nuanced analysis across all dimensions
- Includes party matching and detailed breakdowns
- Recommended for users seeking thorough political analysis

## Party Matching

The app includes a sophisticated party matching system that:

- **Compares your results** with major UK political parties using cosine similarity algorithms
- **Provides percentage matches** for Labour, Conservative, Liberal Democrats, Green Party, and Reform UK
- **Uses party colors** for intuitive visual representation
- **Educational purpose only** - not intended as voting advice
- **Based on manifestos, voting records, and policy positions**

## Logo Design

The AlignUK logo represents the core concept of multi-dimensional political alignment:

- **Central Dot**: Represents the user's position in political space
- **Six Axes**: Radiating lines represent the six political dimensions (Economic, Social, Authority, Sovereignty, Environment, Welfare)
- **Blue Circle**: Uses the primary blue color (`#0284c7`) for brand consistency
- **White Lines**: Clean, neutral design reflecting the app's unbiased approach

The logo is available in multiple sizes and formats:
- `logo.svg` - Standard 32x32 version
- `logo-large.svg` - 40x40 version for headers
- `favicon.svg` - Favicon version

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Netlify account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/alignuk.git
   cd alignuk
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the database migrations (see Database Setup below)
   - Configure Google OAuth provider
   - Set up Row Level Security policies

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Setup

### 1. Create Tables

Run these SQL commands in your Supabase SQL editor:

```sql
-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions table for anonymous users
CREATE TABLE sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  anon_key TEXT UNIQUE NOT NULL
);

-- Quizzes table
CREATE TABLE quizzes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id),
  session_id UUID REFERENCES sessions(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  version TEXT NOT NULL,
  duration_ms INTEGER,
  importance_weights JSONB
);

-- Answers table
CREATE TABLE answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  value INTEGER NOT NULL CHECK (value >= 1 AND value <= 7)
);

-- Scores table
CREATE TABLE scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  axis TEXT NOT NULL,
  score INTEGER NOT NULL CHECK (score >= -100 AND score <= 100),
  confidence INTEGER NOT NULL CHECK (confidence >= 0 AND confidence <= 100)
);

-- Indexes for performance
CREATE INDEX idx_quizzes_profile_id ON quizzes(profile_id);
CREATE INDEX idx_quizzes_session_id ON quizzes(session_id);
CREATE INDEX idx_answers_quiz_id ON answers(quiz_id);
CREATE INDEX idx_scores_quiz_id ON scores(quiz_id);
```

### 2. Row Level Security (RLS)

Enable RLS and create policies:

```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Sessions policies (anonymous access)
CREATE POLICY "Anyone can create sessions" ON sessions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view sessions" ON sessions
  FOR SELECT USING (true);

-- Quizzes policies
CREATE POLICY "Users can view own quizzes" ON quizzes
  FOR SELECT USING (
    auth.uid() = profile_id OR 
    session_id IN (SELECT id FROM sessions WHERE anon_key = current_setting('request.headers')::json->>'x-anon-key')
  );

CREATE POLICY "Users can insert own quizzes" ON quizzes
  FOR INSERT WITH CHECK (
    auth.uid() = profile_id OR 
    session_id IN (SELECT id FROM sessions WHERE anon_key = current_setting('request.headers')::json->>'x-anon-key')
  );

-- Answers policies
CREATE POLICY "Users can view own answers" ON answers
  FOR SELECT USING (
    quiz_id IN (
      SELECT id FROM quizzes WHERE 
        profile_id = auth.uid() OR 
        session_id IN (SELECT id FROM sessions WHERE anon_key = current_setting('request.headers')::json->>'x-anon-key')
    )
  );

CREATE POLICY "Users can insert own answers" ON answers
  FOR INSERT WITH CHECK (
    quiz_id IN (
      SELECT id FROM quizzes WHERE 
        profile_id = auth.uid() OR 
        session_id IN (SELECT id FROM sessions WHERE anon_key = current_setting('request.headers')::json->>'x-anon-key')
    )
  );

-- Scores policies
CREATE POLICY "Users can view own scores" ON scores
  FOR SELECT USING (
    quiz_id IN (
      SELECT id FROM quizzes WHERE 
        profile_id = auth.uid() OR 
        session_id IN (SELECT id FROM sessions WHERE anon_key = current_setting('request.headers')::json->>'x-anon-key')
    )
  );

CREATE POLICY "Users can insert own scores" ON scores
  FOR INSERT WITH CHECK (
    quiz_id IN (
      SELECT id FROM quizzes WHERE 
        profile_id = auth.uid() OR 
        session_id IN (SELECT id FROM sessions WHERE anon_key = current_setting('request.headers')::json->>'x-anon-key')
    )
  );
```

### 3. Google OAuth Setup

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Providers
3. Enable Google provider
4. Add your Google OAuth credentials
5. Set redirect URLs:
   - Production: `https://your-site.netlify.app/auth/callback`
   - Development: `http://localhost:3000/auth/callback`

## Deployment

### Netlify Deployment

1. **Connect your repository**
   - Push your code to GitHub
   - Connect your repository to Netlify

2. **Configure build settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18 (or higher)

3. **Set environment variables**
   In Netlify dashboard, go to Site settings > Environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
   ```

4. **Deploy**
   - Netlify will automatically deploy on git push
   - Or trigger a manual deploy from the dashboard

### Backend Deployment

**No separate backend deployment required!** 

This application uses Supabase as a Backend-as-a-Service (BaaS), which means:
- ✅ **Database**: Hosted on Supabase (PostgreSQL)
- ✅ **Authentication**: Handled by Supabase Auth
- ✅ **API**: Supabase provides REST and real-time APIs
- ✅ **Security**: Row Level Security (RLS) policies handle data access
- ✅ **Scaling**: Supabase handles all backend scaling automatically

The only deployment needed is the frontend to Netlify.

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `NEXT_PUBLIC_SITE_URL` | Your site URL for auth redirects | Yes |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console verification | No |

## Project Structure

```
alignuk/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── quiz/              # Quiz flow
│   ├── about/             # About page
│   ├── glossary/          # Political terms glossary
│   ├── privacy/           # Privacy policy
│   ├── terms/             # Terms of service
│   ├── cookies/           # Cookie policy
│   ├── methodology/       # Methodology explanation
│   ├── contact/           # Contact page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── providers/         # Context providers
│   ├── quiz/              # Quiz-specific components
│   ├── sections/          # Page sections
│   ├── PartyMatches.tsx   # Party matching component
│   ├── PartyMatchBars.tsx # Party matching chart
│   └── PartyMatchBarsChart.tsx # Chart implementation
├── lib/                   # Utility libraries
│   ├── axes.ts           # Political axes definitions
│   ├── database.ts       # Database utilities
│   ├── glossary.ts       # Political terms (45+ terms)
│   ├── questions.ts      # Quiz questions (Lite & Full versions)
│   ├── scoring.ts        # Scoring algorithm
│   ├── partyVectors.ts   # Party position vectors
│   ├── similarity.ts     # Similarity algorithms
│   ├── cosineExplainer.ts # Algorithm explanations
│   ├── supabase.ts       # Supabase client
│   └── types.ts          # TypeScript types
├── public/               # Static assets
│   ├── logo.svg          # Main logo
│   ├── logo-large.svg    # Large logo
│   └── favicon.svg       # Favicon
└── package.json          # Dependencies and scripts
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by Vote Compass and similar political alignment tools
- Built with modern web technologies for accessibility and performance
- Designed with neutrality and evidence-based approach in mind
- Party matching algorithm based on cosine similarity and manifesto analysis

## Support

For support, email support@alignuk.com or create an issue in this repository.

---

Built with ❤️ for UK democracy
