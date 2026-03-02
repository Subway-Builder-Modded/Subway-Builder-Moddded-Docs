import React from "react";
import UpdateTemplateModManager from "./update-template";

export default function UpdateV1_0_4() {
  return (
    <UpdateTemplateModManager
      titleId="updates.map-manager.v1-0-4.title"
      titleMessage="Map Manager - v1.0.4"
      titleLink="https://github.com/Subway-Builder-Modded/subwaybuilder-patcher/releases/tag/v1.0.4"
      releaseDateId="updates.map-manager.v1-0-4.releaseDate"
      releaseDateMessage="March 2, 2026"
      itemsBySection={{
        features: [],
        bugfixes: [
          {
            id: "updates.map-manager.v1-0-4.bugfixes1",
            message: "Fixed reversed coordinates for thumbnailBbox",
          },
        ],
        upgrades: [],
        otherNotes: [],
      }}
    />
  );
}
