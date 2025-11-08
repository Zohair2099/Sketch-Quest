
import { initializeFirebase, getSdks } from "@/firebase";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";

interface GetUsersParams {
    completedLesson?: string;
    minXp?: number;
    institutionId?: string;
}

// Initialize outside of the function to avoid re-initialization on every call.
const { firestore } = initializeFirebase();

export async function getInstitutionByName(name: string) {
    if (!firestore) {
        throw new Error("Firestore is not initialized.");
    }

    const institutionsRef = collection(firestore, "institutions");
    const q = query(institutionsRef, where("name", "==", name), limit(1));

    try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                location: data.location
            };
        }
        return null;
    } catch (error) {
        console.error("Error fetching institution by name: ", error);
        return null;
    }
}

export async function getUsers(params: GetUsersParams = {}) {
    if (!firestore) {
        throw new Error("Firestore is not initialized.");
    }

    const usersRef = collection(firestore, "users");
    let q = query(usersRef);

    // Apply filters based on parameters
    if (params.completedLesson) {
        q = query(q, where("completedLessons", "array-contains", params.completedLesson));
    }
    if (params.minXp) {
        q = query(q, where("xp", ">=", params.minXp));
    }
    if (params.institutionId) {
        q = query(q, where("institutionId", "==", params.institutionId));
    }
    
    // Always order by XP by default for ranking purposes
    q = query(q, orderBy("xp", "desc"), limit(10));

    try {
        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                username: data.username || "Anonymous",
                xp: data.xp || 0,
                completedLessons: data.completedLessons || [],
            };
        });
        return users;
    } catch (error) {
        console.error("Error fetching users from Firestore: ", error);
        // In a real app, you might want more robust error handling
        return [];
    }
}
