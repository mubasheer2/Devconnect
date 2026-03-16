import { useEffect, useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import {
  LoaderIcon,
  MapPinIcon,
  ShipWheelIcon,
  ShuffleIcon,
  CameraIcon,
  CodeIcon,
  LayersIcon,
} from "lucide-react";

const DOMAINS = [
  "Frontend",
  "Backend",
  "Fullstack",
  "AI / ML",
  "Mobile",
  "DevOps",
  "Game Dev",
  "Data Science",
  "Blockchain",
];

const TECH_STACKS = [
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "Python",
  "Django",
  "Java",
  "Spring",
  "Flutter",
  "Unity",
  "AWS",
  "Docker",
];

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
    gender: authUser?.gender || "",   // ✅ FIX
    domain: authUser?.domain || "",
    primaryTech: authUser?.primaryTech || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Onboarding failed");
    },
  });

  // ✅ universal change handler
  const handleChange = (e) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FORM DATA:", formState); // debug
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const seed = Math.random().toString(36).substring(7);
    const url = `https://api.dicebear.com/7.x/avataaars/png?seed=${seed}`;
    setFormState((prev) => ({ ...prev, profilePic: url }));
    toast.success("Random avatar generated");
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setFormState((prev) => ({
        ...prev,
        profilePic: data.url,
      }));

      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    }
  };

  useEffect(() => {
    if (!formState.profilePic && formState.fullName) {
      const avatar = `https://api.dicebear.com/7.x/avataaars/png?seed=${formState.fullName}`;
      setFormState((prev) => ({ ...prev, profilePic: avatar }));
    }
  }, [formState.fullName]);

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-3xl rounded-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete Developer Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* PROFILE PIC */}
            <div className="flex flex-col items-center space-y-4">
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePic ? (
                  <img src={formState.profilePic} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 opacity-40" />
                  </div>
                )}
              </div>

              <div className="flex gap-3 flex-wrap justify-center">
                <button type="button" onClick={handleRandomAvatar} className="btn btn-accent">
                  <ShuffleIcon className="size-4 mr-2" />
                  Random Avatar
                </button>

                <label className="btn btn-secondary cursor-pointer">
                  <CameraIcon className="size-4 mr-2" />
                  Upload Image
                  <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
                </label>
              </div>
            </div>

            {/* NAME */}
            <input
              type="text"
              name="fullName"
              value={formState.fullName}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Full Name"
              required
            />

            {/* BIO */}
            <textarea
              name="bio"
              value={formState.bio}
              onChange={handleChange}
              className="textarea textarea-bordered h-24"
              placeholder="Short developer bio"
            />

            {/* GENDER */}
            <select
              name="gender"
              value={formState.gender}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            {/* DOMAIN */}
            <div className="relative">
              <LayersIcon className="absolute left-3 top-3 size-5 opacity-70" />
              <select
                name="domain"
                value={formState.domain}
                onChange={handleChange}
                className="select select-bordered w-full pl-10"
                required
              >
                <option value="">Select Domain</option>
                {DOMAINS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* PRIMARY TECH */}
            <div className="relative">
              <CodeIcon className="absolute left-3 top-3 size-5 opacity-70" />
              <select
                name="primaryTech"
                value={formState.primaryTech}
                onChange={handleChange}
                className="select select-bordered w-full pl-10"
                required
              >
                <option value="">Primary Tech</option>
                {TECH_STACKS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* LOCATION */}
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-3 size-5 opacity-70" />
              <input
                type="text"
                name="location"
                value={formState.location}
                onChange={handleChange}
                className="input input-bordered w-full pl-10"
                placeholder="City, Country"
                required
              />
            </div>

            {/* SUBMIT */}
            <button className="btn btn-primary w-full" disabled={isPending}>
              {!isPending ? (
                <>
                  <ShipWheelIcon className="size-5 mr-2" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Saving...
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;