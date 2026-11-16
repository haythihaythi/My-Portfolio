import { useRef, type CSSProperties, type PointerEvent } from "react";
import "./ProfileCard.css";

interface ProfileCardProps {
  name: string;
  title: string;
  handle: string;
  status?: string;
  contactText?: string;
  avatarUrl: string;
  iconUrl?: string;
  holo?: number;
  glare?: number;
  tiltStrength?: number;
  parallax?: number;
  radius?: number;
  enableTilt?: boolean;
  intro?: boolean;
  showUserInfo?: boolean;
  enableMobileTilt?: boolean;
  theme?: "dark" | "light";
  onContactClick?: () => void;
}

export default function ProfileCard({
  name,
  title,
  handle,
  status = "Online",
  contactText = "Contact",
  avatarUrl,
  iconUrl,
  holo = 0.8,
  glare = 0.5,
  tiltStrength = 12,
  parallax = 8,
  radius = 16,
  enableTilt = true,
  intro = true,
  showUserInfo = true,
  enableMobileTilt = false,
  theme = "dark",
  onContactClick,
}: ProfileCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!enableTilt) return;
    if (event.pointerType === "touch" && !enableMobileTilt) return;

    const card = cardRef.current;
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.setProperty("--rotate-x", `${-y * tiltStrength}deg`);
    card.style.setProperty("--rotate-y", `${x * tiltStrength}deg`);
    card.style.setProperty("--pointer-x", `${(x + 0.5) * 100}%`);
    card.style.setProperty("--pointer-y", `${(y + 0.5) * 100}%`);
    card.style.setProperty("--avatar-x", `${x * parallax}px`);
    card.style.setProperty("--avatar-y", `${y * parallax}px`);
  };

  const resetTilt = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
    card.style.setProperty("--pointer-x", "50%");
    card.style.setProperty("--pointer-y", "50%");
    card.style.setProperty("--avatar-x", "0px");
    card.style.setProperty("--avatar-y", "0px");
  };

  const style = {
    "--card-radius": `${radius}px`,
    "--holo-opacity": holo,
    "--glare-opacity": glare,
    "--pattern-image": iconUrl ? `url("${iconUrl}")` : "none",
  } as CSSProperties;

  return (
    <article
      ref={cardRef}
      className={`profile-card profile-card--${theme}${intro ? " profile-card--intro" : ""}`}
      style={style}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <div className="profile-card__pattern" />
      <div className="profile-card__glare" />
      <div className="profile-card__avatar-wrap">
        <img className="profile-card__avatar" src={avatarUrl} alt={name} />
      </div>

      {showUserInfo && (
        <div className="profile-card__info">
          <div>
            <span className="profile-card__status-dot" />
            <span>{status}</span>
          </div>
          <button type="button" onClick={onContactClick}>
            {contactText}
          </button>
        </div>
      )}

      <div className="profile-card__content">
        <h3>{name}</h3>
        <p>{title}</p>
        <span>{handle.startsWith("@") ? handle : `@${handle}`}</span>
      </div>
    </article>
  );
}
