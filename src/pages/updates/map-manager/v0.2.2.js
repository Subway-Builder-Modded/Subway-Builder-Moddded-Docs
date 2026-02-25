import React from "react";
import UpdateTemplate from "./update-template";

export default function MapManager_UpdateV0_2_2() {
  return (
    <UpdateTemplate
      titleId="updates.map-manager.v0-2-2.title"
      titleMessage="Map Manager - v0.2.2"
      releaseDateId="updates.map-manager.v0-2-2.releaseDate"
      releaseDateMessage="February 18, 2026"
      itemsBySection={{
        features: [],
        bugfixes: [
          { id: "updates.map-manager.v0-2-2.bugfixes1", message: "Updated PMTiles URL on MacOS to ensure a correct download" },
        ],
        upgrades: [
            { id: "updates.map-manager.v0-2-2.upgrades1", message: "Changed Product Name to something more Human Readable" },
        ],
        otherNotes: [],
      }}
    />
  );
}
