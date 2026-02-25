import React from "react";
import UpdateTemplateModManager from "./update-template";

export default function UpdateV0_2_1() {
  return (
    <UpdateTemplateModManager
      titleId="updates.map-manager.v0-2-1.title"
      titleMessage="Map Manager - v0.2.1"
      titleLink="https://github.com/Subway-Builder-Modded/subwaybuilder-patcher/releases/tag/v0.2.1"
      releaseDateId="updates.map-manager.v0-2-1.releaseDate"
      releaseDateMessage="February 18, 2026"
      itemsBySection={{
        features: [],
        bugfixes: [
          { id: "updates.map-manager.v0-2-1.bugfixes1", message: "Fixed an issue where adding multiple maps at once would improperly update the map list" },
        ],
        upgrades: [],
        otherNotes: [],
      }}
    />
  );
}
