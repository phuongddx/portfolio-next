export function Footer() {
  return (
    <footer className="py-8 px-4 bg-primary dark:bg-gray-950 text-white/80">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} DOAN DUY PHUONG. Built with passion and
          attention to detail.
        </p>
        <p className="text-xs mt-2 text-white/60">
          Ho Chi Minh, Vietnam | +84373.946.083
        </p>
      </div>
    </footer>
  );
}
