import "./ChatDrawer.css";

type ChatDrawerProps = {
  open: boolean;
  onClose: () => void;
};

function ChatDrawer({ open, onClose }: ChatDrawerProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="chat-drawer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-drawer-heading"
    >
      <button
        type="button"
        className="chat-drawer__scrim"
        aria-label="Close chat"
        onClick={onClose}
      />
      <aside className="chat-drawer__panel">
        <header className="chat-drawer__header">
          <div>
            <h2 id="chat-drawer-heading">Chat with Cosmo</h2>
            <p>Ask anything about campus. Cosmo is ready 24/7.</p>
          </div>
          <button
            type="button"
            className="chat-drawer__close"
            onClick={onClose}
            aria-label="Close chat panel"
          >
            ×
          </button>
        </header>
        <div className="chat-drawer__body">
          <div className="chat-drawer__message chat-drawer__message--assistant">
            Hi there! I&apos;m Cosmo. How can I help you make the most of your
            day on campus?
          </div>
        </div>
        <form className="chat-drawer__composer">
          <label className="chat-drawer__composer-label" htmlFor="chat-input">
            Send a message
          </label>
          <div className="chat-drawer__composer-row">
            <textarea
              id="chat-input"
              name="message"
              placeholder="Type your question…"
              rows={1}
            />
            <button type="button">Send</button>
          </div>
        </form>
      </aside>
    </div>
  );
}

export default ChatDrawer;
