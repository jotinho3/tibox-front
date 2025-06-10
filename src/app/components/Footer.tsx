export function Footer() {
  return (
    <footer className="w-full py-4 px-8 bg-gray-100 dark:bg-gray-900 shadow mt-auto text-center">
      <span className="text-gray-600 dark:text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Tibox. All rights reserved.
      </span>
    </footer>
  );
}