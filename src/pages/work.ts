import { injectChrome } from "../modules/partials";
import { renderWork } from "../modules/content";
import { initCommon } from "./common";

injectChrome("work");
renderWork("work-grid-full");
initCommon();
