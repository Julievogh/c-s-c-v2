export default function Hero() {
  return (
    <section id="home" className="relative w-full bg-black">
      {/* Aspect-ratio container: 16:9 */}
      <div className="relative w-full aspect-video overflow-hidden">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/4MxhmYmU_rk?autoplay=1&mute=1&controls=0&loop=1&playlist=4MxhmYmU_rk&modestbranding=1&showinfo=0&rel=0&playsinline=1"
          title="YouTube video background"
          frameBorder="0"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />

        {/* Text */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-4 text-center">
          <h1 className="font-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight max-w-xl mx-auto">
            Welcome to Cozy Social Club
          </h1>
        </div>
      </div>
    </section>
  );
}
