import { useCallback, useEffect, useState } from "react";
import { getApiHome } from "./api-client";
import { client } from "./api-client/client.gen";
import SiteHeader from "./components/SiteHeader";
import Hero from "./components/Hero";
import FeatureHighlights from "./components/FeatureHighlights";
import SiteFooter from "./components/SiteFooter";
import ChatDrawer from "./components/ChatDrawer";
import ChatLauncher from "./components/ChatLauncher";
import "./App.css";

function App() {
  const [apiMessage, setApiMessage] = useState<string>("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    client.setConfig({ baseUrl: "http://localhost:5001" });
    getApiHome()
      .then((res) => {
        setApiMessage(res.data ?? "");
      })
      .catch(() => {
        setApiMessage("");
      });
  }, []);

  const handleOpenChat = useCallback(() => {
    setIsChatOpen(true);
  }, []);

  const handleCloseChat = useCallback(() => {
    setIsChatOpen(false);
  }, []);

  return (
    <div className="app">
      <SiteHeader />
      <main className="app__main">
        <Hero tagline={apiMessage} onLaunchChat={handleOpenChat} />
        <FeatureHighlights />
      </main>
      <SiteFooter />
      {!isChatOpen && <ChatLauncher onOpen={handleOpenChat} />}
      <ChatDrawer open={isChatOpen} onClose={handleCloseChat} />
    </div>
  );
}

export default App;
