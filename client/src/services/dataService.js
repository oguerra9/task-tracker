import { collection, getDocs, getDoc, doc, setDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase';


class DataService {
    async getUser(username) {
        await getDoc(doc(db, "users", username))
            .then((querySnapshot)=>{               
                return querySnapshot.data();
            })
    }

    async addTask(taskData) {
        let currUser = localStorage.getItem('username');
        let userRef = collection(db, "users", currUser, "tasks");

        const docRef = await addDoc(userRef, {
            description: taskData.task_description,
            due_date: taskData.task_due_date,
            status: taskData.task_status,
            title: taskData.task_title,
        });

        return docRef.id;
    }

    async addUser(userName) {
        let userRef = doc(db, 'users', userName);
        
        const docRef = await setDoc(userRef, {
            name: userName
        });

        return docRef;
    }

    async deleteTask(taskId) {
        let currUser = localStorage.getItem('username');
        let taskRef = doc(db, 'users', currUser, 'tasks', taskId);

        await deleteDoc(taskRef);

        return taskId;
    }

    async updateTask(taskId, taskData) {
        let currUser = localStorage.getItem('username');
        let taskRef = doc(db, 'users', currUser, 'tasks', taskId);

        await setDoc(taskRef, {
            description: taskData.task_description,
            due_date: taskData.task_due_date,
            status: taskData.task_status,
            title: taskData.task_title,
        });


    }

    async getUserTasks() {

        let username = localStorage.getItem('username');

        let tasksRef = collection(db, 'users', username, 'tasks');
        let taskArr = [];

        await getDocs(tasksRef) 
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    taskArr.push({id: doc.id, ...doc.data()});
                });
            })
        
        return taskArr;
    }

    async getUserStatus(username) {

        let found;
        await getDoc(doc(db, 'users', username))
            .then((querySnapshot) => {
                if (querySnapshot.exists()) {
                    console.log('user found');
                    found = true;
                } else {
                    console.log('user not found');
                    found = false;
                }
            })
        return found;
    }

}


let DS = new DataService();

export default DS;