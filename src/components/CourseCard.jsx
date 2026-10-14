import {
  ArrowRight,
  Clock3,
  Play,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLearning } from "../context/LearningContext";

export default function CourseCard({ course }) {
  const { enrolled, progress } = useLearning();
  const isEnrolled = enrolled.includes(course.id);

  return (
    <article className="course-card transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
      <Link
        to={`/courses/${course.id}`}
        className={`course-art group art-${course.color}`}
      >
        <img
          src={course.image}
          alt={course.imageAlt}
          loading="lazy"
          className="transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <span className="art-pill">{course.category}</span>
      </Link>
      <div className="course-card-body">
        <div className="course-meta">
          <span>{course.level}</span>
          <span className="rating" aria-label={`Rated ${course.rating} out of 5`}>
            <span className="rating-stars" aria-hidden="true">
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} size={12} fill="currentColor" />
              ))}
            </span>
            {course.rating}
          </span>
        </div>
        <Link to={`/courses/${course.id}`} className="course-title">
          {course.title}
        </Link>
        <div className="instructor">By {course.instructor}</div>
        <div className="course-stats">
          <span>
            <Clock3 size={14} />
            {course.duration}
          </span>
          <span>
            <Play size={13} />
            {course.lessons} lessons
          </span>
        </div>
        {isEnrolled && (
          <div className="mini-progress">
            <div>
              <span>Your progress</span>
              <strong>{progress[course.id] || 0}%</strong>
            </div>
            <div className="progress-track">
              <span style={{ width: `${progress[course.id] || 0}%` }} />
            </div>
          </div>
        )}
        <div className="course-card-bottom">
          <span className="free-label">{course.price}</span>
          <Link
            className="round-arrow"
            to={`/courses/${course.id}`}
            aria-label={`View ${course.title}`}
          >
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </article>
  );
}