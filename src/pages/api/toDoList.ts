import { createToDoItem, deleteAllToDoItem, getAllToDoItem, updateToDoItem } from "@/model/toDoItemModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(` ${req.method}: ${req.url}`)
    try {
        switch (req.method) {
            case "GET":
                return res.status(200).json({ todoListItem: await getAllToDoItem()})
            case "POST":
                await createToDoItem(req.body['itemName'])
                return res.status(200).json({ todoListItem: await getAllToDoItem()})      
            case "PATCH":
                await updateToDoItem(req.body['itemId'],req.body['itemName'],req.body['itemStatus'])
                return res.status(200).json({ todoListItem: await getAllToDoItem()})
            case "DELETE":
                await deleteAllToDoItem()
                return res.status(200).end()
            default:
                break
        }
    } catch (error) {
        console.error(error)
        res.status(500)
    }

}

