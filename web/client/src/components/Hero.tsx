import "./Hero.css";

type HeroProps = {
  tagline?: string;
  onLaunchChat: () => void;
};

function Hero({ tagline, onLaunchChat }: HeroProps) {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero__content">
        <p className="hero__eyebrow">Campus-ready AI assistant</p>
        <h1 id="hero-heading">
          Your personalized guide to every question on campus.
        </h1>
        <p className="hero__lead">
          {tagline && tagline.trim().length > 0
            ? tagline
            : "Ask Cosmo AI to plan your semester, uncover campus resources, and keep every conversation organized."}
        </p>
        <div className="hero__actions">
          <button type="button" className="hero__cta" onClick={onLaunchChat}>
            Start chatting
          </button>
          <a className="hero__secondary" href="#features">
            Explore features
          </a>
        </div>
      </div>
      <div className="hero__visual" aria-hidden="true">
        <div className="hero__glow" />
      </div>
    </section>
  );
}

export default Hero;
