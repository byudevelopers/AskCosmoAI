import { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import SimpleHeader from "./components/SimpleHeader";
import HomePage from "./components/HomePage";
import SimpleFooter from "./components/SimpleFooter";
import ChatDrawer from "./components/ChatDrawer";
import ChatLauncher from "./components/ChatLauncher";
import { client } from "./api-client/client.gen";

function App() {
  useEffect(() => {
    client.setConfig({ baseUrl: "http://localhost:5001" });
  });
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChat = useCallback(() => {
    setIsChatOpen(true);
  }, []);

  const handleCloseChat = useCallback(() => {
    setIsChatOpen(false);
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <SimpleHeader />
      <HomePage />
      <SimpleFooter />
      {!isChatOpen && <ChatLauncher onOpen={handleOpenChat} />}
      <ChatDrawer open={isChatOpen} onClose={handleCloseChat} />
    </Box>
  );
}

export default App;
