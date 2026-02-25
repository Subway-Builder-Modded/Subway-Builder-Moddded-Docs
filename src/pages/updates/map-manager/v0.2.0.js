import React from "react";
import UpdateTemplateModManager from "./update-template";

export default function UpdateV0_2_0() {
  return (
    <UpdateTemplateModManager
      titleId="updates.map-manager.v0-2-0.title"
      titleMessage="Map Manager - v0.2.0"
      titleLink="https://github.com/Subway-Builder-Modded/subwaybuilder-patcher/releases/tag/v0.2.0"
      releaseDateId="updates.map-manager.v0-2-0.releaseDate"
      releaseDateMessage="February 18, 2026"
      itemsBySection={{
        features: [
          { id: "updates.map-manager.v0-2-0.features1", message: "More than one map can be selected for install at a time" },
          { id: "updates.map-manager.v0-2-0.features2", message: "If a map doesn't include a thumbnail but includes `thumbnailBbox` in its config, the manager will autogenerate a thumbnail" },
        ],
        bugfixes: [
          { id: "updates.map-manager.v0-2-0.bugfixes1", message: "Fixed an issue where vanilla maps could be overwritten by the map manager" },
          { id: "updates.map-manager.v0-2-0.bugfixes2", message: "Fixed an issue where the map manager attempted to download the wrong version of pmtiles for Linux" },
        ],
        upgrades: [],
        otherNotes: [],
      }}
    />
  );
}
