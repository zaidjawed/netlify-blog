const tags = {
  tags: [
    { slug: "document", name: "document" },
    { slug: "mock", name: "mock" },
    { slug: "style", name: "style" },
    { slug: "license", name: "license" },
    { slug: "mdx", name: "mdx" },
    { slug: "markdown", name: "markdown" },
  ]
};

const tagMap = generateTagMap();

function generateTagMap() {
  let result = {};
  for (const tag of tags.tags) {
    result[tag.slug] = tag;
  }
  return result;
}

export function getTag(slug) {
  return tagMap[slug];
}

export function listTags() {
  return tags.tags;
}
