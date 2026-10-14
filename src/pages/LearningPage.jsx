import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeading from "../components/PageHeading";
import { useLearning } from "../context/LearningContext";
import { courses } from "../data/courses";

export default function LearningPage() {
  const { enrolled, progress, updateProgress } = useLearning();
  const myCourses = courses.filter((course) => enrolled.includes(course.id));
  const completed = myCourses.filter(
    (course) => (progress[course.id] || 0) >= 100,
  ).length;

  return (
    <>
      <PageHeading
        eyebrow="YOUR PERSONAL SPACE"
        title="My learning"
        description="Pick up where you left off and keep your progress moving."
        action={
          <Link to="/courses" className="btn btn-primary">
            Explore more <ArrowRight size={16} />
          </Link>
        }
      />
      <div className="learning-summary">
        <div>
          <span>Enrolled courses</span>
          <strong>{myCourses.length}</strong>
        </div>
        <div>
          <span>Completed courses</span>
          <strong>{completed}</strong>
        </div>
        <div>
          <span>Lessons progress</span>
          <strong>
            {myCourses.length
              ? Math.round(
                  myCourses.reduce(
                    (total, course) => total + (progress[course.id] || 0),
                    0,
                  ) / myCourses.length,
                )
              : 0}
            %
          </strong>
        </div>
      </div>
      {myCourses.length ? (
        <>
          <div className="section-heading learning-heading">
            <div>
              <h2>Your courses</h2>
              <p>Every lesson brings you one step closer.</p>
            </div>
            <span className="subtle-pill">{myCourses.length} enrolled</span>
          </div>
          <div className="learning-list">
            {myCourses.map((course) => {
              const percentage = progress[course.id] || 0;
              return (
                <article className="learning-card" key={course.id}>
                  <Link
                    to={`/courses/${course.id}`}
                    className={`learning-art art-${course.color}`}
                  >
                    <img src={course.image} alt={course.imageAlt} loading="lazy" />
                  </Link>
                  <div className="learning-info">
                    <div className="course-meta">
                      <span>{course.category}</span>
                      <span className="level-tag">{course.level}</span>
                    </div>
                    <Link
                      to={`/courses/${course.id}`}
                      className="course-title"
                    >
                      {course.title}
                    </Link>
                    <p>
                      By {course.instructor} · {course.lessons} lessons
                    </p>
                    <div className="learning-progress-label">
                      <span>
                        {percentage >= 100
                          ? "Course completed"
                          : percentage === 0
                            ? "Ready when you are"
                            : "Your progress"}
                      </span>
                      <strong>{percentage}%</strong>
                    </div>
                    <div className="progress-track">
                      <span style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                  <div className="learning-actions">
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        updateProgress(
                          course.id,
                          Math.min(
                            100,
                            percentage + Math.ceil(100 / course.modules.length),
                          ),
                        )
                      }
                    >
                      {percentage >= 100
                        ? "Completed"
                        : percentage === 0
                          ? "Start course"
                          : "Continue"}{" "}
                      <ArrowRight size={15} />
                    </button>
                    <Link
                      to={`/courses/${course.id}`}
                      className="text-link"
                    >
                      View details
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      ) : (
        <div className="empty-learning">
          <div className="empty-illustration">📚</div>
          <h2>Your learning journey starts here</h2>
          <p>
            You haven't enrolled in any courses yet. Explore the catalog and
            find something that excites you.
          </p>
          <Link to="/courses" className="btn btn-primary">
            Explore courses <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </>
  );
}