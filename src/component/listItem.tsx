import { useToDoListStore } from "@/store/toDoList";
import { Alert, Button } from "@mui/material";
import { ItemStatus, ToDoItem } from "@prisma/client";
import axios from "axios";

type listItemProps = {
    item: ToDoItem
}

export default function ListItem(props: listItemProps) {
    const item = props.item
    const updateItemToDoList = useToDoListStore((state) => state.updateItemToDoList)

    const actionBtnForToDoItem =
        <div data-testid="action-btn-for-todo">
            <Button data-testid="mark-as-done-btn" onClick={() => onClickActionForButtons("FINISHED")} sx={{ mr: 1 }} variant="contained" color="success" size="small">
                MARK AS DONE
            </Button>
            <Button data-testid="delete-btn" onClick={() => onClickActionForButtons("DELETED")} variant="contained" color="error" size="small">
                DELETE
            </Button>
        </div>

    const actionBtnForFinishedToDoItem =
        <div data-testid="action-btn-for-finished">
            <Button data-testid="revert-to-todo-btn" onClick={() => onClickActionForButtons("TODO")} variant="contained" color="info" size="small">
                REVERT TO TODO
            </Button>
            <Button data-testid="delete-btn" onClick={() => onClickActionForButtons("DELETED")} variant="contained" color="error" size="small">
                DELETE
            </Button>
        </div>


    const onClickActionForButtons = (status: ItemStatus) => {
        updateItemToDoList(item.id, item.itemName, status)
    }

    const itemSeverity = () => {
        switch (item.status) {
            case "TODO":
                return "info"
            case "FINISHED":
                return "success"
            default:
                return "info"
        }
    }

    const itemAction = () => {
        switch (item.status) {
            case "TODO":
                return actionBtnForToDoItem
            case "FINISHED":
                return actionBtnForFinishedToDoItem
            default:
                return (
                    <Button color="inherit" size="small">
                        DELETE
                    </Button>
                )
        }
    }
    return (
        <Alert
            data-testid="todo-list-item"
            severity={itemSeverity()}
            action={itemAction()}
        >
            {item.status === "FINISHED" ? <s>{item.itemName}</s> : item.itemName}
        </Alert>
    )
}
