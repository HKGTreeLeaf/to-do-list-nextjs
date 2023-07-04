import { useToDoListStore } from "@/store/toDoList";
import { Button, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
    toDoItemTitle: string
}

export default function AddItemForm() {
    const addItemToDoList = useToDoListStore((state) => state.addItemToDoList)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        addItemToDoList(data.toDoItemTitle)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ gap: "5px", display: 'flex', alignItems: 'flex-start' }}
        >
            <Controller
                control={control}
                name="toDoItemTitle"
                defaultValue=""
                rules={{
                    required: true
                }}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        data-testid="input-field"
                        fullWidth
                        variant="filled"
                        label="Add to do item here"
                        error={error !== undefined}
                        helperText={error ? <span data-testid="add-item-warning">Required Item</span> : ""}
                    />
                )}
            />
            <Button data-testid="add-item-btn" onClick={handleSubmit(onSubmit)} variant="contained">Add Item</Button>
        </form>
    )
}
