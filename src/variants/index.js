import { registerBlockVariation } from "@wordpress/blocks";

const MY_VARIATION_NAME = "my-plugin/books-list";

registerBlockVariation("core/query", {
  name: MY_VARIATION_NAME,
  title: "Games List",
  description: "Displays a list of games",
  category: "capitainewp",
  isActive: ({ namespace, query }) => {
    return namespace === MY_VARIATION_NAME && query.postType === "games";
  },
  icon: "games",
  attributes: {
    namespace: MY_VARIATION_NAME,
    query: {
      perPage: 3,
      pages: 0,
      offset: 0,
      postType: "games",
      order: "desc",
      orderBy: "date",
      author: "",
      search: "",
      exclude: [],
      sticky: "",
      inherit: false,
    },
  },
  scope: ["inserter", "transform"],
});
