import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

/**
 * A fake authentication function.
 * @returns {{ id: string }} An object with a fake user ID.
 */
const auth = () => ({ id: "fakeId" }); // Fake auth function

/**
 * The file router for the application.
 * @type {FileRouter}
 */
export const ourFileRouter = {
  /**
   * An image uploader that allows users to upload up to 3 images of up to 4MB each.
   */
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 3 } })
    .middleware(async ({}) => {
      // This code runs on your server before upload
      const user = await auth();

      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async () => {
      // This code RUNS ON YOUR SERVER after upload
    }),
} satisfies FileRouter;

/**
 * The type of the file router.
 */
export type OurFileRouter = typeof ourFileRouter;
