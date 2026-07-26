import { Modal } from "@/components/Modal";

export function HowToPlayModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="How to Play" onClose={onClose}>
      <div className="space-y-4 text-sm leading-6 text-[#c7c6e0]/85">
        <p>
          You&rsquo;ll see one NBA player. Select every current NBA franchise the
          player appeared for in at least one official regular-season or
          playoff game.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Correct picks turn <strong className="text-[#22e584]">green</strong> and lock in.</li>
          <li>Incorrect picks turn <strong className="text-[#ff3358]">red</strong>, lock, and cost a mistake.</li>
          <li>Three mistakes and the game ends.</li>
          <li>Find every correct franchise to win.</li>
        </ul>
        <p>
          Teams that <em>drafted</em>, signed, or traded for a player but that he
          never actually suited up for don&rsquo;t count — same for preseason,
          Summer League, G League, and training-camp-only stops. A franchise
          only counts once, even with multiple stints.
        </p>
        <div className="rounded-2xl bg-[#123e91] p-4 text-white">
          <p className="mono text-xs uppercase tracking-widest opacity-70">Scoring</p>
          <p className="mt-1 text-sm">Start at 1,000 points.</p>
          <p className="text-sm">&minus;100 for every incorrect guess.</p>
          <p className="text-sm">&minus;75 for every hint used.</p>
        </div>
        <p>
          One new daily puzzle every day — everyone gets the same player. Come
          back tomorrow for the next one, or head to Practice Mode for
          unlimited replays that don&rsquo;t affect your streak.
        </p>
      </div>
    </Modal>
  );
}
