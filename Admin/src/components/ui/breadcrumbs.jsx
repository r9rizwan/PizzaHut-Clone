import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav aria-label="Breadcrumb" className="mt-7">
      <ol className="flex items-center space-x-2">
        {/* Home Link */}
        <li>
          <Link to="/home" className="text-muted-foreground hover:text-link">
            Home
          </Link>
        </li>

        {pathnames.map((value, index) => {
          // Skip adding "Home" again if it's already in the path
          if (value === "home" && index === 0) {
            return null;
          }

          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to} className="flex items-center">
              {/* Separator */}
              <svg
                className="shrink-0 mx-2 text-gray-400 dark:text-neutral-600"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6"></path>
              </svg>

              {/* Breadcrumb Item */}
              {isLast ? (
                <span className="capitalize text-sm font-semibold text-gray-800 dark:text-neutral-200">
                  {value}
                </span>
              ) : (
                <Link
                  to={to}
                  className="capitalize text-gray-500 hover:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500"
                >
                  {value}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
