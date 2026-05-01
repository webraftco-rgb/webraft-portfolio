import Modal from "./Modal";

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendlyModal = ({ isOpen, onClose }: CalendlyModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book a Free Discovery Call">
      <div className="w-full h-full min-h-[600px]">
        {/* Replace with your actual Calendly link */}
        <iframe
          src="https://calendly.com/webraftco/discovery-call?hide_event_types=1&hide_gdpr_banner=1"
          width="100%"
          height="100%"
          frameBorder="0"
          className="min-h-[600px]"
        ></iframe>
      </div>
    </Modal>
  );
};

export default CalendlyModal;
