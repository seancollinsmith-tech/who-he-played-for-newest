import { Modal } from "@/components/Modal";
import { StatsPanel } from "@/components/StatsPanel";
import { StatsRecord } from "@/lib/types";

export function StatisticsModal({
  stats,
  onClose
}: {
  stats: StatsRecord;
  onClose: () => void;
}) {
  return (
    <Modal title="Statistics" onClose={onClose}>
      <StatsPanel stats={stats} />
    </Modal>
  );
}
