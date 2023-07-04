import { prisma } from '../lib/prisma';
import { ItemStatus } from '@prisma/client';


export async function getToDoItemCount() {
    try {
        const userCount = await prisma.toDoItem.count();
        return userCount
    } catch (error) {
        throw error
    }
}

export async function getAllToDoItem() {
    try {
        const toDoItemList = await prisma.toDoItem.findMany({ where: { NOT: [{ status: "DELETED" }] }, orderBy: [{ createdAt: 'desc' }] })
        return toDoItemList
    } catch (error) {
        throw error
    }
}

export async function createToDoItem(itemName: string) {
    try {
        await prisma.toDoItem.create({
            data: {
                itemName: itemName
            }
        }).then((value) => {
            return value
        }).catch((err) => {
            console.log(err)
            throw err
        })
    } catch (e) {
        throw e
    }
}

export async function updateToDoItem(itemId: string, itemName: string, status: ItemStatus) {
    try {
        await prisma.toDoItem.update({
            where: {
                id: itemId,
            },
            data: {
                itemName: itemName,
                status: status
            },
        }).then((value) => {
            return value
        }).catch((err) => {
            console.log(err)
            throw err
        })
    } catch (e) {
        throw e
    }

}


export async function deleteToDoItem(itemId: string) {
    try {
        await prisma.toDoItem.delete({
            where: {
                id: itemId,
            },
        }).then((value) => {
            return value
        }).catch((err) => {
            console.log(err)
            throw err
        })
    } catch (e) {
        throw e
    }
}

export async function deleteAllToDoItem() {
    try {
        await prisma.toDoItem.deleteMany({}).then((value) => {
            return value
        }).catch((err) => {
            console.log(err)
            throw err
        })
    } catch (e) {
        throw e
    }
}