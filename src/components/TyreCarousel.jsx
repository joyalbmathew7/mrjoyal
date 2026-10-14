import { useState, useEffect, useRef } from "react";

const images = Object.values(
  import.meta.glob("../assets/tyre-images/*.{jpg,jpeg,png,webp}", {
    eager: true,
    query: "?url",
    import: "default",
  })
);

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2";

const ChevronLeft = () => (
  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
);

const ChevronRight = () => (
  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

/* Small helper: calls onSwipe(-1 | 1) when the user swipes left / right */
function useSwipe(onSwipe) {
  const startX = useRef(null);
  return {
    onTouchStart: (e) => {
      startX.current = e.touches[0].clientX;
    },
    onTouchEnd: (e) => {
      if (startX.current === null) return;
      const diff = e.changedTouches[0].clientX - startX.current;
      startX.current = null;
      if (Math.abs(diff) > 50) onSwipe(diff < 0 ? 1 : -1);
    },
  };
}

export default function TyreCarousel() {
  const [current, setCurrent] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const total = images.length;
  const go = (dir) => setCurrent((c) => (c + dir + total) % total);
  const goPopup = (dir) => setSelectedImage((i) => (i + dir + total) % total);

  const carouselSwipe = useSwipe(go);
  const popupSwipe = useSwipe(goPopup);

  // Lightbox: keyboard controls + lock page scroll
  useEffect(() => {
    if (selectedImage === null) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedImage(null);
      if (event.key === "ArrowLeft") goPopup(-1);
      if (event.key === "ArrowRight") goPopup(1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage]);

  if (total === 0) {
    return (
      <div className="px-4 py-12 text-center">
        <p className="mx-auto max-w-xl rounded-2xl border border-dashed border-sky-300 bg-white p-8 text-base text-slate-600">
          No photos yet. Add images to the{" "}
          <code className="rounded bg-sky-100 px-1.5 py-0.5 font-mono text-sky-700">
            tyre-images
          </code>{" "}
          folder to show them here.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Heading */}
      <div className="mb-6 text-center sm:mb-8">
        <p className="text-sm font-bold text-sky-600">Our gallery</p>
        <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-4xl">
          Explore our workshop and products
        </h2>
        <p className="mt-2 text-sm text-slate-500">Tap a photo to view it full screen.</p>
      </div>

      {/* Main carousel */}
      <div
        className="relative mx-auto w-full overflow-hidden rounded-2xl border border-sky-200 bg-white shadow-lg shadow-sky-200/50 sm:rounded-3xl"
        role="region"
        aria-roledescription="carousel"
        aria-label="Workshop photo gallery"
        {...carouselSwipe}
      >
        {/* Slide track */}
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setSelectedImage(index)}
              aria-label={`Open photo ${index + 1} of ${total} full screen`}
              aria-hidden={index !== current}
              tabIndex={index === current ? 0 : -1}
              className={`relative block min-w-full cursor-zoom-in bg-sky-100 ${focusRing}`}
            >
              <img
                src={image}
                alt={`Tyre service photo ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
                draggable="false"
                className="aspect-[4/3] w-full object-contain sm:aspect-[16/9] lg:aspect-[21/9]"
              />
            </button>
          ))}
        </div>

        {/* Zoom hint (always visible so it works on touch screens too) */}
        <span className="pointer-events-none absolute bottom-3 right-3 hidden items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-sky-700 shadow sm:inline-flex">
          🔍 Enlarge
        </span>

        {/* Counter */}
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-sky-700 shadow">
          {current + 1} / {total}
        </div>

        {/* Arrows */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className={`absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-sky-700 shadow-md transition hover:bg-sky-600 hover:text-white active:scale-95 sm:left-4 sm:h-12 sm:w-12 ${focusRing}`}
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className={`absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-sky-700 shadow-md transition hover:bg-sky-600 hover:text-white active:scale-95 sm:right-4 sm:h-12 sm:w-12 ${focusRing}`}
            >
              <ChevronRight />
            </button>
          </>
        )}

        {/* Dots */}
        {total > 1 && total <= 12 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-white/80 px-3 py-2 shadow">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Go to photo ${index + 1}`}
                aria-current={current === index}
                className={`h-2.5 rounded-full transition-all duration-300 ${focusRing} ${
                  current === index ? "w-7 bg-sky-600" : "w-2.5 bg-sky-300 hover:bg-sky-500"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails (scrollable, centered when they fit) */}
      {total > 1 && (
        <div className="mt-4 overflow-x-auto pb-2 [scrollbar-width:thin]">
          <div className="mx-auto flex w-max gap-2 px-1">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Show photo ${index + 1}`}
                aria-current={current === index}
                className={`h-14 w-[72px] shrink-0 overflow-hidden rounded-xl border-2 bg-white transition sm:h-16 sm:w-20 ${focusRing} ${
                  current === index
                    ? "border-sky-600 ring-2 ring-sky-300"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Full-screen viewer */}
      {selectedImage !== null && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-sky-950/85 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          {...popupSwipe}
        >
          {/* Close */}
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image viewer"
            className={`absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-sky-700 shadow-lg transition hover:bg-sky-100 sm:right-6 sm:top-6 ${focusRing}`}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous */}
          {total > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPopup(-1);
              }}
              aria-label="Previous photo"
              className={`absolute left-2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-sky-700 shadow-lg transition hover:bg-sky-600 hover:text-white sm:left-6 sm:h-12 sm:w-12 ${focusRing}`}
            >
              <ChevronLeft />
            </button>
          )}

          {/* Image */}
          <img
            src={images[selectedImage]}
            alt={`Tyre service photo ${selectedImage + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[80vh] max-w-full rounded-2xl border-4 border-white bg-white object-contain shadow-2xl sm:max-w-[85vw]"
          />

          {/* Next */}
          {total > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPopup(1);
              }}
              aria-label="Next photo"
              className={`absolute right-2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-sky-700 shadow-lg transition hover:bg-sky-600 hover:text-white sm:right-6 sm:h-12 sm:w-12 ${focusRing}`}
            >
              <ChevronRight />
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-sky-700 shadow">
            {selectedImage + 1} / {total}
          </div>
        </div>
      )}
    </div>
  );
}