import React from "react";
import UpdateTemplateTemplateMod from "./update-template";

export default function TemplateMod_UpdateV1_0_1() {
  return (
    <UpdateTemplateTemplateMod
      titleId="updates.template-mod.v1-0-1.title"
      titleMessage="Template Mod - v1.0.1"
      titleLink="https://github.com/Subway-Builder-Modded/SubwayBuilderTemplateMod"
      releaseDateId="updates.template-mod.v1-0-1.releaseDate"
      releaseDateMessage="February 24, 2026"
      itemsBySection={{
        features: [],
        bugfixes: [],
        upgrades: [
            { id: "updates.template-mod.v1-0-1.upgrades1", message: "`electron.d.ts` => There's a few more useful methods for modders that aren't currently listed" },
            { id: "updates.template-mod.v1-0-1.upgrades2", message: "`game-state.d.ts` => Some of the schema definitions do not match what the game returns at runtime (namely Commute schemas)" },
            { id: "updates.template-mod.v1-0-1.upgrades3", message: "`Added a useful getLanguage API and clarifying that country is optional for some cities" },
        ],
        otherNotes: [],
      }}
    />
  );
}
