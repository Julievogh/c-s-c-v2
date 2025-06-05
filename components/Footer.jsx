import Image from "next/image";

export default function Footer() {
  return (
    <footer className=" text-[var(--color-text)] px-6 py-16">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Decorative line image */}
        <div className="flex justify-center">
          <Image
            src="/imgs/line.png"
            alt="Decorative line"
            width={800}
            height={80}
          />
        </div>

        {/* Main content area */}
        <div className="flex flex-col md:flex-row justify-between gap-12 text-sm">
          {/* Left: Logo + Message + Contact */}
          <div className="max-w-md">
            <Image
              src="/imgs/logo.svg"
              alt="Cozy Social Club"
              width={120}
              height={120}
            />
            <p className="font-accent text-accent text-xl mt-2">
              You have been cordially invited
            </p>
            <p className="mt-4 text-[var(--color-muted)]">
              At our Copenhagen headquarters, our event specialists are
              dedicated to ensuring your celebration is flawless.
            </p>
            <div className="border-t border-[var(--color-accent-green)] my-4" />
            <div className="space-y-1 text-[var(--color-muted)]">
              <p>
                <strong>Call Us:</strong> +45 23 34 45 56
              </p>
              <p>
                <strong>Email us:</strong> contact@cozysocialclub.com
              </p>
              <p>
                <strong>Find us:</strong> Copenhagen N, Denmark
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            {/* Middle: Links */}
            <div className="grid grid-cols-3 gap-8 text-sm">
              <div>
                <h5 className="text-[var(--color-terracotta)] font-semibold mb-2">
                  About
                </h5>
                <ul className="space-y-1">
                  <li>About Us</li>
                  <li>Meet the team</li>
                  <li>Gallery</li>
                </ul>
              </div>
              <div>
                <h5 className="text-[var(--color-terracotta)] font-semibold mb-2">
                  Services
                </h5>
                <ul className="space-y-1">
                  <li>Catering</li>
                  <li>Pop-up</li>
                  <li>Food</li>
                </ul>
              </div>
              <div>
                <h5 className="text-[var(--color-terracotta)] font-semibold mb-2">
                  Follow
                </h5>
                <ul className="space-y-1">
                  <li>Facebook</li>
                  <li>Instagram</li>
                  <li>Blog</li>
                </ul>
              </div>
            </div>

            {/* Right: Newsletter */}
            <div className="max-w-sm">
              <h5 className="text-[var(--color-terracotta)] font-semibold text-lg mb-2">
                Do you want to join the club?
              </h5>
              <form className="flex items-center bg-white rounded-full overflow-hidden border border-[color:var(--color-dark-espresso)] shadow-sm">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-4 py-2 text-[color:var(--color-dark-espresso)] placeholder:text-[color:var(--color-muted)] text-sm focus:outline-none bg-transparent"
                />
                <button
                  type="submit"
                  className="btn btn-secondary text-sm px-4 py-2 rounded-none rounded-r-full"
                >
                  Sign me up
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* Bottom line and copyright */}
        <div className="border-t border-[var(--color-accent-green)] pt-6 text-xs text-[var(--color-muted)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© Cozy Social Club. All rights reserved.</p>
          <p className="flex items-center gap-2">
            site by NORDALF{" "}
            <span className="rounded-full border border-white w-4 h-4"></span>
          </p>
        </div>
      </div>
    </footer>
  );
}
