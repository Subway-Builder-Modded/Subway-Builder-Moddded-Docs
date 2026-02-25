import React from "react";
import UpdateTemplateModManager from "./update-template";

export default function MapManager_UpdateV0_3_1() {
  return (
    <UpdateTemplateModManager
      titleId="updates.map-manager.v0-3-1.title"
      titleMessage="Map Manager - v0.3.1"
      titleLink="https://github.com/Subway-Builder-Modded/subwaybuilder-patcher/releases/tag/v0.3.1-beta"
      releaseDateId="updates.map-manager.v0-3-1.releaseDate"
      releaseDateMessage="February 21, 2026"
      itemsBySection={{
        features: [],
        bugfixes: [
            { id: "updates.map-manager.v0-3-1.bugfixes1", message: "Fixed incorrectly renamed folder" },
            { id: "updates.map-manager.v0-3-1.bugfixes2", message: "Fixed the tile-zoom-level variable" },
        ],
        upgrades: [],
        otherNotes: [
            { id: "updates.map-manager.v0-3-1.otherNotes1", message: "We don't talk about v0.3.0" },
        ],
      }}
    />
  );
}
