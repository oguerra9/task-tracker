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
            task_user: ''
        */
        let currUser = localStorage.getItem('username'); 
        let taskArr = [];
        let userRef = doc(db, "users", currUser); 
        
        const docRef = await addDoc(collection(db, "tasks"), {
            description: taskData.task_description,
            due_date: taskData.task_due_date,
            status: taskData.task_status,
            title: taskData.task_title,
            user: taskData.task_user
        });
        console.log(`Task added with ID: ${docRef.id}`);

        console.log(`updating ${currUser}'s task list`);       

        await getDoc(userRef)
            .then((querySnapshot) => {               
                taskArr = querySnapshot.data().taskIds;
                console.log(`${currUser}'s tasks: taskArr`);
                taskArr.push(docRef.id);
            })  

        await updateDoc(userRef, {
            taskIds: taskArr
        });
    }

}


let DS = new DataService();

export default DS;