import React from "react";
import UpdateTemplateModManager from "./update-template";

export default function MapManager_UpdateV0_2_4() {
  return (
    <UpdateTemplateModManager
      titleId="updates.map-manager.v0-2-4.title"
      titleMessage="Map Manager - v0.2.4"
      titleLink="https://github.com/Subway-Builder-Modded/subwaybuilder-patcher/releases/tag/v0.2.4"
      releaseDateId="updates.map-manager.v0-2-4.releaseDate"
      releaseDateMessage="February 19, 2026"
      itemsBySection={{
        features: [],
        bugfixes: [
          { id: "updates.map-manager.v0-2-4.bugfixes1", message: "MacOS now uses `open` to start the game" },
        ],
        upgrades: [],
        otherNotes: [],
      }}
    />
  );
}
