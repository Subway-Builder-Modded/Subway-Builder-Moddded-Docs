import React from "react";
import UpdateTemplate from "./update-template";

export default function MapManager_UpdateV0_2_7() {
  return (
    <UpdateTemplate
      titleId="updates.map-manager.v0-2-7.title"
      titleMessage="Map Manager - v0.2.7"
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
