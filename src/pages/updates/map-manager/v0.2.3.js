import React from "react";
import UpdateTemplateModManager from "./update-template";

export default function MapManager_UpdateV0_2_3() {
  return (
    <UpdateTemplateModManager
      titleId="updates.map-manager.v0-2-3.title"
      titleMessage="Map Manager - v0.2.3"
      titleLink="https://github.com/Subway-Builder-Modded/subwaybuilder-patcher/releases/tag/v0.2.3"
      releaseDateId="updates.map-manager.v0-2-3.releaseDate"
      releaseDateMessage="February 18, 2026"
      itemsBySection={{
        features: [],
        bugfixes: [
          { id: "updates.map-manager.v0-2-3.bugfixes1", message: "Made PMTiles executable when installed on MacOS" },
        ],
        upgrades: [],
        otherNotes: [],
      }}
    />
  );
}
