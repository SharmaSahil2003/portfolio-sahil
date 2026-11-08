import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/** Shared route-pending indicator. It is shown only while TanStack Router is loading a route. */
export function RouteTransition({ pending }: { pending: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {pending ? (
        <motion.div
          key="route-transition"
          className="route-transition"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.16 }}
          role="status"
          aria-live="polite"
          aria-label="Loading page"
        >
          <span className="sr-only">Loading page</span>
          <div className="route-loader-mark" aria-hidden="true">
            <span className="route-loader-orbit route-loader-orbit-a" />
            <span className="route-loader-orbit route-loader-orbit-b" />
            <span className="route-loader-core" />
            <span className="route-loader-axis route-loader-axis-a" />
            <span className="route-loader-axis route-loader-axis-b" />
          </div>
          <span className="route-loader-caption" aria-hidden="true">
            Loading / route
          </span>
          <span className="route-loader-progress" aria-hidden="true">
            <i />
          </span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
