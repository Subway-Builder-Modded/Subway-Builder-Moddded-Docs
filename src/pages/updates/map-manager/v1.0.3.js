import React from "react";
import UpdateTemplateModManager from "./update-template";

export default function UpdateV1_0_3() {
  return (
    <UpdateTemplateModManager
      titleId="updates.map-manager.v1-0-3.title"
      titleMessage="Map Manager - v1.0.3"
      titleLink="https://github.com/Subway-Builder-Modded/subwaybuilder-patcher/releases/tag/v1.0.3"
      releaseDateId="updates.map-manager.v1-0-3.releaseDate"
      releaseDateMessage="February 28, 2026"
      itemsBySection={{
        features: [],
        bugfixes: [
          {
            id: "updates.map-manager.v1-0-3.bugfixes1",
            message:
              "Fixed the tab registration error by moving it out of the map registration loop.",
          },
        ],
        upgrades: [],
        otherNotes: [],
      }}
    />
  );
}
