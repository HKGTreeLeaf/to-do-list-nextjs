import { ItemStatus, ToDoItem } from '@prisma/client'
import axios from 'axios'
import { create } from 'zustand'

interface toDoListState {
    toDoList: Array<ToDoItem> | null
    fetchToDoList: () => void
    addItemToDoList: (title: string) => void
    updateItemToDoList: (itemId: string, title: string, status: ItemStatus) => void
}

export const useToDoListStore = create<toDoListState>((set) => ({
    toDoList: null,
    fetchToDoList: async () => {
        const data = await axios.get('/api/toDoList').then((response) => {
            return response.data.todoListItem
        }).catch((error) => { return [] })
        set({ toDoList: data })
    },
    addItemToDoList: async (title) => {
        const data = await axios.post('/api/toDoList', { itemName: title }).then((response) => {
            return response.data.todoListItem
        }).catch((error) => { return [] })
        set({ toDoList: data })
    },
    updateItemToDoList: async (itemId: string, itemName: string, status: ItemStatus) => {
        const data = await axios.patch('/api/toDoList', {
            itemId: itemId,
            itemName: itemName,
            itemStatus: status
        }).then((response) => {
            return response.data.todoListItem
        }).catch((error) => { return [] })
        set({ toDoList: data })
    }
}))