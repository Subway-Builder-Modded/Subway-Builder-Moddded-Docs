import React from "react";
import UpdateTemplateModManager from "./update-template";

export default function MapManager_UpdateV0_2_6() {
  return (
    <UpdateTemplateModManager
      titleId="updates.map-manager.v0-2-6.title"
      titleMessage="Map Manager - v0.2.6"
      titleLink="https://github.com/Subway-Builder-Modded/subwaybuilder-patcher/releases/tag/v0.2.6-beta"
      releaseDateId="updates.map-manager.v0-2-6.releaseDate"
      releaseDateMessage="February 20, 2026"
      itemsBySection={{
        features: [],
        bugfixes: [
            { id: "updates.map-manager.v0-2-6.bugfixes1", message: "Fixes an issue where mods couldn't be removed from the manager if the files were manually deleted" },
        ],
        upgrades: [
            { id: "updates.map-manager.v0-2-6.upgrades1", message: "PMTiles is now bundled in at buildtime to prevent issues where it couldn't be downloaded" },
        ],
        otherNotes: [],
      }}
    />
  );
}
