import {
  Drawer,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Paper,
  Avatar,
} from "@mui/material";
import {
  Close as CloseIcon,
  Send as SendIcon,
  SmartToy as BotIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { postApiAiAsk } from "../api-client";

type ChatDrawerProps = {
  open: boolean;
  onClose: () => void;
};

function ChatDrawer({ open, onClose }: ChatDrawerProps) {
  const [message, setMessage] = useState("");
  const [responseHistory, setResponseHistory] = useState([
    "Hi there! I'm Cosmo. How can I help you make the most of yourday on campus?",
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      postApiAiAsk({ body: { prompt: message } }).then((res) => {
        const textResponse = res.data?.response;
        setResponseHistory((prev) => {
          if (!textResponse) return prev;
          return [...prev, textResponse];
        });
        setMessage("");
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Dark overlay */}
      {open && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1200,
            transition: "opacity 0.3s ease-in-out",
            opacity: open ? 1 : 0,
            pointerEvents: open ? "auto" : "none",
          }}
          onClick={onClose}
        />
      )}

      {/* Chat drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: "50%",
            minWidth: 400,
            backgroundColor: "background.paper",
            boxShadow: "-4px 0 20px rgba(0, 0, 0, 0.1)",
          },
        }}
        ModalProps={{
          BackdropProps: {
            sx: { backgroundColor: "transparent" },
          },
        }}
      >
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          {/* Header */}
          <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ backgroundColor: "primary.main" }}>
                  <BotIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" component="h2">
                    Chat with Cosmo
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ask anything about campus. Cosmo is ready 24/7.
                  </Typography>
                </Box>
              </Box>
              <IconButton onClick={onClose} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Chat messages */}
          <Box sx={{ flexGrow: 1 }}>
            {responseHistory.map((aiResponse, index) => (
              <Box key={index} sx={{ p: 2, overflow: "auto" }}>
                <Paper
                  sx={{
                    p: 2,
                    backgroundColor: "primary.light",
                    color: "primary.contrastText",
                    maxWidth: "80%",
                  }}
                >
                  <Typography variant="body1">{aiResponse}</Typography>
                </Paper>
              </Box>
            ))}
          </Box>

          {/* Message input */}
          <Box sx={{ p: 2, borderTop: "1px solid", borderColor: "divider" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                multiline
                maxRows={4}
                placeholder="Type your question…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                variant="outlined"
                size="small"
              />
              <Button
                variant="contained"
                onClick={handleSendMessage}
                disabled={!message.trim()}
                sx={{ minWidth: "auto", px: 2 }}
              >
                <SendIcon />
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default ChatDrawer;
