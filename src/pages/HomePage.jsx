import {
  Award,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import EmptyState from "../components/EmptyState";
import StatCard from "../components/StatCard";
import { useLearning } from "../context/LearningContext";
import { courses } from "../data/courses";

export default function HomePage() {
  const { enrolled, progress, user } = useLearning();
  const [query, setQuery] = useState("");
  const featured = courses
    .filter(
      (course) =>
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.category.toLowerCase().includes(query.toLowerCase()),
    )
    .slice(0, 3);
  const totalProgress = enrolled.length
    ? Math.round(
        enrolled.reduce((total, id) => total + (progress[id] || 0), 0) /
          enrolled.length,
      )
    : 0;

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="hero-kicker">
            <Sparkles size={14} /> YOUR NEXT CHAPTER STARTS HERE
          </div>
          <h1>
            Make today count.
            <br />
            <span>Learn something new.</span>
          </h1>
          <p>
            Small steps lead to big things. Build real-world skills with courses
            designed to move you forward.
          </p>
          <div className="hero-buttons">
            <Link to="/courses" className="btn btn-light">
              Explore courses <ArrowRight size={17} />
            </Link>
            <Link to="/learning" className="hero-text-link">
              My learning <ChevronRight size={16} />
            </Link>
          </div>
          <div className="hero-proof">
            <div className="proof-avatars">
              <span>👩🏻</span>
              <span>👨🏽</span>
              <span>👩🏾</span>
              <span>👨🏻</span>
            </div>
            <div>
              <strong>12,000+ learners</strong>
              <small>growing their skills every day</small>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-circle circle-one" />
          <div className="hero-circle circle-two" />
          <div className="hero-note note-top">
            <span className="note-icon">✦</span>
            <div>
              <strong>Keep it up!</strong>
              <small>You're building a habit</small>
            </div>
          </div>
          <div className="hero-book">
            <div className="book-shape">
              <BookOpen size={66} />
            </div>
            <div className="book-spark spark-a">✦</div>
            <div className="book-spark spark-b">✧</div>
          </div>
          <div className="hero-note note-bottom">
            <div className="note-check">
              <CheckCircle2 size={19} />
            </div>
            <div>
              <strong>One lesson at a time</strong>
              <small>Progress over perfection</small>
            </div>
          </div>
        </div>
      </section>
      <section className="stats-grid">
        <StatCard
          icon={<BookOpen />}
          label="Available courses"
          value={`${courses.length}+`}
          detail="Across popular topics"
          tone="lavender"
        />
        <StatCard
          icon={<GraduationCap />}
          label="Courses enrolled"
          value={enrolled.length}
          detail="Your learning journey"
          tone="peach"
        />
        <StatCard
          icon={<TrendingUp />}
          label="Average progress"
          value={`${totalProgress}%`}
          detail="Keep the momentum"
          tone="mint"
        />
        <StatCard
          icon={<Award />}
          label="Learning streak"
          value={enrolled.length ? "Active" : "Start today"}
          detail="Every step counts"
          tone="sky"
        />
      </section>
      <section className="section-block">
        <div className="section-heading">
          <div>
            <div className="eyebrow">PICK UP A NEW SKILL</div>
            <h2>
              Popular courses <span className="heading-spark">✦</span>
            </h2>
            <p>Handpicked learning paths to help you grow.</p>
          </div>
          <Link to="/courses" className="view-all">
            View all courses <ArrowRight size={16} />
          </Link>
        </div>
        <label className="course-search">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search courses or categories..."
          />
          <span className="search-shortcut">⌘ K</span>
        </label>
        <div className="course-grid">
          {featured.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        {!featured.length && (
          <EmptyState
            title="No courses found"
            text="Try a different search term."
          />
        )}
      </section>
      <section className="bottom-banner">
        <div className="banner-icon">💡</div>
        <div>
          <strong>
            {user
              ? `Keep going, ${user.name.split(" ")[0]}!`
              : "Your future self will thank you."}
          </strong>
          <p>
            Set aside just 15 minutes today and make progress on a skill that
            matters.
          </p>
        </div>
        <Link to="/learning" className="banner-link">
          Continue learning <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}