import { injectChrome } from "../modules/partials";
import { initCommon } from "./common";
import posts from "../data/posts.generated.json";

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  tag: string;
  excerpt: string;
}

injectChrome("insights");

const list = document.getElementById("posts");
if (list) {
  list.innerHTML = (posts as PostMeta[])
    .map(
      (p) => `
      <a class="post-row" href="/insights/${p.slug}/" data-cursor="Read">
        <span class="post-row__date">${p.dateLabel}</span>
        <span class="post-row__title">${p.title}</span>
        <span class="post-row__tag">${p.tag}</span>
      </a>`
    )
    .join("");
}

initCommon();
