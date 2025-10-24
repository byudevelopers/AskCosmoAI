import { Fab } from "@mui/material";
import { Chat as ChatIcon } from "@mui/icons-material";

type ChatLauncherProps = {
  onOpen: () => void;
};

function ChatLauncher({ onOpen }: ChatLauncherProps) {
  return (
    <Fab
      color="primary"
      onClick={onOpen}
      aria-label="Open AskCosmo AI chat"
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1000,
        "&:hover": {
          transform: "scale(1.1)",
        },
        transition: "transform 0.2s ease-in-out",
      }}
    >
      <ChatIcon />
    </Fab>
  );
}

export default ChatLauncher;
