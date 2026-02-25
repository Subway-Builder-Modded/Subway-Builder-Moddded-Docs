import React from "react";
import UpdateTemplateModManager from "./update-template";

export default function MapManager_UpdateV0_2_5() {
  return (
    <UpdateTemplateModManager
      titleId="updates.map-manager.v0-2-5.title"
      titleMessage="Map Manager - v0.2.5"
      titleLink="https://github.com/Subway-Builder-Modded/subwaybuilder-patcher/releases/tag/v0.2.5-beta"
      releaseDateId="updates.map-manager.v0-2-5.releaseDate"
      releaseDateMessage="February 19, 2026"
      itemsBySection={{
        features: [],
        bugfixes: [],
        upgrades: [
            { id: "updates.map-manager.v0-2-5.upgrades1", message: "Attempt to dequarantine pmtiles on MacOS so that the game works properly" },
        ],
        otherNotes: [],
      }}
    />
  );
}
