import React from "react";
import UpdateTemplateModManager from "./update-template";

export default function MapManager_UpdateV1_0_0() {
  return (
    <UpdateTemplateModManager
      titleId="updates.map-manager.v1-0-0.title"
      titleMessage="Map Manager - v1.0.0"
      titleLink="https://github.com/Subway-Builder-Modded/subwaybuilder-patcher/releases/tag/v1.0.0"
      releaseDateId="updates.map-manager.v1-0-0.releaseDate"
      releaseDateMessage="February 21, 2026"
      itemsBySection={{
        features: [
            { id: "updates.map-manager.v1-0-0.features1", message: "Install mods from a zip file (or multiple at once!)" },
            { id: "updates.map-manager.v1-0-0.features2", message: "Autogenerate thumbnails (if your map creator supports it)" },
            { id: "updates.map-manager.v1-0-0.features3", message: "Country tabs if added by the map creator (currently nonfunctional on US and UK maps until more API methods are added)" },
            { id: "updates.map-manager.v1-0-0.features4", message: "Auto-management of map tiles. No more serve.ps1 or serve.sh!" },
            { id: "updates.map-manager.v1-0-0.features5", message: "Handles installation of maps into the game. No install scripts! Just enable the mod in-game and you're done!" },
        ],
        bugfixes: [
            { id: "updates.map-manager.v1-0-0.bugfixes1", message: "Fixed an issue where the manager would crash if a user cancelled selecting paths during first run" },
        ],
        upgrades: [
            { id: "updates.map-manager.v1-0-0.upgrades1", message: "The manager now checks if the AppData folder you selected matches the format of the actual games data files to prevent accidental selection of incorrect folders" },
            { id: "updates.map-manager.v1-0-0.upgrades2", message: "Catches more crashes and errors to avoid the infamous infinite load" },
        ],
        otherNotes: [],
      }}
    />
  );
}
