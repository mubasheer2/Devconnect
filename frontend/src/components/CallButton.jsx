import { VideoIcon } from "lucide-react";

function CallButton({ handleVideoCall }) {
  return (
    <button onClick={handleVideoCall} className="btn btn-primary btn-sm btn-circle">
      <VideoIcon className="size-5 text-white" />
    </button>
  );
}

export default CallButton;
