import React from "react";
import UpdateTemplateModManager from "./update-template";

export default function MapManager_UpdateV0_2_7() {
  return (
    <UpdateTemplateModManager
      titleId="updates.map-manager.v0-2-7.title"
      titleMessage="Map Manager - v0.2.7"
      titleLink="https://github.com/Subway-Builder-Modded/subwaybuilder-patcher/releases/tag/v0.2.7-beta"
      releaseDateId="updates.map-manager.v0-2-7.releaseDate"
      releaseDateMessage="February 20, 2026"
      itemsBySection={{
        features: [],
        bugfixes: [],
        upgrades: [
            { id: "updates.map-manager.v0-2-7.upgrades1", message: "Added a button to reset the paths to the Subway Builder game files" },
        ],
        otherNotes: [],
      }}
    />
  );
}
