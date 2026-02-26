import React from "react";
import UpdateTemplateTemplateMod from "./update-template";

export default function TemplateMod_UpdateV1_0_0() {
  return (
    <UpdateTemplateTemplateMod
      titleId="updates.template-mod.v1-0-0.title"
      titleMessage="Template Mod - v1.0.0"
      titleLink="https://github.com/Subway-Builder-Modded/SubwayBuilderTemplateMod"
      releaseDateId="updates.template-mod.v1-0-0.releaseDate"
      releaseDateMessage="February 18, 2026"
      itemsBySection={{
        features: [
            { id: "updates.template-mod.v1-0-0.features1", message: "Initial Release" },
        ],
        bugfixes: [],
        upgrades: [],
        otherNotes: [
            { id: "updates.template-mod.v1-0-0.otherNotes1", message: "Documentation is available at https://subwaybuildermodded.com/modding-docs/getting-started" },
        ],
      }}
    />
  );
}
