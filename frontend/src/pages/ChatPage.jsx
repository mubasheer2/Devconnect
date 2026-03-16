import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
  useChatContext,
} from "stream-chat-react";

import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

/* ---------------- MAIN PAGE ---------------- */

const ChatPage = () => {
  const [chatClient, setChatClient] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        setChatClient(client);
      } catch (error) {
        console.error(error);
        toast.error("Chat connection failed");
      } finally {
        setLoading(false);
      }
    };

    initChat();

    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, [tokenData, authUser]);

  if (loading || !chatClient) return <ChatLoader />;

  return (
    <div className="h-[93vh] flex overflow-hidden bg-[#070b18]">
      <Chat client={chatClient} theme="str-chat__theme-dark">
        <ChatInner />
      </Chat>
    </div>
  );
};

export default ChatPage;

/* ---------------- INNER COMPONENT ---------------- */

const ChatInner = () => {
  const { id: targetUserId } = useParams();
  const navigate = useNavigate();

  const { setActiveChannel, client, channel } = useChatContext();
  const { authUser } = useAuthUser();

  /* ---------- OPEN CHANNEL ---------- */

  useEffect(() => {
    if (!client || !authUser || !targetUserId) return;

    const openChannel = async () => {
      try {
        const channelId = [authUser._id, targetUserId]
          .sort()
          .join("-");

        const newChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await newChannel.watch();
        setActiveChannel(newChannel);
      } catch (error) {
        console.error(error);
      }
    };

    openChannel();
  }, [client, authUser, targetUserId, setActiveChannel]);

  /* ---------- VIDEO CALL LOGIC ---------- */

  const handleVideoCall = async () => {
    if (!channel) {
      toast.error("No active chat selected");
      return;
    }

    const callUrl = `${window.location.origin}/call/${channel.id}`;

    try {
      await channel.sendMessage({
        text: `I've started a video call. Join here:\n${callUrl}`,
      });

      toast.success("Call link sent");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send call link");
    }
  };

  /* ---------- SIDEBAR FILTER ---------- */

  const filters = {
    type: "messaging",
    members: { $in: [authUser?._id] },
  };

  const sort = {
    last_message_at: -1,
  };

  return (
    <>
      {/* SIDEBAR */}
      <div className="w-[320px] border-r border-white/10 flex flex-col bg-white/5 backdrop-blur-xl">
        <div className="p-4 border-b border-white/10">
          <h2 className="font-semibold text-lg text-white">Chats</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          <ChannelList
            filters={filters}
            sort={sort}
            setActiveChannelOnMount={false}
            onSelect={(chan) => {
              const members = Object.values(chan.state.members);

              const other = members.find(
                (m) => m.user.id !== authUser._id
              );

              if (other) navigate(`/chat/${other.user.id}`);
            }}
          />
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex flex-col min-h-0 bg-black">
        <Channel>
          <Window className="flex flex-col h-full">
            <div className="relative border-b border-white/10">
              <ChannelHeader />

              <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
                <CallButton handleVideoCall={handleVideoCall} />
              </div>
            </div>

            <MessageList className="flex-1 overflow-y-auto" />
            <MessageInput focus />
          </Window>

          <Thread />
        </Channel>
      </div>
    </>
  );
};