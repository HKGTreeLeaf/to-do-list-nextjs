import { Box, Container, Paper, Stack } from "@mui/material";
import AddItemForm from "./addItemForm";
import { useToDoListStore } from "@/store/toDoList";
import ListItem from "./listItem";

export default function ToDoList() {
    const toDoList = useToDoListStore((state) => state.toDoList)
    return (
        <Container sx={{ marginTop: '20px' }} maxWidth="sm">
            <Paper elevation={3} >
                <Box sx={{ p: 2 }}>
                    <h4>
                        To-Do List
                    </h4>
                    <Stack spacing={2}>
                        <AddItemForm />
                        {toDoList?.map((item) => {
                            return (
                                <div key={item.id} >
                                    <ListItem item={item} />
                                </div>
                            )
                        })}
                    </Stack>
                </Box>
            </Paper>
        </Container>
    )
}