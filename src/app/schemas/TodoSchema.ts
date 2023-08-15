import { z } from "zod";

export const TodoSchema = z.object({
  title: z.string().nonempty("É necessário informar o título!"),
});

export type TodoSchemaType = z.infer<typeof TodoSchema>;
