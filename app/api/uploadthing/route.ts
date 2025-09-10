import { createNextRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

/**
 * The GET and POST routes for the uploadthing API.
 */
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});
