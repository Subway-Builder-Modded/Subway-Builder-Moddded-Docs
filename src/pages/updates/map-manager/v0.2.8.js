import React from "react";
import UpdateTemplateModManager from "./update-template";

export default function MapManager_UpdateV0_2_8() {
  return (
    <UpdateTemplateModManager
      titleId="updates.map-manager.v0-2-8.title"
      titleMessage="Map Manager - v0.2.8"
      titleLink="https://github.com/Subway-Builder-Modded/subwaybuilder-patcher/releases/tag/v0.2.8-beta"
      releaseDateId="updates.map-manager.v0-2-8.releaseDate"
      releaseDateMessage="February 20, 2026"
      itemsBySection={{
        features: [],
        bugfixes: [],
        upgrades: [
            { id: "updates.map-manager.v0-2-8.upgrades1", message: "Make PMTiles executable at build" },
        ],
        otherNotes: [],
      }}
    />
  );
}
