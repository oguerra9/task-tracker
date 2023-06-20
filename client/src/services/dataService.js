import { collection, getDocs, getDoc, doc, setDoc, addDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';

class DataService {
    async getUser(username) {
        await getDoc(doc(db, "users", username))
            .then((querySnapshot)=>{               
                return querySnapshot.data();
            })
    }

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
    console.log(`Task added with ID: ${docRef.id}`);
    return docRef.id;
    }

}


let DS = new DataService();

export default DS;