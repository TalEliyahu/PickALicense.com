import type { Question } from "./types";

export const questions = [
  {
    id: "authorization",
    title: "Are you authorized to choose a license for all of this code?",
    whyItMatters:
      "A license should only be applied by someone who has the right to license the covered code.",
    options: [
      { id: "owner", label: "Yes, I wrote and own it", description: "Continue with normal recommendations." },
      { id: "employer", label: "My company or employer owns it", description: "Review policy or get approval first." },
      { id: "contributors", label: "Other people contributed", description: "Contributor rights may affect licensing." },
      { id: "unsure", label: "I am not sure", description: "Automated selection should stop." }
    ]
  },
  {
    id: "projectStatus",
    title: "Is this a new project or an existing repository?",
    whyItMatters:
      "Existing projects can already have licensing obligations or require contributor permission to change terms.",
    options: [
      { id: "new", label: "New project", description: "No prior project license to account for." },
      { id: "existing-unlicensed", label: "Existing and unlicensed", description: "May need contributor review." },
      { id: "existing-licensed", label: "Existing and already licensed", description: "Changing licenses can be a relicensing task." },
      { id: "unclear", label: "Existing with unclear license", description: "Resolve current licensing before choosing a new one." }
    ]
  },
  {
    id: "thirdPartyCode",
    title: "Does it contain copied, vendored, or modified third-party code?",
    whyItMatters:
      "Copied third-party code may bring license obligations that this simple picker cannot evaluate.",
    options: [
      { id: "no", label: "No", description: "Continue." },
      { id: "dependencies-only", label: "Dependencies only", description: "Dependency compatibility is advisory and later-scope." },
      { id: "copied", label: "Yes, copied or modified code", description: "Review those licenses first." },
      { id: "unsure", label: "I am not sure", description: "Automated selection should stop." }
    ]
  },
  {
    id: "projectType",
    title: "What are you primarily licensing?",
    whyItMatters:
      "Software, documentation, datasets, media, and model weights need different licensing models.",
    options: [
      { id: "application", label: "Application", description: "Software application." },
      { id: "library", label: "Library or SDK", description: "Reusable software component." },
      { id: "service", label: "Server or hosted service", description: "Network use may matter." },
      { id: "software-other", label: "Other software", description: "Still within the software scope." },
      { id: "documentation", label: "Documentation", description: "Use a documentation/content license flow later." },
      { id: "dataset", label: "Dataset", description: "Use a data license flow later." },
      { id: "model", label: "AI model or weights", description: "Use a model licensing flow later." },
      { id: "other", label: "Something else", description: "Out of scope for this first version." }
    ]
  },
  {
    id: "commercialUse",
    title: "Should people be permitted to use the software commercially?",
    whyItMatters:
      "Open-source licenses cannot prohibit commercial use while remaining open source.",
    options: [
      { id: "yes", label: "Yes", description: "Continue with open-source options." },
      { id: "no", label: "No", description: "You may need source-available or custom terms instead." },
      { id: "unsure", label: "I am not sure", description: "Show unresolved concern." }
    ]
  },
  {
    id: "closedSourceUse",
    title: "Should people be able to incorporate the code into closed-source software?",
    whyItMatters:
      "This is the main split between permissive, weak-copyleft, and strong-copyleft choices.",
    options: [
      { id: "yes", label: "Yes", description: "Prefer permissive options." },
      { id: "conditional", label: "Only under certain conditions", description: "Consider file or library copyleft." },
      { id: "no", label: "No", description: "Consider strong copyleft." },
      { id: "unsure", label: "I am not sure", description: "Keep multiple alternatives visible." }
    ]
  },
  {
    id: "copyleftScope",
    title: "When someone modifies your software, what should remain open?",
    whyItMatters:
      "The answer determines how reciprocal the license needs to be.",
    options: [
      { id: "none", label: "Nothing is required to remain open", description: "Permissive licenses fit this goal." },
      { id: "file", label: "Only files they modified", description: "File-level copyleft may fit." },
      { id: "library", label: "The library itself", description: "Library copyleft may fit." },
      { id: "distributed-work", label: "The distributed application", description: "Strong copyleft may fit." },
      { id: "network", label: "The network service too", description: "Network copyleft may fit." },
      { id: "unsure", label: "I am not sure", description: "Keep unresolved concern." }
    ]
  },
  {
    id: "patentGrant",
    title: "Is an explicit patent grant important to you?",
    whyItMatters:
      "Some licenses contain more explicit patent language than others.",
    options: [
      { id: "required", label: "Required", description: "Rank licenses with express patent grants higher." },
      { id: "preferred", label: "Preferred", description: "Treat as a ranking preference." },
      { id: "not-important", label: "Not important", description: "Do not rank primarily by patent language." },
      { id: "unsure", label: "I am not sure", description: "Show as unresolved." }
    ]
  },
  {
    id: "gnuVersion",
    title: "For GNU licenses, should future versions automatically be allowed?",
    whyItMatters:
      "The first catalog includes only '-only' variants. '-or-later' variants should be explicit later choices.",
    options: [
      { id: "only", label: "Version 3 only", description: "Use the current initial GNU catalog entries." },
      { id: "or-later", label: "Version 3 or later", description: "Mark as unresolved until or-later profiles are added." },
      { id: "unsure", label: "Explain the difference first", description: "Show as unresolved." }
    ]
  }
] satisfies Question[];
