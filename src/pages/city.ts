import { injectChrome } from "../modules/partials";
import { initCommon } from "./common";

// Shared entry for every generated location page (/<city>/). See
// scripts/build-cities.mjs and scripts/cities.mjs.
injectChrome("");
initCommon();
