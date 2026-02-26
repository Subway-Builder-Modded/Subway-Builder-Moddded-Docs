import React from "react";
import UpdateTemplateModManager from "./update-template";

export default function UpdateV1_0_2() {
  return (
    <UpdateTemplateModManager
      titleId="updates.map-manager.v1-0-2.title"
      titleMessage="Map Manager - v1.0.2"
      titleLink="https://github.com/Subway-Builder-Modded/subwaybuilder-patcher/releases/tag/v1.0.2"
      releaseDateId="updates.map-manager.v1-0-2.releaseDate"
      releaseDateMessage="February 21, 2026"
      itemsBySection={{
        features: [],
        bugfixes: [
            { id: "updates.map-manager.v1-0-2.bugfixes1", message: "Fixed a botched folder check" },
        ],
        upgrades: [],
        otherNotes: [],
      }}
    />
  );
}
