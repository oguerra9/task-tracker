import { collection, getDocs, getDoc, doc, setDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase';

class DataService {
    async getUser(username) {
        await getDoc(doc(db, "users", username))
            .then((querySnapshot)=>{               
                return querySnapshot.data();
            })
    }

    // async getAllTasks() {
    //     let currUser = localStorage.getItem('username');
    //     let tasksRef = collection(db, 'users', currUser, 'tasks');

    //     const docRef = await getDocs(tasksRef)
    // }

    async addTask(taskData) {
        /*
            task_title: '',
            task_description: '',
            task_due_date: '',
            task_status: '',
        */
        let currUser = localStorage.getItem('username');
        let userRef = collection(db, "users", currUser, "tasks");

        const docRef = await addDoc(userRef, {
            description: taskData.task_description,
            due_date: taskData.task_due_date,
            status: taskData.task_status,
            title: taskData.task_title,
        });

        // await setDoc(doc(db, 'users', currUser, 'tasks', docRef.id), {
        //     id: docRef.id,
        //     description: taskData.task_description,
        //     due_date: taskData.task_due_date,
        //     status: taskData.task_status,
        //     title: taskData.task_title,
        // });
        console.log(`Task added with ID: ${docRef.id}`);
        return docRef.id;
    }

    async addUser(userName) {
        let userRef = doc(db, 'users', userName);
        
        // const docRef = await addDoc(userRef, {
        //     name: userName,
        // });
        const docRef = await setDoc(userRef, {
            name: userName
        });

        console.log(`user with name ${userName} and added to collection "users"`);
        return docRef;
    }

    async deleteTask(taskId) {
        let currUser = localStorage.getItem('username');
        let taskRef = doc(db, 'users', currUser, 'tasks', taskId);

        await deleteDoc(taskRef);

        console.log(`deleted task with id ${taskId}`);
        return taskId;
    }

    async updateTask(taskId, taskData) {
        let currUser = localStorage.getItem('username');
        let taskRef = doc(db, 'users', currUser, 'tasks', taskId);

        const docRef = setDoc(taskRef, taskData);

        console.log(`${currUser}'s task with id ${taskId} updated with ${JSON.stringify(taskData)}`);
        return docRef.id;

    }

}


let DS = new DataService();

export default DS;