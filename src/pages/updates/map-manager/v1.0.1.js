import React from "react";
import UpdateTemplateModManager from "./update-template";

export default function MapManager_UpdateV1_0_1() {
  return (
    <UpdateTemplateModManager
      titleId="updates.map-manager.v1-0-1.title"
      titleMessage="Map Manager - v1.0.1"
      titleLink="https://github.com/Subway-Builder-Modded/subwaybuilder-patcher/releases/tag/v1.0.1"
      releaseDateId="updates.map-manager.v1-0-1.releaseDate"
      releaseDateMessage="February 21, 2026"
      itemsBySection={{
        features: [],
        bugfixes: [
            { id: "updates.map-manager.v1-0-1.bugfixes1", message: "Fixes an issue where maps would show a false fail" },
        ],
        upgrades: [],
        otherNotes: [],
      }}
    />
  );
}
