import { ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import CourseCard from "../components/CourseCard";
import EmptyState from "../components/EmptyState";
import PageHeading from "../components/PageHeading";
import { courses } from "../data/courses";

export default function CoursesPage() {
  const [query, setQuery] = useState(
    new URLSearchParams(window.location.search).get("q") || "",
  );
  const [category, setCategory] = useState("All courses");
  const [level, setLevel] = useState("All levels");
  const categories = ["All courses", ...new Set(courses.map((course) => course.category))];
  const filtered = useMemo(
    () =>
      courses.filter(
        (course) =>
          (category === "All courses" || course.category === category) &&
          (level === "All levels" || course.level === level) &&
          (
            course.title +
            " " +
            course.description +
            " " +
            course.instructor
          )
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [category, level, query],
  );

  return (
    <>
      <PageHeading
        eyebrow="EXPLORE & DISCOVER"
        title="Find your next skill"
        description="Practical courses, expert instructors, and a pace that works for you."
      />
      <label className="course-search catalog-search">
        <Search size={18} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="What would you like to learn?"
        />
        {query && (
          <button className="clear-search" onClick={() => setQuery("")}>
            Clear
          </button>
        )}
      </label>
      <div className="filter-row">
        <div className="category-chips">
          {categories.map((item) => (
            <button
              key={item}
              className={`chip ${category === item ? "chip-active" : ""}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <select
          className="level-select"
          value={level}
          onChange={(event) => setLevel(event.target.value)}
          aria-label="Filter by level"
        >
          <option>All levels</option>
          <option>Beginner</option>
          <option>Intermediate</option>
        </select>
      </div>
      <div className="results-line">
        <span>
          <strong>{filtered.length}</strong> courses available
        </span>
        <span>
          Sorted by popularity <ChevronRight size={14} />
        </span>
      </div>
      <div className="course-grid">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      {!filtered.length && (
        <EmptyState
          title="No matching courses"
          text="Try another keyword or category."
        />
      )}
    </>
  );
}