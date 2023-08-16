import { z } from "zod";

export const TodoFilterSchema = z.object({
  title: z.string(),
  status: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
});

export type TodoFilterSchemaType = z.infer<typeof TodoFilterSchema>;
