import {
  ArrowRight,
  Award,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Play,
  Sparkles,
  Star,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLearning } from "../context/LearningContext";
import { courses } from "../data/courses";
import NotFoundPage from "./NotFoundPage";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const course = courses.find((item) => item.id === id);
  const { enrolled, enroll, progress, updateProgress } = useLearning();
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState(0);

  if (!course) return <NotFoundPage />;

  const isEnrolled = enrolled.includes(id);
  const percentage = progress[id] || 0;
  const start = () => {
    if (!isEnrolled) enroll(id);
    updateProgress(
      id,
      Math.min(100, percentage + Math.round(100 / course.modules.length)),
    );
    setActiveModule(Math.min(course.modules.length - 1, activeModule + 1));
  };

  return (
    <>
      <Link to="/courses" className="back-link">
        <ChevronRight size={15} className="back-chevron" /> All courses
      </Link>
      <section className="detail-hero">
        <div className={`detail-art art-${course.color}`}>
          <img src={course.image} alt={course.imageAlt} />
          <span className="art-pill">{course.category}</span>
          <span className="detail-art-text">LEARN AT YOUR OWN PACE</span>
        </div>
        <div className="detail-copy">
          <div className="eyebrow">{course.level.toUpperCase()} COURSE</div>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <div className="detail-byline">
            <div className="avatar instructor-avatar">
              {course.instructor
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </div>
            <div>
              <small>YOUR INSTRUCTOR</small>
              <strong>{course.instructor}</strong>
            </div>
            <span className="rating">
              <span
                className="rating-stars"
                aria-label={`Rated ${course.rating} out of 5`}
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} size={12} fill="currentColor" />
                ))}
              </span>{" "}
              {course.rating}{" "}
              <span className="muted">({course.students} learners)</span>
            </span>
          </div>
          <div className="detail-facts">
            <span>
              <Clock3 size={16} />
              {course.duration}
            </span>
            <span>
              <Play size={15} />
              {course.lessons} lessons
            </span>
            <span>
              <Award size={16} />
              {course.level}
            </span>
          </div>
          <div className="detail-actions">
            <button className="btn btn-primary" onClick={start}>
              {isEnrolled ? "Continue learning" : "Enroll for free"}{" "}
              <ArrowRight size={17} />
            </button>
            <button
              className="btn btn-outline"
              onClick={() => {
                if (!isEnrolled) enroll(id);
                navigate("/learning");
              }}
            >
              <Bookmark size={16} />{" "}
              {isEnrolled ? "View in My Learning" : "Save course"}
            </button>
          </div>
          {isEnrolled && (
            <div className="detail-progress">
              <div>
                <span>Your course progress</span>
                <strong>{percentage}%</strong>
              </div>
              <div className="progress-track">
                <span style={{ width: `${percentage}%` }} />
              </div>
            </div>
          )}
        </div>
      </section>
      <div className="detail-columns">
        <section className="content-panel">
          <h2>What you'll learn</h2>
          <p className="panel-subtitle">
            Skills you can put into practice right away.
          </p>
          <div className="skills-grid">
            {course.skills.map((skill) => (
              <div key={skill}>
                <CheckCircle2 size={17} />
                {skill}
              </div>
            ))}
          </div>
          <div className="panel-divider" />
          <h2>Course curriculum</h2>
          <p className="panel-subtitle">
            {course.modules.length} modules · A clear path from start to finish
          </p>
          <div className="module-list">
            {course.modules.map((module, index) => (
              <button
                key={module}
                className={`module-row ${activeModule === index ? "module-selected" : ""}`}
                onClick={() => setActiveModule(index)}
              >
                <span className="module-number">{index + 1}</span>
                <span className="module-name">
                  {module}
                  <small>{index === 0 ? "Start here" : `Module ${index + 1}`}</small>
                </span>
                <span className="module-duration">
                  {index === 0 ? "12 min" : `${15 + index * 3} min`}
                </span>
                <ChevronRight size={16} />
              </button>
            ))}
          </div>
          <button className="btn btn-primary full-btn" onClick={start}>
            {isEnrolled ? "Mark next lesson complete" : "Enroll and start learning"}{" "}
            <ArrowRight size={17} />
          </button>
        </section>
        <aside className="detail-side">
          <div className="side-panel">
            <div className="side-price">
              Free <span>100% free access</span>
            </div>
            <button className="btn btn-primary full-btn" onClick={start}>
              {isEnrolled ? "Continue course" : "Enroll now"}
            </button>
            <p className="side-includes">This course includes:</p>
            {[
              "Lifetime access",
              "Learn at your own pace",
              `${course.lessons} bite-sized lessons`,
              "Progress saved automatically",
              "Certificate-style completion status",
            ].map((item) => (
              <div className="include-row" key={item}>
                <CheckCircle2 size={16} />
                {item}
              </div>
            ))}
          </div>
          <div className="side-tip">
            <Sparkles size={18} />
            <div>
              <strong>A little every day</strong>
              <p>Short, consistent study sessions make learning stick.</p>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}