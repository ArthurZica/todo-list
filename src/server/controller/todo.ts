import { read } from "@db-crud";
import { NextApiRequest, NextApiResponse } from "next";
function get(_: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({
        todos: read(),
    });
}
export const todoController = {
    get,
};
