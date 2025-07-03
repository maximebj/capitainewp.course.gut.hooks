import { registerBlockVariation } from "@wordpress/blocks";

const NAMESPACE = "capitainewp/games-list";

registerBlockVariation("core/query", {
  name: NAMESPACE,
  title: "Games List",
  description: "Displays a list of games",
  category: "capitainewp",
  isActive: ({ namespace, query }) => {
    return namespace === NAMESPACE && query.postType === "games";
  },
  icon: "games",
  attributes: {
    namespace: NAMESPACE,
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
  scope: ["inserter", "transform", "block"],
});
