import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import PageLoader from "../components/PageLoader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const { authUser, isLoading } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData?.token || !authUser || !callId) return;

      try {
        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        const callInstance = videoClient.call("default", callId);
        await callInstance.join({ create: true });

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("Error joining call:", error);
        toast.error("Could not join the call.");
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();
  }, [tokenData, authUser, callId]);

  if (isLoading || isConnecting) return <PageLoader />;

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#020617]">
      {client && call ? (
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <CallContent />
          </StreamCall>
        </StreamVideo>
      ) : (
        <p className="text-white">Could not initialize call</p>
      )}
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();

  if (callingState === CallingState.LEFT) navigate("/");

  return (
    <StreamTheme>
      {/* FULL SCREEN CENTERED LAYOUT */}
      <div className="w-full h-screen flex flex-col items-center justify-center">
        {/* MEET STYLE VIDEO FRAME */}
        <div
          className="
            relative
            w-[90vw] max-w-[1200px]
            aspect-video
            rounded-3xl
            bg-[#030712]
            border border-blue-500/30
            shadow-[0_0_60px_rgba(0,128,255,0.35)]
            overflow-hidden
            flex
          "
        >
          <SpeakerLayout />
        </div>

        {/* CONTROLS BELOW FRAME (NO OVERLAP) */}
        <div className="mt-6">
          <div
            className="
              flex items-center gap-3
              px-5 py-3
              rounded-full
              bg-[#020617]/90 backdrop-blur-xl
              border border-blue-500/25
              shadow-[0_0_35px_rgba(0,128,255,0.35)]
            "
          >
            <CallControls />
          </div>
        </div>
      </div>
    </StreamTheme>
  );
};

export default CallPage;
