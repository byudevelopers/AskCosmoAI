import "./ChatLauncher.css";

type ChatLauncherProps = {
  onOpen: () => void;
};

function ChatLauncher({ onOpen }: ChatLauncherProps) {
  return (
    <button
      type="button"
      className="chat-launcher"
      onClick={onOpen}
      aria-label="Open AskCosmo AI chat"
      id="chat"
    >
      <span aria-hidden="true">💬</span>
    </button>
  );
}

export default ChatLauncher;
