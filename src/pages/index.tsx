import ToDoList from '@/component/toDoListContainer'
import { useToDoListStore } from '@/store/toDoList'


export default function Home() {
  const toDoList = useToDoListStore((state) => state.toDoList)
  const fetchToDoList = useToDoListStore((state) => state.fetchToDoList)

  if (toDoList === null) {
    fetchToDoList()
  }

  if (toDoList !== null) {
    return <ToDoList />
  }
  return null
}
