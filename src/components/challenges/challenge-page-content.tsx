"use client";

import type { ReactNode } from "react";
import type { Challenge } from "@/data/challenges";
import { ChallengeCard } from "./challenge-card";
import { TranscriptionReliabilityViz } from "./transcription-reliability-viz";
import { CoachingEngineViz } from "./coaching-engine-viz";
import { AdaptivePromptingViz } from "./adaptive-prompting-viz";

interface ChallengePageContentProps {
  challenges: Challenge[];
}

export function ChallengePageContent({ challenges }: ChallengePageContentProps) {
  const visualizations: Record<string, ReactNode> = {
    "challenge-1": <TranscriptionReliabilityViz />,
    "challenge-2": <CoachingEngineViz />,
    "challenge-3": <AdaptivePromptingViz />,
  };

  return (
    <div className="flex flex-col gap-5">
      {challenges.map((challenge, index) => (
        <ChallengeCard
          key={challenge.id}
          index={index}
          title={challenge.title}
          description={challenge.description}
          outcome={challenge.outcome}
        >
          {visualizations[challenge.id]}
        </ChallengeCard>
      ))}
    </div>
  );
}
